import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos-crear.component.html',
  styleUrls: ['./productos-crear.component.css']
})
export class ProductosCrearComponent {
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