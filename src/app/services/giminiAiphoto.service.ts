import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class GiminiAiphotoService {

  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  analyzeImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.apiUrl}/analyze`, formData);
  }

  analyzeFace(image: File) {
    const formData = new FormData();
    formData.append("image", image);
    return this.http.post(`${this.apiUrl}/face-attributes`, formData);
  }

  verifyFaceLock(lockImageBase64:any, unlockFile: File) {
  
  const cleanBase64 = lockImageBase64.split(",")[1]; // REMOVE header

  const formData = new FormData();
  formData.append("lockImage", cleanBase64);
  formData.append("unlockImage", unlockFile);

  return this.http.post(`${this.apiUrl}/verify-face-lock`, formData);
}

  readDocument(file: File) {
  const formData = new FormData();
  formData.append("document", file);

  return this.http.post(`${this.apiUrl}/read-document`, formData);
}

generateCaption(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return this.http.post(`${this.apiUrl}/caption-generator`, formData);
}

analyzeThumbnail(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return this.http.post(`${this.apiUrl}/thumbnail-analyze`, formData);
}

analyzeCrop(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return this.http.post(`${this.apiUrl}/crop-suggestion`, formData);
}

renameFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return this.http.post(`${this.apiUrl}/rename-file`, formData);
}


generateProduct(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return this.http.post(`${this.apiUrl}/generate-product-listing`, formData);
}


}
