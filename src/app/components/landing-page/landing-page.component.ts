import { Component, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { ApiService } from '../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog,private apiService: ApiService) { }
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


  openCardDetailsDialog(user: User): void {
    this.dialog.open(CardDetailsComponent, {
      width: '400px', // Adjust the width as needed
      data: user
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





