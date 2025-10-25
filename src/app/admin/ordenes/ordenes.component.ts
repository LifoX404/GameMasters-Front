import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { DetallesComponent } from './table/detalles/detalles.component';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {
  vista: 'tabla' | 'detalles' = 'tabla';

  mostrarDetalles() {
    this.vista = 'detalles';
  }

  volverATabla() {
    this.vista = 'tabla';
  }
}