import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FfmpegService } from '../../services/ffmpeg-service';
import { FormsModule } from '@angular/forms';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

@Component({
  selector: 'app-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
 
   assets: any[] = [];
  orderedVideoFiles: string[] = [];
  finalVideo: string | null = null;

  constructor(private ffmpegService: FfmpegService) {
    this.ffmpegService.loadFFmpeg(); 
  }

  async ngOnInit() {
  console.log("Initializing...");
  await this.ffmpegService.loadFFmpeg();
  console.log("Done init");
}

 async onFilesSelected(event: any) {

  console.log("Starting upload...");

  // ❗ MUST LOAD FIRST
  await this.ffmpegService.loadFFmpeg();

  console.log("FFmpeg ready, processing files...");

  const ffmpeg = this.ffmpegService.ffmpeg;
  const files: FileList = event.target.files;

  let index = this.assets.length;

  for (let i = 0; i < files.length; i++) {

    const file = files[i];
    const isImage = file.type.startsWith('image');
    console.log("Processing:", file.name, "isImage:", isImage);

    this.assets.push({
      name: file.name,
      file,
      type: isImage ? "image" : "video"
    });

    if (isImage) {

      const imageName = `img${index}.png`;
      const videoName = `img${index}.mp4`;

      await ffmpeg.writeFile(imageName, await fetchFile(file));

      await ffmpeg.exec([
        "-loop", "1",
        "-i", imageName,
        "-t", "2",
        "-vf", "scale=1280:720",
        "-r", "30",
        videoName
      ]);

      this.orderedVideoFiles.push(videoName);
      console.log("Converted image → 2s video:", videoName);

    } else {

      const videoName = `vid${index}.mp4`;

      await ffmpeg.writeFile(videoName, await fetchFile(file));
      this.orderedVideoFiles.push(videoName);

      console.log("Added video:", videoName);
    }

    index++;
  }

  console.log("Final file list:", this.orderedVideoFiles);
}


  async mergeAll() {
    await this.ffmpegService.loadFFmpeg();

    const ffmpeg = this.ffmpegService.ffmpeg;

    if (this.orderedVideoFiles.length === 0) {
      alert("No videos to merge");
      return;
    }

    let concatText = "";

    for (let file of this.orderedVideoFiles) {
      concatText += `file '${file}'\n`;
    }

    await ffmpeg.writeFile("list.txt", concatText);

    await ffmpeg.exec([
      "-f", "concat",
      "-safe", "0",
      "-i", "list.txt",
      "-c:v", "libx264",
      "-c:a", "aac",
      "final.mp4"
    ]);

    const data:any = await ffmpeg.readFile("final.mp4");
    this.finalVideo = URL.createObjectURL(new Blob([data], { type: "video/mp4" }));

    alert("🎉 Final merged video ready!");
  }

}

