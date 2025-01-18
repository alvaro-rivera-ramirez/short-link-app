import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from 'src/enviroments/enviroment.prod';
import { User, AuthStatus, LoginResponse } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  private httpClient = inject(HttpClient);
  constructor() {
    this.checkExistAuth().subscribe();
    this.authStatus();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.httpClient
      .post<LoginResponse>(`${this.baseUrl}auth/login`, body)
      .pipe(
        map(({ user, access_token }) =>
          this.setAuthentication(user, access_token)
        ),
        catchError((err) => throwError(() => 'Credenciales incorrectas'))
      );
  }

  checkExistAuth(): Observable<boolean> {
    const url = `${this.baseUrl}auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, access_token }) =>
        this.setAuthentication(user, access_token)
      ),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
