
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Daily Collect Wallet AI Advisor. 
Your goal is to help Nigerian informal traders (market sellers in Lagos, Kano, Abuja, etc.) understand how to use Daily Collect and grow their business.
Key context:
- USSD code is *555#.
- We help track both digital (transfers/QR) and cash sales.
- We help remit local levies (market stall fees, association dues, KIRS taxes).
- We partner with OPay, Moniepoint, PalmPay, and MTN MoMo.
- We provide transaction history that helps with credit scoring for loans.
- Be friendly, professional, and use Nigerian business contexts (e.g., Balogun Market, Sabon Gari, Kurmi).
- If asked about fees: Transaction fees are 0.5-1%, and levy processing is N10-N50 flat.
- Answer in simple English, occasionally using terms like 'Oga', 'Madam', or local market references where appropriate.
`;

export const getBusinessAdvice = async (prompt: string): Promise<string> => {
  // Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    
    // Access the text property directly (not a function).
    return response.text || "I'm sorry, I couldn't generate advice right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The advisor is currently offline. Please check back later.";
  }
};
