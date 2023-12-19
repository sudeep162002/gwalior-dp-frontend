import { Component, OnInit } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  // openDialog() {
  //   this.modalService.openWideCardDialog();
  // }
  cardArray = [
    { title: 'Card 1', content: 'Content for Card 1' },
    { title: 'Card 2', content: 'Content for Card 2' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 3', content: 'Content for Card 3' },
  
    // Add more cards as needed
  ];

  searchTerm: string = ''; // Add a property for the search term
  filteredCardArray: any[] = [];


  openCardDetailsDialog(card: any): void {
    this.dialog.open(CardDetailsComponent, {
      width: '400px', // Adjust the width as needed
      data: card
    });
  }
  ngOnInit(): void {
  }


  search(): void {
    // Perform search logic based on the searchTerm
    this.filteredCardArray = this.cardArray.filter(card =>
      card.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}





