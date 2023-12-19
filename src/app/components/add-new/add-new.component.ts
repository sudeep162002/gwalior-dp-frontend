import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  familyForm: FormGroup;

  
  createForm() {
    this.familyForm = this.fb.group({
      id: ['', Validators.required],
      fullName: ['', Validators.required],
      ritwickName: ['Worker', Validators.required],
      swastyayani: ['Swastyayani', Validators.required],
      istavrity: ['Istavrity', Validators.required],
      acharyavrity: ['Acharyavrity', Validators.required],
      dakshina: ['Dakshina', Validators.required],
      sangathani: ['Sangathani', Validators.required],
      ritwicki: ['Ritwicki', Validators.required],
      proname: ['Proname', Validators.required],
      anandabazar: ['Anandabazar', Validators.required],
      srimandir: ['Srimandir', Validators.required],
      parivrity: ['Parivrity', Validators.required],
      misc: ['Miscellaneous', Validators.required]
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.familyForm.value);
  }

}
