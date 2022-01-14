import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    terminos: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm.reset({ ...this.persona, terminos: false });

    // this.myForm.get('terminos')?.valueChanges.subscribe((newValue) => {
    //   console.log(newValue);
    // });

    this.myForm.valueChanges.subscribe(({ terminos, ...rest }) => {
      this.persona = rest;
    });
  }

  handleSavePerson() {
    const formValue = { ...this.myForm.value };
    delete formValue.terminos;

    this.persona = formValue;
  }
}
