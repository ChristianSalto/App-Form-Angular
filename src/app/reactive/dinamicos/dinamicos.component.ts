import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorite: this.fb.array(
      [
        ['Risk', Validators.required],
        ['Civilization', Validators.required],
      ],
      Validators.required
    ),
  });

  newFavorite: FormControl = this.fb.control('', Validators.required);

  get favoriteArray() {
    return this.myForm.get('favorite') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addFavorite() {
    if (this.newFavorite.invalid) {
      return;
    }

    // this.favoriteArray.push(new FormControl(this.newFavorite.value, Validators.required));
    this.favoriteArray.push(
      this.fb.control(this.newFavorite.value, Validators.required)
    );

    this.newFavorite.reset();
  }

  removeFavorite(index: number) {
    this.favoriteArray.removeAt(index)
  }

  isValidName(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  handleOnSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    console.log(this.myForm.value);
  }
}
