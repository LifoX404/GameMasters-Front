import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Ajusta la ruta
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  username: string | null = null;
  userRol: string | null = null;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    // Suscríbete a los observables
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
    
    this.authService.userRol$.subscribe(userRol => {
      this.userRol = userRol;
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}