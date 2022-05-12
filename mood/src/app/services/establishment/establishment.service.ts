import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from 'config/app.config';
import { Observable } from 'rxjs';
import { EstablishmentDetails } from 'src/app/models/out/EstablishmentDetails';
import { EstablishmentForm } from 'src/app/models/in/EstablishmentForm';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private url: string = HOST.apiUrl;
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }

  public getAllEstablishmentsChecked(): Observable<EstablishmentDetails[]> {
    return this.http.get<EstablishmentDetails[]>(`${this.url}establishments`);
  }

  public getEstablishment(establishmentId: number): Observable<EstablishmentDetails> {
    return this.http.get<EstablishmentDetails>(`${this.url}establishment/${establishmentId}`);
  }

  public getEstablishmentsByName(establishmentName: string): Observable<EstablishmentDetails[]> {
    return this.http.get<EstablishmentDetails[]>(`${this.url}establishments/${establishmentName}`);
  }

  public getEstablishmentsByCategory(categoryId: number): Observable<EstablishmentDetails[]> {
    return this.http.get<EstablishmentDetails[]>(`${this.url}establishments/category/${categoryId}`);
  }

  public getEstablishmentsByStatus(status: number): Observable<EstablishmentDetails[]> {
    return this.http.get<EstablishmentDetails[]>(`${this.url}establishmentsByStatus/${status}`);
  }

  public getEstablishmentWithInDistance(latitude: string, longitude:string, distance: string): Observable<EstablishmentDetails[]> {
    return this.http.get<EstablishmentDetails[]>(`${this.url}establishment/withindistancebygeocode?latitude=${latitude}&longitude=${longitude}&distance=${distance}`)
  }

  public addEstablishment(establishment: EstablishmentForm): Observable<EstablishmentForm> {
    return this.http.post<EstablishmentForm>(`${this.url}newEstablishment`, establishment);
  }

  public updateEstablishment(establishment: EstablishmentForm): Observable<EstablishmentForm> {
    return this.http.put<EstablishmentForm>(`${this.url}establishment/${establishment}`, establishment);
  }

  public deleteEstablishment(establishmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}establishment/${establishmentId}`);
  }
}