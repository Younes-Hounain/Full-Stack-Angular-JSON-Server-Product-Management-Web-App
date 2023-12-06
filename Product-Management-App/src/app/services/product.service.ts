import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts():Observable<Array<Product>> {
    return this.http.get<Array<Product>>("http://localhost:8089/products");
  }
  checkProduct(product:Product) {
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
  }
  deleteProduct(product:Product) {
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`);
  }
}
