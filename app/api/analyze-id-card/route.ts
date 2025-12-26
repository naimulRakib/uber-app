import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    // 1. Validate Input
    if (!imageUrl) return NextResponse.json({ success: false, error: "No URL provided" });
    if (!genAI) return NextResponse.json({ success: false, error: "Gemini API Key missing on Vercel" });

    console.log("🔍 Fetching Image from:", imageUrl);

    // 2. Fetch Image (Robust Check)
    const imageResp = await fetch(imageUrl);
    if (!imageResp.ok) {
      console.error("❌ Vercel Fetch Error:", imageResp.status, imageResp.statusText);
      return NextResponse.json({ success: false, error: "Vercel could not reach the image URL. Ensure it is public." });
    }
    
    const arrayBuffer = await imageResp.arrayBuffer();
    
    // Debug: Check if we actually got data
    if (arrayBuffer.byteLength === 0) {
      return NextResponse.json({ success: false, error: "Image file is empty" });
    }

    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';

    // 3. Configure Model (Use Stable 1.5 Flash)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // CHANGED: Use stable version
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      }
    });

    const prompt = `Extract JSON: { "student_name": string, "student_id_number": string, "institution_name": string } from this ID card. Return null for missing fields.`;

    // 4. Generate
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    console.log("🤖 Gemini Extracted:", text);

    let extractedData;
    try {
      extractedData = JSON.parse(text);
    } catch (e) {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      extractedData = JSON.parse(cleanText);
    }

    return NextResponse.json({ success: true, data: extractedData });

  } catch (error: any) {
    console.error("❌ Processing Failed:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}