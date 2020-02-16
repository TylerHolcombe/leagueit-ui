import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token: string = localStorage.getItem('currentToken');
		if (token) {
			req = req.clone({ setHeaders: { 'Authorization': token } });
		}

		return next.handle(req);
	}
}
