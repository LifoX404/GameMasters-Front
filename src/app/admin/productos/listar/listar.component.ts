import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {Subject, takeUntil} from 'rxjs';
import {ApiService} from '../../../core/api.service';
import {Product} from '../../../core/models/products.model';
import {Card} from 'primeng/card';
import {ProgressSpinner} from 'primeng/progressspinner';
import {EditarComponent} from './editar/editar.component';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    TagModule,
    ButtonModule,
    PaginatorModule,
    Card,
    ProgressSpinner,
    EditarComponent,
    Dialog,
  ],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit, OnDestroy{
  productos: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  // Variables para el modal
  mostrarModal = false;
  productoSeleccionado: any = null;

  private destroy$ = new Subject<void>();

  constructor(private productService: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productos = response.data || [];
          console.log('Productos cargados:', this.productos);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al conectar con el servidor';
          console.error('Error:', err);
          this.loading = false;
        },
      });
  }

  editar(item: any) {
    console.log('Editando producto:', item);
    this.productoSeleccionado = item.id; // Solo pasa el ID
    this.mostrarModal = true;
  }

  actualizarProducto() {
    console.log('Producto actualizado exitosamente');
    this.cerrarModal();
    this.loadProducts(); // Recarga la lista para ver los cambios
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  crearProducto() {

  }

}

