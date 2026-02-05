import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  
    ffmpeg = new FFmpeg();
  isLoaded = false;

  constructor(private http:HttpClient) {}



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

 mergeVideos(assets: any[]) {
  const formData = new FormData();

  assets.forEach(item => {
    formData.append("videos", item.file);
  });

  return this.http.post(
    'http://localhost:5000/video/merge',
    formData,
    { responseType: 'arraybuffer' }
  );
}


}
