import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";


@Injectable({
  providedIn: 'root',
})
export class Gemini {

    genAI = new GoogleGenerativeAI("AIzaSyBS83hk9NUujkvJPAhMMTJWBksXnRmjQGo");

  async analyzeImage(base64: string) {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro"
    });

    const result = await model.generateContent([
      "Analyze this image frame from a video:",
      {
        inlineData: {
          data: base64,
          mimeType: "image/png"
        }
      }
    ]);

    return result.response.text();
  }

  async summarize(text: string) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Summarize this text: ${text}`);
    return result.response.text();
  }
  
}
