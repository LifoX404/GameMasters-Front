import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


    username: string | null = null;
  userRol: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userRol = localStorage.getItem('userRol');
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userRol');
    this.router.navigate(['/login']);
  }

}
