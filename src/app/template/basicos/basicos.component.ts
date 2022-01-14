import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    producto: 'PS4',
    precio: 400,
    existencias: 20,
  };

  constructor() {}

  ngOnInit(): void {}

  handleNameValid(): boolean {
    return (
      this.myForm?.controls.producto?.invalid &&
      this.myForm?.controls.producto?.touched
    );
  }

  handlePriceValid(): boolean {
    return (
      this.myForm?.controls.precio?.touched &&
      this.myForm?.controls.precio?.value < 0
    );
  }

  handleForm() {
    console.log(this.myForm.value);

    this.myForm.resetForm({
      precio: 0,
      existencias: 0,
    });
  }
}
