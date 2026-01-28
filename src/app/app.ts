import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FFmpeg } from '@ffmpeg/ffmpeg';


@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-video-editor');

  videoUrl: string | null = null;
  frameBase64: string | null = null;

  ffmpeg = new FFmpeg();

  async onVideoSelected(file: File) {
    this.videoUrl = URL.createObjectURL(file);

    await this.ffmpeg.load();

    const data = await file.arrayBuffer();
    await this.ffmpeg.writeFile('input.mp4', new Uint8Array(data));

    await this.ffmpeg.exec([
      "-i", "input.mp4",
      "-vf", "fps=1",
      "frame_001.png"
    ]);

    const frameData:any = await this.ffmpeg.readFile("frame_001.png");

    const blob = new Blob([frameData], { type: "image/png" });
    const reader = new FileReader();

    reader.onload = () => {
      this.frameBase64 = (reader.result as string).split(",")[1];
    };

    reader.readAsDataURL(blob);
  }
}
