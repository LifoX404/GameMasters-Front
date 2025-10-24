import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RawLoginResponse } from './models/auth.model';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

login(credentials: LoginRequest): Observable<LoginResponse> {
  return this.http.post<RawLoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
    // extraer el objeto "data" si existe; si no, usar el objeto raíz
    map(res => (res && res.data) ? res.data : res as unknown as LoginResponse),
    tap(data => {
      if (data?.status) {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
        }
        if (data.username) {
          localStorage.setItem('username', data.username);
        }

        // llamar al método para obtener token, no pasar la referencia de la función
        console.log('localStorage:', { token: this.getToken(), username: this.getUsername() });
      }
    })
  );
}


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
