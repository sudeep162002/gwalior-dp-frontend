import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { Observable } from 'rxjs';
import * as htmlToImage from 'html-to-image';

import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  convertHtmlToImage(html: string): Observable<Blob> {
    return new Observable(observer => {
      const container = document.createElement('div');
      container.innerHTML = html;
      
      html2pdf.toBlob(container, { quality: 1 })
        .then(blob => {
          console.log(blob)
          observer.next(blob);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  downloadImage(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }
}
