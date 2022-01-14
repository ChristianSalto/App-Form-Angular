import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl('RTX-400'),
  //   price:new FormControl(1500),
  //   stocks: new FormControl(5)
  // });

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [, [Validators.required, Validators.min(0)]],
    stocks: [, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm.reset({
      name: 'RTX-4000',
      price: 2000,
    });
  }

  isValidName(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  handleOnSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
