import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

interface Producto {
  imagenProducto: string;
  nombreProducto: string;
  stockProducto: number;
  status: boolean;
}

@Component({
  selector: 'app-productos-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    TagModule,
    ButtonModule,
    PaginatorModule,
  ],
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.css'],
})
export class ProductosListarComponent {
  productos: Producto[] = [
    {
      imagenProducto: 'https://via.placeholder.com/60',
      nombreProducto: 'Producto demo 1',
      stockProducto: 30,
      status: true,
    },
    {
      imagenProducto: 'https://via.placeholder.com/60',
      nombreProducto: 'Producto demo 2',
      stockProducto: 0,
      status: false,
    },
  ];

  editar(producto: Producto) {
    console.log('Editando:', producto);
  }

  eliminar(producto: Producto) {
    if (confirm(`¿Eliminar ${producto.nombreProducto}?`)) {
      this.productos = this.productos.filter((p) => p !== producto);
    }
  }
}
