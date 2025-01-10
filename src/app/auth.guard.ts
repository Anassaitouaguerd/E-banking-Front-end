import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.navigate(['/home']);
    alert("login before all ... ");
    return false;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    
    console.log(decodedToken.role);
    
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      router.navigate(['/home']);
      return false;
    }

    if(decodedToken.role !== "ADMIN"){
      router.navigate(['/home']);
      return false; 
    } 
    return true;
  } catch {
    router.navigate(['/home']);
    return false;
  }
};