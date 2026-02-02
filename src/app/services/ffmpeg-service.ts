import { Injectable } from '@angular/core';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  
    ffmpeg = new FFmpeg();
  isLoaded = false;

  constructor() {}

  async loadFFmpeg() {
    if (this.isLoaded) {
      console.log("FFmpeg already loaded");
      return;
    }

    console.log("Loading FFmpeg...");

    await this.ffmpeg.load({
      coreURL: "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.4/dist/ffmpeg-core.js"
    });

    this.isLoaded = true;
    console.log("FFmpeg successfully loaded!");
  }
}
