import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:4000/api/producto/';

  constructor(private http: HttpClient) { 
  }
  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }
  eliminarProducto(id: string): Observable<any>{
    return this.http.delete(this.url + id)
  }
  guardarProducto(producto: Product): Observable<any>{
    return this.http.post(this.url, producto);
  }
  obtenerProducto(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }
  editarProducto(id: string, producto: Product): Observable<any>{
    return this.http.put(this.url + id, producto);
  }
}
