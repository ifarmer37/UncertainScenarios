// src/utils/tts.ts
// Handles Text-to-Speech (TTS) using ElevenLabs API

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID; // Set your preferred Genie voice ID

if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
  console.error("Missing ElevenLabs API credentials! Check your .env file.");
}

export async function speakTextElevenLabs(text: string) {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        voice_settings: { stability: 0.6, similarity_boost: 0.85 },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch ElevenLabs audio");
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("TTS Error:", error);
  }
}
