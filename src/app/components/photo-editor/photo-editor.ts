import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-editor.html',
  styleUrl: './photo-editor.scss',
})
export class PhotoEditor {
 @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  // SIGNALS
  imageLoaded = signal(false);

  exposure = signal(0);
  saturation = signal(100);
  hue = signal(0);
  blur = signal(0);
  opacity = signal(100);

  resizeW = signal(800);
  resizeH = signal(600);
  keepAspect = true;

  private history: ImageData[] = [];
  private redoStack: ImageData[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  // Upload image
  onUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        this.canvas.nativeElement.width = img.width;
        this.canvas.nativeElement.height = img.height;

        this.ctx.drawImage(img, 0, 0);
        this.pushHistory();
        this.imageLoaded.set(true);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  pushHistory() {
    const data = this.ctx.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    this.history.push(data);
  }

  undo() {
    if (this.history.length > 1) {
      const last = this.history.pop()!;
      this.redoStack.push(last);

      const prev = this.history[this.history.length - 1];
      this.ctx.putImageData(prev, 0, 0);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const restored = this.redoStack.pop()!;
      this.history.push(restored);
      this.ctx.putImageData(restored, 0, 0);
    }
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    this.imageLoaded.set(false);
  }

  // FILTERS
  applyFilter(type: string) {
    const d = this.ctx.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    const data = d.data;

    switch (type) {
      case 'grey':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        break;

      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          data[i] *= 1.07;
          data[i + 1] *= 0.74;
          data[i + 2] *= 0.43;
        }
        break;

      case 'flip':
        data.reverse();
        break;

      case 'sunset':
        for (let i = 0; i < data.length; i += 4) data[i] = 255;
        break;
    }

    this.ctx.putImageData(d, 0, 0);
    this.pushHistory();
  }

  // TOOL ADJUSTMENTS
  onExposure(event: any) {
    this.exposure.set(event.target.value);
    this.applyFilterCSS();
  }

  onSaturation(event: any) {
    this.saturation.set(event.target.value);
    this.applyFilterCSS();
  }

  onHue(event: any) {
    this.hue.set(event.target.value);
    this.applyFilterCSS();
  }

  onBlur(event: any) {
    this.blur.set(event.target.value);
    this.applyFilterCSS();
  }

  onOpacity(event: any) {
    this.opacity.set(event.target.value);
    this.applyFilterCSS();
  }

  applyFilterCSS() {
    this.canvas.nativeElement.style.filter = `
      brightness(${100 + this.exposure()}%)
      saturate(${this.saturation()}%)
      hue-rotate(${this.hue()}deg)
      blur(${this.blur()}px)
      opacity(${this.opacity()}%)
    `;
  }

  // Resize
  onResize() {
    if (this.keepAspect) {
      const aspect =
        this.canvas.nativeElement.width /
        this.canvas.nativeElement.height;

      this.resizeH.set(Math.round(this.resizeW() / aspect));
    }
  }

  // Download
  download() {
    const link = document.createElement('a');
    link.download = 'photo.png';
    link.href = this.canvas.nativeElement.toDataURL();
    link.click();
  }
}
