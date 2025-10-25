import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderList } from '../../../core/models/order.model';
import { DetallesComponent } from "./detalles/detalles.component";
import { EditarComponent } from "./editar/editar.component";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, NgClass, RouterLink, DetallesComponent, EditarComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
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

  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrders()
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
        }
      });
  }
}

