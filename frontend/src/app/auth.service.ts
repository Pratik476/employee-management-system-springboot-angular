import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔍 user logged in आहे का?
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // ✅ login success झाल्यावर call करायचं
  loginSuccess(): void {
    localStorage.setItem('loggedIn', 'true');
  }

  // 🚪 logout
  logout(): void {
    localStorage.removeItem('loggedIn');
  }
}
