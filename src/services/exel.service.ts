import { Injectable } from '@angular/core';
import {User} from '../app/types/userData';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExelService {

  constructor() { }


  convertJsonToXlsx(jsonData: User[]): Observable<Blob> {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Use XLSX.write to get the raw data
    const rawXlsxData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convert raw data to a Blob with the correct MIME type
    const blob = new Blob([rawXlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    return new Observable((observer) => {
      observer.next(blob);
      observer.complete();
    });
  }
  
}
