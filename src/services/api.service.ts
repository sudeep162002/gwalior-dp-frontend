// api.service.ts

import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'https://ims-backend-c5de.onrender.com'; // Replace with your API base URL
  private authToken = 'Sudeep@16'; // Replace with your actual authorization token

  constructor() { }

  private getAxiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Authorization': `${this.authToken}`,
        'Content-Type': 'application/json',
      },
    };
  }

  get(endpoint: string): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`;
    return new Observable(observer => {
      axios.get(url, this.getAxiosConfig())
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.baseURL}/${endpoint}`;
    return new Observable(observer => {
      axios.post(url, data, this.getAxiosConfig())
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  put(userId: string, data: any): Observable<any> {
    const url = `${this.baseURL}/update-user/${userId}`;
    return new Observable(observer => {
      axios.put(url, data, this.getAxiosConfig())
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
  

  // Add methods for other HTTP methods as needed (e.g., put, delete, etc.)
}
