import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Error } from '@app/_models';
import { JwtToken } from './jwttoken.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  constructor(private http: HttpClient, private header: JwtToken) {}

  findAll(env: string, level: string, event: string, details: string) {
    return this.http.get<Error[]>(`${environment.apiUrl}/error?environment=${env}&level=${level}&event=${event}&description=${details}`, this.header.deductHeader());
  }

  detailsError(id: number) {
    return this.http.get<Error[]>(`${environment.apiUrl}/error/${id}`, this.header.deductHeader());
  }
  foFile(id: number) {
    return this.http.patch(`${environment.apiUrl}/error/${id}`, id, this.header.deductHeader());
  }
}
