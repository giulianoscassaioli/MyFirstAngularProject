import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Impiegato } from './impiegato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImpiegatoService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor( private http: HttpClient) { }

  public getImpiegati(): Observable<Impiegato[]>{
    return this.http.get<Impiegato[]>(`${this.apiServerUrl }/impiegato`)
  }

  public addImpiegato(impiegato: Impiegato): Observable<Impiegato>{
    return this.http.post<Impiegato>(`${this.apiServerUrl }/impiegato`,impiegato)
  }

  public updateImpiegato(impiegato: Impiegato): Observable<Impiegato>{
    return this.http.put<Impiegato>(`${this.apiServerUrl }/impiegato`,impiegato)
  }
  public deleteImpiegato(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl }/impiegato/${employeeId}`)
  }

}
