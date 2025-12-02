
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;
  private readonly GEMINI_API_KEY = process.env.API_KEY; // Access API key from environment

  constructor() {
    if (!this.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Gemini API calls will fail.');
      // Handle the case where the API key is missing, e.g., disable AI features or show a message.
    }
    this.ai = new GoogleGenAI({ apiKey: this.GEMINI_API_KEY });
  }

  async generateContent(prompt: string): Promise<GenerateContentResponse> {
    if (!this.GEMINI_API_KEY) {
      throw new Error('Gemini API key is missing. Cannot generate content.');
    }

    const request: GenerateContentParameters = {
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
      config: {
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 50 } // Set a small thinking budget to reserve tokens for output
      }
    };

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent(request);
      return response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate content from Gemini API.');
    }
  }
}
    