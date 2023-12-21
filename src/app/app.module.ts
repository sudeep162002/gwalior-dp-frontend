import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { FormsModule } from '@angular/forms';
import { AddNewComponent } from './components/add-new/add-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './components/edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    CardDetailsComponent,
    AddNewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
