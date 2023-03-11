import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private apiUrl = 'https://api.shrtco.de/v2';

  constructor(private http: HttpClient) { }

  shortenUrl(url: string): Observable<any> {
    const endpoint = `${this.apiUrl}/shorten?url=${url}`;
    return this.http.get(endpoint);
  }

}
