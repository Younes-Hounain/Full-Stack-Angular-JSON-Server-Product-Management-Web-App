import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private http:HttpClient) {
  }



  products : Array<any> = [];

  handleCheckProduct(product: any) {
    product.checked = !product.checked;
  }

  ngOnInit(): void {
    this.http.get<Array<any>>("http://localhost:8089/products").subscribe((data: any) => {
      this.products = data;
    },
      (error: any) => {
        console.log(error);
      });
  }
}
