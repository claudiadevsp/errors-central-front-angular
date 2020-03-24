import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class JwtToken {

  public deductHeader() {
    return { headers: this.hasToken() ? this.securityHeaders() : this.headers() };
  }

  protected headers(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
  }

  protected securityHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      });
  }

  protected getCurrentUser() {
      const token = localStorage.getItem('currentUser');
      if (token) {
        return JSON.parse(token);
      }
      return null;
  }

  protected getToken(): string {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        return currentUser.token;
      }

      return null;
  }

  hasToken(): boolean {
      const jwt = this.getToken();
      return jwt != null && jwt !== '';
  }
}
