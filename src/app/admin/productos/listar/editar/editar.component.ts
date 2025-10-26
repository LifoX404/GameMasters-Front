import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {Product} from '../../../../core/models/products.model';
import {ApiService} from '../../../../core/api.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputNumberModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit, OnChanges {
  @Input() productoId!: number; // Recibe solo el ID
  @Output() onGuardar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  formProducto!: FormGroup;
  loading: boolean = true;
  guardando: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Inicializamos el formulario siempre para evitar errores de "Cannot find control"
    this.inicializarFormulario();

    // Si el productoId ya está disponible al inicializar, cargamos el producto
    if (typeof this.productoId !== 'undefined' && this.productoId !== null) {
      this.cargarProducto();
    } else {
      // Si no hay ID, estamos en modo vacío (crear o error) — dejamos loading en false
      this.loading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el Input productoId cambia y ya tenemos el formulario, cargamos el producto
    if (changes['productoId'] && !changes['productoId'].isFirstChange()) {
      const current = changes['productoId'].currentValue;
      if (typeof current !== 'undefined' && current !== null) {
        this.cargarProducto();
      }
    }
  }

  inicializarFormulario() {
    this.formProducto = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      details: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imgUrl: [''],
      status: [true],
      categoryId: [null],  // Hacer opcional en edición si no se maneja categoría
    });
  }


  cargarProducto() {
    // Protecciones por si no hay ID
    if (typeof this.productoId === 'undefined' || this.productoId === null) {
      this.error = 'ID de producto inválido';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.apiService.getProduct(this.productoId).subscribe({
      next: (res: any) => {
        // El backend puede devolver { data: Product } o directamente Product
        const producto: Product = res && res.data ? res.data : res;
        console.log('Producto cargado:', producto);
        // Patch usando el producto recibido
        this.formProducto.patchValue({
          id: producto.id,
          name: producto.name,
          description: producto.description,
          details: producto.details,
          price: producto.price,
          stock: producto.stock,
          imgUrl: producto.imgUrl,
          status: producto.status,
          categoryId: (producto as any).categoryId ?? producto.category?.id ?? null,
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar producto:', err);
        this.error = 'Error al cargar los datos del producto';
        this.loading = false;
      },
    });
  }

  guardarCambios() {
    if (this.formProducto.valid) {
      this.guardando = true;
      this.error = null;

      const updateRequest = {
        name: this.formProducto.value.name,
        description: this.formProducto.value.description,
        details: this.formProducto.value.details,
        price: this.formProducto.value.price,
        stock: this.formProducto.value.stock,
        imgUrl: this.formProducto.value.imgUrl,
        status: this.formProducto.value.status,
        categoryId: this.formProducto.value.categoryId
      };

      this.apiService.updateProduct(this.productoId, updateRequest).subscribe({
        next: () => { // Puede omitir el parámetro 'response'
          console.log('Producto actualizado exitosamente.'); // Mensaje más simple
          this.guardando = false;
          this.onGuardar.emit(); // Notifica al padre que se guardó
        },
        error: (err: any) => {
          console.error('Error al actualizar producto:', err);
          this.error = 'Error al guardar los cambios';
          this.guardando = false;
        },
      });
    } else {
      // Marca todos los campos como tocados para mostrar errores
      Object.keys(this.formProducto.controls).forEach(key => {
        this.formProducto.get(key)?.markAsTouched();
      });
    }
  }

  cancelar() {
    this.onCancelar.emit();
  }

  // Helper para mostrar errores en el template
  hasError(field: string): boolean {
    const control = this.formProducto.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.formProducto.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }
    return '';
  }
}
