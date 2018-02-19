import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

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
  /**
   * Custom validator for username field
   */
  private userNameValidator(): ValidatorFn {
    // resolve to use [a-zA-Z0-9_], `.`, `@` and `-` with length 2-30 characters
    const pattern: RegExp = /^[\w\.\@\-]{2,30}$/;

    return (control: AbstractControl): { [key: string]: any } =>
      !(control.dirty || control.touched)
        ? null
        : pattern.test(control.value)
          ? null
          : {custom: `Min length: 5, can't contain whitespaces & special symbols.`} // custom error and relevant message
  }

  /* name: FormControl = new FormControl('', [
    Validators.required,
    this.userNameValidator()
  ]); */

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      this.userNameValidator()
    ]), // this.name
    email: new FormControl(''),
    address: new FormGroup({
      country: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required
      ])
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
