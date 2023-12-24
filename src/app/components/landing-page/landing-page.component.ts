import { Component, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import {EditComponent} from '../edit/edit.component';
import { ApiService } from '../../../services/api.service';
import {MatDialogRef,MatDialog } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { DataSource } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExelService } from '../../../services/exel.service';
// import {PdfService} from '../../../services/pdf-service.service';
import { saveAs } from 'file-saver';
import { PdfService } from '../../../services/pdf-service.service'
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog,private apiService: ApiService,private _snackBar: MatSnackBar,private excelService: ExelService,private pdfService: PdfService) { }
 
  cardArray : User[]=[];
  searchTerm: string = ''; // Add a property for the search term
  filteredCardArray: any[] = [];
  aggregatedUsersObject: { [userId: string]: User[] } = {};
  aggregatedUsers: [string, User[]][]; 



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openCardDetailsDialog(user: User): void {
    this.dialog.open(CardDetailsComponent, {
      maxHeight: '650px',
      data: user
    });
  }

  openEditDialog(user: User): void {
    const dialogRef =this.dialog.open(EditComponent, {
      maxHeight: '650px',
      data: user
    });


     
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result data sent from the dialog
      // console.log('Dialog closed with result:', result);
      if(result && result.resultData=='Data successfully updated.'){

        // console.log(result.resultData);
        // console.log(this.aggregatedUsers)
        this.openSnackBar(result.resultData,'close!');
      }
    });
  }
  ngOnInit(): void {
    this.apiService.get('get-users')
      .subscribe(data => {
        Object.keys(data).forEach(key => {
          const user = data[key];
              const { userId } = user;
              if (!this.aggregatedUsersObject[userId]) {
                this.aggregatedUsersObject[userId] = [];
              }
              this.aggregatedUsersObject[userId].push(user);
        });
        this.aggregatedUsers=Object.entries( this.aggregatedUsersObject);
        // console.log(this.aggregatedUsers);
      });

      
  }
  cti(value: string): number | null {
    const floatValue = parseFloat(value);
  
    // Check if the result is NaN (Not a Number)
    if (isNaN(floatValue)) {
      // console.error(`Failed to convert "${value}" to a float.`);
      return null; // or handle the error in another way
    }
  
    return floatValue;
  }
  
  total(card: any): number {
    let total: number;
    total = 0; // Or whatever value you want to assign to total
    // console.log('Individual total is', card);
    Object.keys(card).forEach(key => {
      if(key==="swastyayani"||key==='istavrity'|| key==='acharyavrity'|| key==='dakshina'|| key==='sangathani'|| key==='ritwicki' ||key==='proname' ||key==='anandabazar' ||key==='srimandir' ||key==='parivrity'){
        // console.log(key);
        let v=this.cti(card[key]);
        if(v){
          
          total+=v;
        }
      }
    });
    return total;
  }

  Familytotal(card: any): number {
    // console.log('this is family tptal card', card)
    let total: number;
    // Your calculation logic here
    total = 0; // Placeholder value, replace with your logic
    // console.log('family total object is', card);
    for(let i=0;i<card.length;i++){
      total+=this.total(card[i]);
    }
    return total;
  }


// Assuming aggregatedUsers is defined as [string, User[]][]
delete(familyId: string): void {
  this.aggregatedUsers = this.aggregatedUsers.filter(([id, _]) => id !== familyId);
}


  search(): void {
    // Perform search logic based on the searchTerm
    this.filteredCardArray = this.cardArray.filter(card =>
      card.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  createPdfHtml(jsonData: any[]): string {
    // console.log(jsonData);
    let html = '<html><body>';
  
    jsonData.forEach((rowArray, index) => {
      const familyCodeRow = rowArray.find((row) => row['Family Code No.']);
  
      if (familyCodeRow && familyCodeRow['Family Code No.']) {
        html += `<div style="margin-top: 10px;">Family Code No.: ${familyCodeRow['Family Code No.']}</div>`;
      }
  
      if (rowArray.length > 0) {
        // Regular data table
        html += '<table style="width:100%; border-collapse: collapse; margin-top: 10px;">';
  
        // html += `<tr>${Object.keys(rowArray[0]).filter(key => key !== '_id' && key !== 'Family Code No.' && key !== 'userId'&& key !== '__v').map(
        //   (key) => `<th style="border: 1px solid #000; padding: 5px;">${key}</th>`
        // ).join('')}</tr>`;
  
        // rowArray.forEach((row) => {
        //   // Add "Total" property to each row
        //   row['Total'] = this.total(row);
  
        //    `<tr>${Object.entries(row).filter(([key]) => key !== '_id' && key !== 'Family Code No.' && key !== 'userId' && key !== '__v').map(
        //     ([key, value]) => `<td style="border: 1px solid #000; padding: 5px;">${value}</td>`
        //   ).join('')}</tr>`;
        // });
  
        html += '</table>';
  
        // Updated data table
        html += '<table style="width:100%; border-collapse: collapse;">';
  
        html += `<tr>${Object.keys(rowArray[0]).filter(key => key !== '_id' && key !== 'Family Code No.' && key !== 'userId' && key !== '__v').map(
          (key) => `<th style="border: 1px solid #000; padding: ${key === 'fullName' || key === 'ritwickName' ? '40px' : '5px'};">${key}</th>`
        ).join('')}</tr>`;
        
  
        rowArray.forEach((row) => {
          html += `<tr>${Object.entries(row).filter(([key]) => key !== '_id' && key !== 'Family Code No.' && key !== 'userId'&& key !== '__v').map(
            ([key, value]) => `<td style="border: 1px solid #000; padding: 5px;">${value}</td>`
          ).join('')}</tr>`;
        });
        html+=`<td style="border: 1px solid #000; padding: 5px;">Total :</td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;"></td>`;
        html+=`<td style="border: 1px solid #000; padding: 5px;">${this.Familytotal(rowArray)}</td>`
  
        html += '</table>';
      }
      // console.log('this is row array',rowArray)
  
      // Add blank space of three lines between different families
      if (index < jsonData.length - 1) {
        html += '<br><br><br>';
      }
    });
  
    html += '</body></html>';
  
    
    return html;
  }
  
  
 downloadPdf(pdfContent: string, filename: string): void {
    const pdfOptions = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2,width: 1100},
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(pdfContent).set(pdfOptions).save();
    
  }
  
  printDoc(): void {
    // console.log('this is agrigate user',this.aggregatedUsers)
    const allData = this.aggregatedUsers.map(([familyCode, jsonData]) => [...jsonData, { 'Family Code No.': familyCode }]);
    
    const htmlContent = this.createPdfHtml(allData);
    
    // const pdfContent = createPdfHtml(jsonData);
    this.downloadPdf(htmlContent, 'your-pdf-filename.pdf');
    
  }
  

}



