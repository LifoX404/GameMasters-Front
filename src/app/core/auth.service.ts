import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  RawLoginResponse,
} from './models/auth.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  private usernameSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );
  private userRolSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userRol')
  );

  username$ = this.usernameSubject.asObservable();
  userRol$ = this.userRolSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<RawLoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map((res) =>
          res && res.data ? res.data : (res as unknown as LoginResponse)
        ),
        tap((data) => {
          if (data?.status) {
            // Guardar token
            if (data.jwt) {
              localStorage.setItem('token', data.jwt);
            }
            
            // Guardar username y actualizar subject
            if (data.username) {
              this.setAuthData(data.username, null); // Primero guardamos el username
            }

            console.log('localStorage:', {
              token: this.getToken(),
              username: this.getUsername(),
            });

            // Obtener y guardar el rol
            this.getUserRole(data.username!).subscribe({
              next: (role) => {
                console.log('Rol obtenido:', role);
              },
              error: (err) => {
                console.error('Error al obtener el rol:', err);
              },
            });
          }
        })
      );
  }

  // Método para actualizar el estado de autenticación
  setAuthData(username: string | null, userRol: string | null) {
    if (username) {
      localStorage.setItem('username', username);
      this.usernameSubject.next(username);
    }
    
    if (userRol) {
      localStorage.setItem('userRol', userRol);
      this.userRolSubject.next(userRol);
    }
  }

  logout() {
    // Limpiar todo el localStorage relacionado con auth
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRol');
    
    // Actualizar los subjects
    this.usernameSubject.next(null);
    this.userRolSubject.next(null);
  }

  getUserRole(username: string): Observable<string> {
    return this.http
      .get<{ message: string; data: string }>(
        `${this.apiUrl}/auth/get/${username}`
      )
      .pipe(
        map((res) => res.data),
        tap((role) => {
          if (role) {
            // Usar setAuthData para mantener consistencia
            this.setAuthData(null, role);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  getUserRol(): string | null {
    return this.userRolSubject.value;
  }

  getRole(): string | null {
    return localStorage.getItem('userRol');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}