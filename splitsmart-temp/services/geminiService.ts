
import { GoogleGenAI, Type } from "@google/genai";
import { ReceiptData, Assignment } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const parseReceiptImage = async (base64Image: string): Promise<ReceiptData> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Extract the items, prices, quantities, total tax, and total tip from this receipt. Ensure you return a clean list of items. If tax or tip aren't explicitly visible, estimate or set to 0." }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                price: { type: Type.NUMBER },
                quantity: { type: Type.NUMBER }
              },
              required: ["id", "name", "price", "quantity"]
            }
          },
          tax: { type: Type.NUMBER },
          tip: { type: Type.NUMBER },
          total: { type: Type.NUMBER },
          currency: { type: Type.STRING }
        },
        required: ["items", "tax", "tip", "total", "currency"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const processAssignmentChat = async (
  userMessage: string,
  receipt: ReceiptData,
  currentAssignments: Assignment[]
): Promise<{ text: string; newAssignments: Assignment[] }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `
      Current Receipt: ${JSON.stringify(receipt)}
      Current Assignments: ${JSON.stringify(currentAssignments)}
      User Command: "${userMessage}"

      Instructions:
      1. Interpret who had what. Users might say "Sarah had the pizza" or "Sarah and Bob shared the fries".
      2. If an item is already assigned, add the new person to the list unless they imply a replacement.
      3. Names are case-insensitive but try to be consistent.
      4. Respond with a helpful message AND the updated structured assignments.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "Your conversational response to the user." },
          newAssignments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                itemId: { type: Type.STRING },
                people: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["itemId", "people"]
            }
          }
        },
        required: ["text", "newAssignments"]
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return {
    text: parsed.text || "I've updated the assignments.",
    newAssignments: parsed.newAssignments || currentAssignments
  };
};
