import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemoizeHttpService {
  private cache: { [key: string]: any } = {}; // Cache to store responses

  constructor(private http: HttpClient) {}

  // Memoize GET requests with retry logic
  memoizeGet<T>(url: string, params?: HttpParams): Observable<T> {
    const key = this.generateCacheKey(url, params);

    if (this.cache[key]) {
      console.log('Returning cached GET response for:', key);
      return of(this.cache[key]);
    }

    return this.http.get<T>(url, { params }).pipe(
      retry(3), // Retry the GET request up to 3 times in case of error
      tap(response => {
        console.log('Caching GET response for:', key);
        this.cache[key] = response;
      })
    );
  }

  // Memoize POST requests with retry logic
  memoizePost<T>(url: string, body: any, params?: HttpParams): Observable<T> {
    const key = this.generateCacheKey(url, params, body);

    if (this.cache[key]) {
      console.log('Returning cached POST response for:', key);
      return of(this.cache[key]);
    }

    return this.http.post<T>(url, body, { params }).pipe(
      retry(3), // Retry the POST request up to 3 times in case of error
      tap(response => {
        console.log('Caching POST response for:', key);
        this.cache[key] = response;
      })
    );
  }

  // Generate a unique cache key based on the URL, query params, and body
  private generateCacheKey(url: string, params?: HttpParams, body?: any): string {
    let key = url;
    if (params) {
      key += '?' + params.toString();
    }
    if (body) {
      key += JSON.stringify(body); // Include the body in the key for POST requests
    }
    return key;
  }

  // Clear the entire cache
  clearCache() {
    this.cache = {};
  }
}
