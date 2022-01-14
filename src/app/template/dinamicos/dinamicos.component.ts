import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  @ViewChild('myFormDinamico') myFormDinamico!: NgForm;

  newGame: string = '';

  persona: Persona = {
    nombre: 'Christian',
    favoritos: [
      { id: 1, nombre: 'Civilization' },
      { id: 2, nombre: 'Risk' },
    ],
  };

  handleInputValidate() {
    return (
      this.myFormDinamico?.controls.name?.errors &&
      this.myFormDinamico?.controls.name?.touched
    );
  }

  handleAddNewGame() {
    const newFavorite: Favorito = {
      id: Math.floor(Math.random() * (10 - 3) + 3),
      nombre: this.newGame,
    };

    this.persona.favoritos.push({ ...newFavorite });
    this.newGame = '';
  }

  handleRemoved(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  handleSave() {
    console.log(this.persona);
  }
}
