import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {LoginResponse, RegisterRequest} from './models/auth.model';
import {Product} from './models/products.model';
import {environment} from '../../enviroment';
import {ApiResponse} from './models/common.model';
import {OrderList} from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


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

  // Orders

  public getOrders(): Observable<ApiResponse<OrderList[]>> {
    return this.http.get<ApiResponse<OrderList[]>>(`${this.apiUrl}/orders/get`)
  }

  public getOrdersByCustomer(id : number): Observable<ApiResponse<OrderList[]>> {
    return this.http.get<ApiResponse<OrderList[]>>(`${this.apiUrl}/orders/from/${id}`)
  }

  public getOrderById(id: number): Observable<ApiResponse<OrderList>> {
    return this.http.get<ApiResponse<OrderList>>(`${this.apiUrl}/orders/get/${id}`);
  }



}
