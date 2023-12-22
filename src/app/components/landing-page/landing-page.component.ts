import { Component, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import {EditComponent} from '../edit/edit.component';
import { ApiService } from '../../../services/api.service';
import {MatDialogRef,MatDialog } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { DataSource } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExelService } from '../../../services/exel.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog,private apiService: ApiService,private _snackBar: MatSnackBar,private excelService: ExelService) { }
  // openDialog() {
  //   this.modalService.openWideCardDialog();
  // }
  // cardArray = [
    
  //   // Add more cards as needed
  // ];

  cardArray : User[]=[];
  searchTerm: string = ''; // Add a property for the search term
  filteredCardArray: any[] = [];
  aggregatedUsersObject: { [userId: string]: User[] } = {};
 // Assuming aggregatedUsers is already populated
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
      if(result && result.resultData)this.openSnackBar(result.resultData,'close!');
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
    const intValue = parseInt(value, 10);
  
    // Check if the result is NaN (Not a Number)
    if (isNaN(intValue)) {
      console.error(`Failed to convert "${value}" to an integer.`);
      return null; // or handle the error in another way
    }
  
    return intValue;
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

  // aggrigateData(arr:User[]){
  //   let myMap = new Map();
  //   arr.forEach(value=> {
  //     console.log("its starting")
  //     // value.fullName;
  //     console.log(value.fullName)
  //   });
  // }



  search(): void {
    // Perform search logic based on the searchTerm
    this.filteredCardArray = this.cardArray.filter(card =>
      card.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  printDoc(): void {
    let allData: User[] = [];
  
    for (let i = 0; i < this.aggregatedUsers.length; i++) {
      let jsonData = this.aggregatedUsers[i][1];
  
      // Filter out the _id property from each set of rows
      jsonData = jsonData.map(({ misc, ...rest }) => rest);
  
      // Add the current set of rows to allData
      allData = allData.concat(jsonData);
  
      // Add 5 empty rows after each set of rows (excluding the last set)
      if (i < this.aggregatedUsers.length - 1) {
        for (let j = 0; j < 5; j++) {
          allData.push({});
        }
      }
    }
  
    // Download the final aggregated data
    this.downloadAllData(allData);
  }
  
  private downloadAllData(jsonData: User[]): void {
    this.excelService.convertJsonToXlsx(jsonData).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  
  

}
// @Component({
//   selector: 'sucess-snackbar',
//   templateUrl: 'sucess-snackbar.html',
//   styles: [
//     `
//     .example-pizza-party {
//       color: green;
//     }
//   `,
//   ],
//   standalone: true,
// })
// export class PizzaPartyComponent {}




