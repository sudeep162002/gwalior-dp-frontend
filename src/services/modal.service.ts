import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LandingPageComponent} from '../app/components/landing-page/landing-page.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openWideCardDialog() {
    this.dialog.open(LandingPageComponent, {
      width: '400px', // Adjust the width as needed
    });
  }
}
