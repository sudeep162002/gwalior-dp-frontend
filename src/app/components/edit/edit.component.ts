import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {User} from '../../types/userData';
import { ApiService } from '../../../services/api.service';
import {LandingPageComponent} from '../landing-page/landing-page.component'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public family: any,private apiService: ApiService,private dialogRef: MatDialogRef<EditComponent>) {
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
      swastyayani: ['', Validators.required],
      istavrity: ['', Validators.required],
      acharyavrity: ['', Validators.required],
      dakshina: ['', Validators.required],
      sangathani: ['', Validators.required],
      ritwicki: ['', Validators.required],
      proname: ['', Validators.required],
      anandabazar: ['', Validators.required],
      srimandir: ['', Validators.required],
      parivrity: ['', Validators.required],
      misc: ['', Validators.required]
    });
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
          this.dialogRef.close({ resultData: data.message });
        }
      });
  }


  
}
