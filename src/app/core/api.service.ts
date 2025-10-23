import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest } from './models/auth.model';
import { Product } from './models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://api.ejemplo.com/api';


  // Authentication Methods
  public login(request : LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${this.apiUrl}/auth/login`, request);
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
