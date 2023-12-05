import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

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
  products: Array<Product> = [];
  constructor(private productsService:ProductService){

  }

  handleCheckProduct(product: Product) {
    this.productsService.checkProducts(product)
      .subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
        //this.getProducts();
        }
      })
  }

  ngOnInit(): void {
   this.getProducts();
  }

  private getProducts() {
    this.productsService.getProducts()
      .subscribe((data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.log(error);
      });
  }
}
