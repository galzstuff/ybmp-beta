import { Assets, ActivityType } from 'premid'

const presence = new Presence({
  clientId: '1519435224470126774',
})

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    type: ActivityType.LISTENING as any,
    largeImageKey: 'ybmp_logo',
    largeImageText: 'YBMP - Your Basic Music Player (via beta ver.)',
    smallImageKey: Assets.Play,
  }

  try {
    const coverBase64 = localStorage.getItem('ybmp_current_cover')
    const trackTitle = localStorage.getItem('ybmp_current_track') || 'No playing'
    const playlistName = localStorage.getItem('ybmp_current_playlist') || 'YBMP'
    const isPlayingStr = localStorage.getItem('ybmp_is_playing') || 'false'
    const currentTime = parseInt(localStorage.getItem('ybmp_current_time') || '0')
    const duration = parseInt(localStorage.getItem('ybmp_duration') || '0')
    const startTimestamp = localStorage.getItem('ybmp_start_timestamp')

    const isPlaying = isPlayingStr === 'true'

    // Usar portada como imagen si existe
    if (coverBase64) {
      presenceData.largeImageKey = coverBase64
    }

    // Si no hay playlist seleccionada
    if (
      trackTitle === 'select a playlist' ||
      trackTitle === 'selecciona una lista'
    ) {
      presenceData.details = '🎵 Browsing playlists'
      presenceData.state = 'Looking for music'
      presenceData.smallImageKey = Assets.Pause
      presenceData.smallImageText = 'Idle'
    } else {
      // Mostrar progreso de la canción
      const timeStr = formatTime(currentTime)
      const durationStr = formatTime(duration)
      presenceData.details = trackTitle
      presenceData.state = `📚 ${playlistName}`

      if (isPlaying) {
        presenceData.smallImageKey = Assets.Play
        presenceData.smallImageText = 'Playing'
        
        // Mostrar progreso: 1:30 / 3:45
        if (duration > 0) {
          presenceData.smallImageText = `${timeStr} / ${durationStr}`
        }

        // Timestamp de inicio para que Discord muestre el tiempo restante
        if (startTimestamp) {
          presenceData.startTimestamp = parseInt(startTimestamp)
        } else {
          presenceData.startTimestamp = Math.floor(Date.now() / 1000)
        }

        presenceData.buttons = [
          {
            label: '🎵 Listen Now',
            url: 'https://galzstuff.github.io/ybmp-beta',
          },
          {
            label: '📊 GitHub',
            url: 'https://github.com/galzstuff/ybmp-beta',
          },
        ]
      } else {
        presenceData.smallImageKey = Assets.Pause
        presenceData.smallImageText = `Paused at ${timeStr} / ${durationStr}`
        delete presenceData.startTimestamp

        presenceData.buttons = [
          {
            label: '🎵 Listen Now',
            url: 'https://galzstuff.github.io/ybmp-beta',
          },
          {
            label: '📊 GitHub',
            url: 'https://github.com/galzstuff/ybmp-beta',
          },
        ]
      }
    }
  } catch (error) {
    console.error('Error updating PreMiD presence:', error)
    presenceData.details = 'YBMP'
    presenceData.state = 'Music Player'
  }

  presence.setActivity(presenceData)
})

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds === undefined) return '0:00'
  seconds = Math.floor(seconds)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}
