import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef,MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {


  constructor(private fb: FormBuilder,private apiService: ApiService,private _snackBar: MatSnackBar,private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  familyForm: FormGroup;

  
  createForm() {
    this.familyForm = this.fb.group({
      userId: ['', Validators.required],
      fullName: ['', Validators.required],
      ritwickName: ['', Validators.required],
      swastyayani: ['0', Validators.required],
      istavrity: ['0', Validators.required],
      acharyavrity: ['0', Validators.required],
      dakshina: ['0', Validators.required],
      sangathani: ['0', Validators.required],
      ritwicki: ['0', Validators.required],
      proname: ['0', Validators.required],
      anandabazar: ['0', Validators.required],
      srimandir: ['0', Validators.required],
      parivrity: ['0', Validators.required],
      misc: ['0', Validators.required],
      address: ['', Validators.required]
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.familyForm.value);

    this.apiService.post('insert-user', this.familyForm.value)
      .subscribe(data => {
        // console.log(data.message);
        if(data){
          console.log(data.message);
          this.openSnackBar(data.message,'close!');
           if(data.message==='Data successfully inserted.'){
            this.router.navigate(['/']);
           }
        }
      });
  }

}
