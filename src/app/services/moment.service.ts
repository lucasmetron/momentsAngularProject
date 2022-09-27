import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../interfaces/Moments';
import { Response } from '../interfaces/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseAPiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }
  createMoment(formaData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formaData);
  }
  removeMoment(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  updateMoment(id: number, formData: FormData) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }
}
