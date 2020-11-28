import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Log } from './log.model';
import { API } from '../app.api';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	constructor(private http: HttpClient) {}

	getLogs(search?: string): Observable<Log[]> {
		return this.http.get<Log[]>(`${API}/access_log`);
	}

	getlogById(id: string): Observable<Log> {
		return this.http.get<Log>(`${API}/access_log/${id}`);
	}

	save(form) {
		return this.http
			.post<any>(`${API}/access_log`, form)
			.subscribe((data) => {});
	}
	ip() {
		return this.http.get<any>('https://api.ipify.org');
	}
}
