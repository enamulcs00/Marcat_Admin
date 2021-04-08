import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularMobilenumberCountrycodeDropdownService {

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {
    console.log('==============')
    return this.http.get('./../package.json');
  }
}
