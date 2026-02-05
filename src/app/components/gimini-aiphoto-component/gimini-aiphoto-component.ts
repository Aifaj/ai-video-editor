import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiminiAiphotoService } from '../../services/giminiAiphoto.service';

@Component({
  selector: 'app-giminiAiphoto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gimini-aiphoto-component.html',
  styleUrls: ['./gimini-aiphoto-component.scss']
})
export class GiminiAiphotoComponent {

  selectedImageAnalyzer = signal<string | null>(null);
  selectedImageFace = signal<string | null>(null);
  loadingFace = signal<boolean>(false);
  loadingAnalyzer = signal<boolean>(false);

  aiResponse = signal<any>(null);
  faceData = signal<any>(null);

 activeTool = signal<string>('face-lock');
  sidebarOpen = signal<boolean>(false);

  setTool(tool: string) {
    this.activeTool.set(tool);
    this.sidebarOpen.set(false); // Close on mobile click
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }


  constructor(private aiService: GiminiAiphotoService) {}

  onImageSelected(event: any, name:any) {

    if(name === 'image-analyzer') {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImageAnalyzer.set(reader.result as string);
        };
        reader.readAsDataURL(file);

        this.loadingAnalyzer.set(true);
        this.aiResponse.set(null);

        this.aiService.analyzeImage(file).subscribe({
          next: (res: any) => {
            this.loadingAnalyzer.set(false);
            this.aiResponse.set(res.ai);
          },
          error: () => {
            this.loadingAnalyzer.set(false);
          }
        });
    }

    if(name === 'face') {
          const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => this.selectedImageFace.set(reader.result as string);
        reader.readAsDataURL(file);

        this.loadingFace.set(true);
        this.faceData.set(null);

        this.aiService.analyzeFace(file).subscribe({
          next: (res: any) => {
            this.loadingFace.set(false);
            this.faceData.set(res.ai);
          },
          error: () => this.loadingFace.set(false)
        });
      
    }

    
  }

  lockFace = signal<string | null>(null);
unlockFace = signal<string | null>(null);
faceMatchResult = signal<any | null>(null);
faceVerifying = signal<boolean>(false);

  onFaceLockUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.lockFace.set(reader.result as string);
  reader.readAsDataURL(file);
}

onUnlockFaceUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.unlockFace.set(reader.result as string);
  reader.readAsDataURL(file);

  this.verifyFaceLock(file);
}

verifyFaceLock(file: File) {
  this.faceVerifying.set(true);
  this.faceMatchResult.set(null);

  this.aiService.verifyFaceLock(this.lockFace(), file).subscribe({
    next: (res: any) => {
      this.faceVerifying.set(false);
      this.faceMatchResult.set(res);
    },
    error: () => {
      this.faceVerifying.set(false);
    }
  });
}


docData = signal<any | null>(null);
loadingDoc = signal<boolean>(false);

onDocumentUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.loadingDoc.set(true);
  this.docData.set(null);

  this.aiService.readDocument(file).subscribe({
    next: (res: any) => {
      this.docData.set(res.ai);
      this.loadingDoc.set(false);
    },
    error: () => this.loadingDoc.set(false)
  });
}


captionImage = signal<string | null>(null);
captionResult = signal<any | null>(null);
loadingCaption = signal<boolean>(false);

onCaptionImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.captionImage.set(reader.result as string);
  reader.readAsDataURL(file);

  this.generateCaption(file);
}

generateCaption(file: File) {
  this.loadingCaption.set(true);
  this.captionResult.set(null);

  this.aiService.generateCaption(file).subscribe({
    next: (res: any) => {
      this.loadingCaption.set(false);
      this.captionResult.set(res.ai);
    },
    error: () => {
      this.loadingCaption.set(false);
    }
  });
}


thumbnailImage = signal<string | null>(null);
thumbnailResult = signal<any | null>(null);
loadingThumbnail = signal<boolean>(false);

onThumbnailUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.thumbnailImage.set(reader.result as string);
  reader.readAsDataURL(file);

  this.analyzeThumbnail(file);
}

analyzeThumbnail(file: File) {
  this.loadingThumbnail.set(true);
  this.thumbnailResult.set(null);

  this.aiService.analyzeThumbnail(file).subscribe({
    next: (res: any) => {
      this.loadingThumbnail.set(false);
      this.thumbnailResult.set(res.ai);
    },
    error: () => this.loadingThumbnail.set(false)
  });
}


cropImage = signal<string | null>(null);
cropResult = signal<any | null>(null);
loadingCrop = signal<boolean>(false);


onCropImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.cropImage.set(reader.result as string);
  reader.readAsDataURL(file);

  this.analyzeCrop(file);
}

analyzeCrop(file: File) {
  this.loadingCrop.set(true);
  this.cropResult.set(null);

  this.aiService.analyzeCrop(file).subscribe({
    next: (res: any) => {
      this.loadingCrop.set(false);
      this.cropResult.set(res.ai);
    },
    error: () => this.loadingCrop.set(false)
  });
}

renameFileName = signal<string | null>(null);
renameResult = signal<any | null>(null);
loadingRename = signal<boolean>(false);

onRenameFileUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.renameFileName.set(file.name);
  this.loadingRename.set(true);
  this.renameResult.set(null);

  this.aiService.renameFile(file).subscribe({
    next: (res: any) => {
      this.loadingRename.set(false);
      this.renameResult.set(res.ai);
    },
    error: () => this.loadingRename.set(false)
  });
}


productImage = signal<string | null>(null);
productResult = signal<any | null>(null);
loadingProduct = signal<boolean>(false);

onProductUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => this.productImage.set(reader.result as string);
  reader.readAsDataURL(file);

  this.generateProductListing(file);
}

generateProductListing(file: File) {
  this.loadingProduct.set(true);
  this.productResult.set(null);

  this.aiService.generateProduct(file).subscribe({
    next: (res: any) => {
      this.loadingProduct.set(false);
      this.productResult.set(res.ai);
    },
    error: () => this.loadingProduct.set(false)
  });
}



}


