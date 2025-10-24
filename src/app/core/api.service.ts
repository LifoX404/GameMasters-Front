import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from './models/auth.model';
import { Product } from './models/products.model';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


  // Authentication Methods
  public login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.status) {
            localStorage.setItem('token', response.jwt);
            localStorage.setItem('username', response.username);
          }
        })
      );
  }

  public register(request: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.apiUrl}/auth/register`, request);
  }

  //Products Methods

  public getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/product/get`)
  }

  public getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/product/get/${id}`)
  }

  public createProduct(request: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/product/add`, request)
  }

  // public updateProduct(id: number, request: Product): Observable<Product>{
  //   return this.http.put<>
  // }
}
