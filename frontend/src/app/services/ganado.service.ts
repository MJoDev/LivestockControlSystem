import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ganado} from '../models/ganado';

@Injectable({
  providedIn: 'root'
})
export class GanadoService {

  url = 'http://localhost:4000/api/ganado/';
  upload = 'http://localhost:4000/api/upload';

  constructor(private http: HttpClient) { 
  }
  getGanados(): Observable<any>{
    return this.http.get(this.url);
  }
  eliminarGanado(id: string): Observable<any>{
    return this.http.delete(this.url + id)
  }
  guardarGanado(ganado: Ganado): Observable<any>{
    return this.http.post(this.url, ganado);
  }
  obtenerGanado(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }
  editarGanado(id: string, ganado: Ganado): Observable<any>{
    return this.http.put(this.url + id, ganado);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.upload, formData);
  }
}
