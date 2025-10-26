import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderList } from '../../../core/models/order.model';
import { DetallesComponent } from './detalles/detalles.component';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    ProgressSpinnerModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  ordenes: OrderList[] = []; // <-- Quita el @Input()
  loading: boolean = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private orderService: ApiService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSeverity(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'info';
    case 'PROCESSING':
      return 'secondary';
    case 'SHIPPED':
      return 'help';
    case 'DELIVERED':
      return 'success';
    case 'CANCELED':
      return 'danger';
    default:
      return 'info';
  }
}

  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.ordenes = response.data || []; // <-- Cambia orders por ordenes
          console.log('Ordenes cargadas:', this.ordenes);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al conectar con el servidor';
          console.error('Error:', err);
          this.loading = false;
        },
      });
  }

  generarReporte() {
    // Lógica para abrir un modal o redirigir a la creación de orden
    console.log('Crear nueva orden');
  }

  refrescarOrdenes() {
    // Lógica para recargar la lista de órdenes
    console.log('Refrescando órdenes...');
  }
}
