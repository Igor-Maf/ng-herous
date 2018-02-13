import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";

/**
 * TODO: Profile выделить в отдельный модуль, подгружать lazy-loading-ом из рутового модуля.
 * @see https://medium.com/@maks.zhitlov/reactive-forms-in-angular-2f8abe884f79
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: FormControl = new FormControl('');

  signUpForm: FormGroup = new FormGroup({
    name: this.name,
    email: new FormControl(''),
    address: new FormGroup({
      country: new FormControl(''),
      city: new FormControl('')
    }),
    contacts: new FormArray([])
  });

  contactTypes: { value: string, title: string }[] = [
    { value: 'phone', title: 'Phone' },
    { value: 'website', title: 'Website' },
    { value: 'skype', title: 'Skype' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.addContact();
  }

  get contacts(): FormArray {
    return this.signUpForm.get('contacts') as FormArray;
  }

  addContact(): void {
    const control = <FormArray>this.signUpForm.get('contacts');

    control.push(
      new FormGroup({
        type: new FormControl(this.contactTypes[0].value),
        value: new FormControl('')
      })
    )
  }

  removeContact(index: number): void {
    const control = <FormArray>this.signUpForm.get('contacts');

    control.removeAt(index);
  }
}
