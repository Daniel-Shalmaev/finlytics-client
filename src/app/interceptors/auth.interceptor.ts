import { HttpInterceptorFn } from '@angular/common/http';

// Intercepts outgoing HTTP requests and attaches the Authorization header if a token exists
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userId'); // Retrieve token (or user ID) from local storage

  if (token) {
    // Clone the original request and add the Authorization header
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq); // Send the modified request
  }

  // No token available: send the original request unmodified
  return next(req);
};
