import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentEmail: string;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {

        password = btoa(password);
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password } )
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentEmail', email);
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentEmail');
        this.currentUserSubject.next(null);
    }
}
