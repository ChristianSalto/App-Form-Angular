import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import {
  emailPattern,
  handleUsernameValidators,
  nameSecondNamePattern,
} from 'src/app/shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vs.nameSecondNamePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.emailValidator],
      ],
      username: ['', [Validators.required, this.vs.handleUsernameValidators]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.handleEqualsFields('password', 'password2')],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;
    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El formato es incorrecto';
    } else if (errors?.emailIsInDB) {
      return 'El email ya se encuentra en la BD';
    }

    return '';
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.myForm.reset({
      name: 'Christian Salto',
      email: 'test1@test.com',
      username: 'belial-vk',
      password: '123456',
      password2: '123456',
    });
  }

  handleNameValidators(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  handleOnSubmit() {
    console.log(this.myForm.value);

    this.myForm.markAllAsTouched();
  }
}
