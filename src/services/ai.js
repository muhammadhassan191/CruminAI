import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const aiService = {
  async scoreLead(leadData, icpDescription) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this lead for a B2B sales target.
      Ideal Customer Profile (ICP): ${icpDescription}
      
      Lead Data:
      Name: ${leadData.full_name}
      Title: ${leadData.title}
      Company: ${leadData.companies?.name}
      Industry: ${leadData.companies?.industry}
      
      Provide a score from 0-100 and a brief reason why.
      Format: JSON { "score": number, "reason": "string" }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    try {
      return JSON.parse(response.text());
    } catch (e) {
      console.error("Failed to parse Gemini response", response.text());
      return { score: 50, reason: "Analysis pending" };
    }
  },

  async generateOutreachHook(leadData) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate a professional, high-converting opening line for an email to a lead.
      Lead: ${leadData.full_name}, ${leadData.title} at ${leadData.companies?.name}.
      Keep it under 20 words. No placeholders.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }
};
