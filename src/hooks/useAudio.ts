// hooks/useAudio.ts
// Responsibility: small helper that plays finish/success/retry sounds.
// Honors the accessibility "muteSounds" setting and the browser autoplay
// policy (silent failures). Audio paths are configurable from /public/audio.

export function useAudio() {
  function play(file: string) {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (html.getAttribute("data-mute-sounds") === "on") return;

    const audio = new Audio(`/audio/${file}`);
    audio.play().catch(() => {
      // autoplay/policy failures shouldn't crash the app
    });
  }

  return {
    success: () => play("success.mp3"),
    retry: () => play("retry.mp3"),
    finish: () => play("finish.mp3"),
  };
}
