import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Aunque no se use, estaba en tu código
import { OrderList } from '../../../../core/models/order.model';
import { ApiService } from '../../../../core/api.service';
// Importa las dependencias necesarias


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  @Input({ required: true }) id!: number;
  orden: OrderList | null = null; // Mejor usar 'null' en lugar de 'OrderList = null'
  loading = true;
  error: string | null = null;

  // Si solo usas @Input, puedes eliminar 'private route: ActivatedRoute'
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.apiService.getOrderById(this.id).subscribe({
        next: (data) => {
          this.orden = data;
          this.loading = false;
        },
        // EL ARREGLO ESTÁ AQUÍ: Usamos (err) y llaves {}
        error: (err) => { 
          console.error('Error al cargar la orden:', err); // Para depuración
          this.error = 'No se pudo cargar la orden';
          this.loading = false;
          this.orden = null; // Limpiamos la orden en caso de error
        }
      });
    } else {
      this.error = 'ID no encontrado';
      this.loading = false;
    }
  }
}