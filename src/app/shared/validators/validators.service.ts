import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public nameSecondNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  handleUsernameValidators(control: FormControl): ValidationErrors | null {
    const value: string = control.value?.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  }

  handleEqualsFields(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {


      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({ noEquals: true });
        return {
          noEquals: true,
        };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
