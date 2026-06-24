"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const presence = new Presence({
    clientId: "1519435224470126774" // Reemplaza con tu Client ID
});
let startTime = Date.now();
presence.on("UpdateData", () => __awaiter(void 0, void 0, void 0, function* () {
    const presenceData = {
        largeImageText: "YBMP - Your Basic Music Player",
        buttons: [
            {
                label: "🎵 Listen Now",
                url: "https://galzstuff.github.io/ybmp-beta"
            },
            {
                label: "📊 GitHub",
                url: "https://github.com/galzstuff/ybmp-beta"
            }
        ]
    };
    try {
        // Obtener datos de localStorage
        const coverBase64 = localStorage.getItem("ybmp_current_cover");
        const trackTitle = localStorage.getItem("ybmp_current_track") || "No playing";
        const playlistName = localStorage.getItem("ybmp_current_playlist") || "YBMP";
        const isPlayingStr = localStorage.getItem("ybmp_is_playing") || "false";
        const isPlaying = isPlayingStr === "true";
        // Usar portada como imagen grande
        if (coverBase64) {
            presenceData.largeImageKey = coverBase64;
        }
        else {
            presenceData.largeImageKey = "ybmp_logo";
        }
        // Si no hay playlist seleccionada
        if (trackTitle === "select a playlist" || trackTitle === "selecciona una lista") {
            presenceData.details = "🎵 Browsing playlists";
            presenceData.state = "Looking for music";
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Idle";
        }
        else {
            // Playlist en reproducción
            presenceData.details = trackTitle;
            presenceData.state = `📚 ${playlistName}`;
            if (isPlaying) {
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = "Playing";
                presenceData.startTimestamp = startTime;
            }
            else {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = "Paused";
                delete presenceData.startTimestamp;
            }
        }
        presence.setActivity(presenceData);
    }
    catch (error) {
        console.error("Error updating PreMiD presence:", error);
        presenceData.details = "YBMP";
        presenceData.state = "Music Player";
        presenceData.largeImageKey = "ybmp_logo";
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=presence.js.map
