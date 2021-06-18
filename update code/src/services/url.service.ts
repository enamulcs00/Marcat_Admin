import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  baseUrl = "https://api.markat.store";
  imageUrl = "https://api.markat.store/";
  SERVER_URL = "https://api.markat.store"
  constructor() { }
  login = `${this.baseUrl}/login`;
}
