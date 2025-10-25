import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Aunque no se use, estaba en tu código
import { OrderList } from '../../../../core/models/order.model';
import { ApiService } from '../../../../core/api.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
// Importa las dependencias necesarias


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, CardModule,
    InputTextModule,
    InputTextarea,
    TagModule,
    TableModule,
    DividerModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  @Input({ required: true }) id!: number;
  orden: OrderList | null = null;
  loading = true;
  error: string | null = null;

  // Si solo usas @Input, puedes eliminar 'private route: ActivatedRoute'
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.apiService.getOrderById(id).subscribe({
      next: (response) => {
        this.orden = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar la orden:', err);
        this.error = 'No se pudo cargar la orden';
        this.loading = false;
      }
    });
  } else {
    this.error = 'ID no encontrado';
    this.loading = false;
  }
}

getSeverity(status: string): string {
  switch (status) {
    case 'ENTREGADO': return 'success';
    case 'ENVIADO': return 'info';
    case 'CANCELADO': return 'danger';
    default: return 'warning';
  }
}
}
