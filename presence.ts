import { ActivityType, Assets, getTimestamps } from 'premid'

const presence = new Presence({
  clientId: '1519435224470126774',
})

enum ActivityAssets {
  Logo = 'https://galzstuff.github.io/ybmp/ybmp_logo.png',
}

presence.on('UpdateData', async () => {
  const trackTitle = localStorage.getItem('ybmp_current_track') || ''
  const playlistName = localStorage.getItem('ybmp_current_playlist') || 'YBMP'
  const isPlaying = localStorage.getItem('ybmp_is_playing') === 'true'
const currentTime = Number.parseInt(localStorage.getItem('ybmp_current_time') || '0', 10)
const duration = Number.parseInt(localStorage.getItem('ybmp_duration') || '0', 10)


if (!trackTitle) {
  presence.clearActivity()
  return
}

const presenceData: PresenceData = {
  type: ActivityType.Listening,
  details: trackTitle,
  state: playlistName,
  largeImageKey: ActivityAssets.Logo,
  largeImageText: 'YBMP - Your Basic Music Player',
  buttons: [
    {
      label: 'cool player where this person is listening to music at',
      url: 'https://galzstuff.github.io/ybmp/',
    },
  ],
}

if (isPlaying) {
  presenceData.smallImageKey = Assets.Play
  presenceData.smallImageText = 'Reproduciendo'

if (Number.isFinite(duration) && duration > 0) {
  [presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(
    currentTime,
    duration,
  )
}
}
else {
  presenceData.smallImageKey = Assets.Pause
  presenceData.smallImageText = 'Pausado'
}

presence.setActivity(presenceData)
})
