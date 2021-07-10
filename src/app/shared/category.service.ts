import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44301/api/Categories';
  categData : Category = new Category();
  list : Category[];
  
  getCategories() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as Category[]);
  }
}
