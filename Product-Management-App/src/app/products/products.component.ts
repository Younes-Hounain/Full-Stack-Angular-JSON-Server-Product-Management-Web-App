import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Array<Product>=[];
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts()
      .subscribe(data => {
          this.products = data
        },
        error => {
          console.log(error);
        });
  }
  //this.products$ = this.productsService.getProducts();

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
      next: updatedProduct => {
        product.checked =! product.checked;
        //this.getProducts();
        }
      })
  }
  handleDeleteProduct(product: Product) {
    if (confirm("Are you sure you want to delete this product?"))
    this.productService.deleteProduct(product).subscribe((data: any) => {
      //this.getProducts();
      this.products = this.products.filter(p => p.id!= product.id)
    })  }
}
