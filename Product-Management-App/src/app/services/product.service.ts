import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host:string = "http://localhost:8089";

  constructor(private http: HttpClient) { }

  searchProducts(keyword:string='',page : number=1, size:number=4){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'})
  }
  checkProduct(product:Product) {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked:!product.checked})
  }
  deleteProduct(product:Product) {
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`,
      product);
  }
  //searchProducts(keyword:string, page:number, size:number):Observable<Array<Product>> {
  //  return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  //}    we don't need this method anymore because we are using the getProducts method which contains everything we need.
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);

  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);

  }
}
