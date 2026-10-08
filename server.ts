import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Generate AI Creature Visual & Field Biology Report
app.post('/api/generate-creature-visual', async (req, res) => {
  try {
    const {
      creatureName,
      biomeName,
      covering,
      limbs,
      rhythm,
      reaction,
      customPrompt,
    } = req.body;

    // Prompt for the visual representation
    const visualPrompt = `An educational, child-friendly scientific illustration of a fictional adapted organism named "${creatureName || 'BioCraft Creature'}" thriving in the ${biomeName || 'Wild Habitat'}.
Key Physical Structural Adaptations:
- Body Covering: ${covering || 'adapted coat'}
- Limbs & Features: ${limbs || 'specialized limbs'}
Key Behavioural Adaptations:
- Activity Habit: ${rhythm || 'survival habit'}
- Defensive Reaction: ${reaction || 'defense response'}
${customPrompt ? `Additional User Request: ${customPrompt}` : ''}
Clean, vibrant nature textbook illustration, bright lighting, high detail, clear visible adaptations.`;

    // Attempt 1: Try generating a raster image via gemini-3.1-flash-lite-image if permitted
    let rasterImageUrl: string | null = null;
    try {
      if (process.env.GEMINI_API_KEY) {
        const imgResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [{ text: visualPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: '4:3',
            },
          },
        });

        const parts = imgResponse.candidates?.[0]?.content?.parts || [];
        for (const part of parts) {
          if (part.inlineData?.data) {
            rasterImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    } catch {
      // If paid model or image model is unavailable/declined, fallback to SVG artwork & description via gemini-3.8-flash
    }

    if (rasterImageUrl) {
      return res.json({
        type: 'raster',
        imageUrl: rasterImageUrl,
        notes: `AI Generated Creature Visual for ${creatureName}`,
      });
    }

    // Attempt 2: Use gemini-3.8-flash (Standard model) to generate custom SVG illustration & field report
    const svgSystemInstruction = `You are an expert wildlife scientific illustrator and children's science teacher.
Your task is to generate:
1. A valid, self-contained SVG visual illustration (pure <svg>...</svg> code with width="600" height="400" viewBox="0 0 600 400" and vibrant colors, showing the creature with its physical body parts in its habitat).
2. A short, encouraging 2-sentence field note explaining how these adaptations keep the creature alive.

Output strictly JSON adhering to:
{
  "svg": "<svg xmlns='http://www.w3.org/2000/svg' ...>...</svg>",
  "fieldNote": "String explanation of the organism's superpowers"
}`;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Design an SVG graphic and field note for:
Organism Name: ${creatureName}
Biome: ${biomeName}
Structural Parts: ${covering}, ${limbs}
Survival Behaviours: ${rhythm}, ${reaction}
User description: ${customPrompt || 'Create a colorful, friendly adapted creature showing these features'}.

Make the SVG detailed, colorful, clean, with gradients, showing the creature clearly in its biome environment (e.g. desert dunes, arctic ice, or rainforest canopy). Return ONLY raw JSON without markdown code fences.`,
      config: {
        systemInstruction: svgSystemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = textResponse.text || '{}';
    let parsed: { svg?: string; fieldNote?: string } = {};
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Clean potential fences if present
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    if (parsed.svg && parsed.svg.includes('<svg')) {
      return res.json({
        type: 'svg',
        svg: parsed.svg,
        fieldNote: parsed.fieldNote || `Scientific observation: ${creatureName} has successfully adapted to ${biomeName}!`,
      });
    }

    // Default fallback if JSON lacked svg
    return res.json({
      type: 'fallback',
      fieldNote: `Field Biologist Log: ${creatureName} utilizes ${covering} and ${limbs} to dominate the ${biomeName}!`,
    });
  } catch (error: any) {
    console.error('Error generating creature visual:', error);
    return res.status(500).json({
      error: 'Failed to generate visual',
      message: error?.message || 'Server error',
    });
  }
});

// Vite middleware for dev or static server for production
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
