const presence = new Presence({
  clientId: "1519435224470126774" // Reemplaza con tu Client ID
});

interface PresenceData {
  details?: string;
  state?: string;
  largeImageKey?: string;
  largeImageText?: string;
  smallImageKey?: string;
  smallImageText?: string;
  startTimestamp?: number;
  buttons?: Array<{ label: string; url: string }>;
}

let startTime = Date.now();

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageText: "YBMP - Your Basic Music Player (accessing Discord status through beta)",
    buttons: [
      { label: "Listen now", url: "https://galzstuff.github.io/ybmp"
        label: "Access the latest beta", url: "https://galzstuff.github.io/ybmp-beta"
      }
    ]
  };

  try {
    // Obtener datos de localStorage (sincronizado con el HTML modificado)
    const coverBase64 = localStorage.getItem("ybmp_current_cover");
    const trackTitle = localStorage.getItem("ybmp_current_track") || "No playing";
    const playlistName = localStorage.getItem("ybmp_current_playlist") || "YBMP";
    const isPlayingStr = localStorage.getItem("ybmp_is_playing") || "false";
    const isPlaying = isPlayingStr === "true";

    // Si hay portada, usarla como imagen grande
    if (coverBase64) {
      presenceData.largeImageKey = coverBase64;
    } else {
      presenceData.largeImageKey = "ybmp_logo";
    }

    if (trackTitle === "select a playlist" || trackTitle === "selecciona una lista") {
      presenceData.details = "🎵 Browsing playlists";
      presenceData.state = "Looking for music";
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Idle";
    } else {
      presenceData.details = trackTitle;
      presenceData.state = `📚 ${playlistName}`;

      if (isPlaying) {
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Playing";
        presenceData.startTimestamp = startTime;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Paused";
        delete presenceData.startTimestamp;
      }
    }

    presence.setActivity(presenceData);
  } catch (error) {
    console.error("Error updating PreMiD presence:", error);
    presenceData.details = "YBMP";
    presenceData.state = "Music Player";
    presenceData.largeImageKey = "ybmp_logo";
    presence.setActivity(presenceData);
  }
});
