import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { ApiService } from '../../../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LandingPageComponent} from '../landing-page/landing-page.component'
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public family: User,private apiService: ApiService,private dialogRef: MatDialogRef<EditComponent>,private _snackBar: MatSnackBar,private location: Location) {
    this.createForm();
  }


  
  ngOnInit(): void {
    
  }

  familyForm: FormGroup;
  updatedUser: User;
  
  createForm() {
    this.familyForm = this.fb.group({
      
      fullName: ['', Validators.required],
      ritwickName: ['', Validators.required],
      swastyayani: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      istavrity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      acharyavrity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dakshina: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      sangathani: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ritwicki: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      proname: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      anandabazar: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      srimandir: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      parivrity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      misc: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: ['', Validators.required]
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  reloadPage() {
    window.location.reload();
  }
  onSubmit() {
    // Handle form submission logic here
    // console.log('Form submitted:', this.familyForm.value);
    this.updatedUser=this.familyForm.value;
    // console.log(this.updatedUser)
    Object.keys(this.updatedUser).forEach(key => {
      // console.log(this.familyForm.value[key]);
    
      if (this.updatedUser[key] === '') {
        delete this.updatedUser[key];
      }
    });
    
    // console.log(this.family[0])
    this.apiService.put(this.family[0], this.updatedUser)
      .subscribe(data => {
        // console.log(data.message);
        if(data.message){
          this.openSnackBar(data.message,'close!');
          this.dialogRef.close({ resultData: data.message });
          if(data.message==='Data successfully updated.'){
            this.reloadPage();
          }
        }
      });
  }

  onInputChange(event: Event): void {
    // Access the value of the input field
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    // Do something with the input value, e.g., log it
    console.log('Input value:', this.family[1]);
    this.family[1].forEach(mem => {
      if (mem.fullName.toLowerCase().includes(inputValue)) {
        Object.keys(mem).forEach(val => {
          if(val!='fullName'){
            const control = this.familyForm.get(val);
          if (control) {
            control.setValue(mem[val]);
          }
          }
          

        });
        
      }
    });
    
    // console.log(this.familyForm)
      
  }
  
}
