import { GoogleGenAI, Type, Modality } from "@google/genai";
import { CharacterData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Audio Context Singleton (lazy init)
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return audioContext;
}

// Decode helper
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const fetchCharacterDetails = async (character: string): Promise<CharacterData | null> => {
  try {
    const modelId = "gemini-2.5-flash";
    
    const prompt = `
      Analyze the Chinese character: "${character}".
      Provide the Pinyin, a concise English definition, and a simple example sentence in Chinese with its English translation.
      Ensure the example sentence uses the character.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pinyin: { type: Type.STRING, description: "The pinyin with tone marks" },
            definition: { type: Type.STRING, description: "Concise definition in English" },
            exampleSentence: { type: Type.STRING, description: "A simple example sentence using the character" },
            exampleTranslation: { type: Type.STRING, description: "English translation of the example sentence" }
          },
          required: ["pinyin", "definition", "exampleSentence", "exampleTranslation"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from Gemini");

    const data = JSON.parse(jsonText);

    return {
      character,
      pinyin: data.pinyin,
      definition: data.definition,
      exampleSentence: data.exampleSentence,
      exampleTranslation: data.exampleTranslation,
    };

  } catch (error) {
    console.error("Error fetching character details from Gemini:", error);
    return null;
  }
};

export const playTextToSpeech = async (text: string, voiceName: string = 'Kore'): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return;

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const pcmData = decodeBase64(base64Audio);

    // Convert PCM (Int16) to AudioBuffer (Float32)
    // The model returns raw PCM 16-bit.
    const dataInt16 = new Int16Array(pcmData.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();

  } catch (error) {
    console.error("TTS Error", error);
  }
};