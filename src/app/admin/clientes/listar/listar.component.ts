// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiService } from '../../../core/api.service'; // adjust path depending on your folder structure
// import { Customer } from '../../../core/models/customer.model'; // same here

// @Component({
//   selector: 'app-listar',
//   templateUrl: './clientes.component.html',
//   styleUrls: ['./clientes.component.css']
// })
// export class ListarClientesComponent implements OnInit {
//   clientes: Customer[] = [];
//   loading = false;
//   error: string | null = null;

//   constructor(private router: Router, private apiService: ApiService) {}

//   ngOnInit() {
//     this.loadClientes();
//   }

//   loadClientes() {
//     this.loading = true;
//     this.apiService.getClientes().subscribe({
//       next: (res) => {
//         this.clientes = res.data || []; // in case 'data' is missing
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching clients:', err);
//         this.error = 'No se pudieron cargar los clientes.';
//         this.loading = false;
//       }
//     });
//   }

//   editarCliente(cliente: Customer) {
//     this.router.navigate(['clientes/editar', cliente.id]);
//   }

//   eliminarCliente(cliente: Customer) {
//     if (confirm('¿Está seguro? Esta acción no se puede deshacer.')) {
//       this.apiService.deleteCliente(cliente.id).subscribe({
//         next: () => {
//           this.clientes = this.clientes.filter(c => c.id !== cliente.id);
//         },
//         error: (err) => {
//           console.error('Error deleting client:', err);
//           alert('No se pudo eliminar el cliente.');
//         }
//       });
//     }
//   }
// }