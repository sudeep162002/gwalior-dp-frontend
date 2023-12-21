import { Component, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import {EditComponent} from '../edit/edit.component';
import { ApiService } from '../../../services/api.service';
import {MatDialogRef,MatDialog } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { DataSource } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog,private apiService: ApiService,private _snackBar: MatSnackBar) { }
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
        console.log(this.aggregatedUsers);
      });

      
  }

total(card: any):any{

  total:Number;
  // this.total=5;



  
  
}
familyTotal(card: any):any{

  total:Number;
  // this.total=5;



  
  
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




