import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent {
  formProducto: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formProducto = this.fb.group({
      nombreProducto: ['', Validators.required],
      imagenProducto: ['', Validators.required],
      descripcionProducto: [''],
      precioProducto: [0, Validators.required],
      stockProducto: [0, Validators.required],
    });
  }

  crearProducto() {
    if (this.formProducto.valid) {
      console.log('Nuevo producto:', this.formProducto.value);
      alert('Producto creado correctamente');
      this.formProducto.reset();
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }
}
