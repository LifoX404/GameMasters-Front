import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos-editar.component.html',
  styleUrls: ['./productos-editar.component.css']
})
export class ProductosEditarComponent implements OnInit {
  formProducto!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formProducto = this.fb.group({
      codigoProducto: [''],
      nombreProducto: [''],
      imagenProducto: [''],
      descripcionProducto: [''],
      precioProducto: [0],
      stockProducto: [0],
      status: ['Activo']
    });
  }

  guardarCambios() {
    console.log('Producto editado:', this.formProducto.value);
  }
}