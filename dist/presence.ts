"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const premid_1 = require("premid");
const presence = new Presence({
    clientId: "1519435224470126774",
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "ybmp_logo",
        largeImageText: "YBMP - Your Basic Music Player (through beta ver.)",
        smallImageKey: premid_1.Assets.Play,
    };
    try {
        const coverBase64 = localStorage.getItem("ybmp_current_cover");
        const trackTitle = localStorage.getItem("ybmp_current_track") || "No playing";
        const playlistName = localStorage.getItem("ybmp_current_playlist") || "YBMP";
        const isPlayingStr = localStorage.getItem("ybmp_is_playing") || "false";
        const isPlaying = isPlayingStr === "true";
        if (coverBase64) {
            presenceData.largeImageKey = coverBase64;
        }
        if (trackTitle === "select a playlist" || trackTitle === "selecciona una lista") {
            presenceData.details = "🎵 Browsing playlists";
            presenceData.state = "Looking for music";
            presenceData.smallImageKey = premid_1.Assets.Pause;
            presenceData.smallImageText = "Idle";
        }
        else {
            presenceData.details = trackTitle;
            presenceData.state = `📚 ${playlistName}`;
            if (isPlaying) {
                presenceData.smallImageKey = premid_1.Assets.Play;
                presenceData.smallImageText = "Playing";
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                presenceData.buttons = [
                    {
                        label: "🎵 Listen Now",
                        url: "https://galzstuff.github.io/ybmp-beta",
                    },
                    {
                        label: "📊 GitHub",
                        url: "https://github.com/galzstuff/ybmp-beta",
                    },
                ];
            }
            else {
                presenceData.smallImageKey = premid_1.Assets.Pause;
                presenceData.smallImageText = "Paused";
                presenceData.buttons = [
                    {
                        label: "🎵 Listen Now",
                        url: "https://galzstuff.github.io/ybmp-beta",
                    },
                    {
                        label: "📊 GitHub",
                        url: "https://github.com/galzstuff/ybmp-beta",
                    },
                ];
            }
        }
    }
    catch (error) {
        console.error("Error updating PreMiD presence:", error);
        presenceData.details = "YBMP";
        presenceData.state = "Music Player";
    }
    presence.setActivity(presenceData);
});
