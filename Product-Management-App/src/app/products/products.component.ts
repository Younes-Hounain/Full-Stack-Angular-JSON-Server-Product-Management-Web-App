import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products: Array<Product>=[];
  public keyword: string = "";
  totalPages:number = 0;
  pageSize:number=3;
  currentPage:number=1;
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.searchProducts();
  }
  searchProducts() {
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe(resp => {
          this.products = resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          this.totalPages = Math.floor(totalProducts/this.pageSize);
          if (totalProducts%this.pageSize!=0){
            this.totalPages++;
          }
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

  // searchProducts() {
  //   this.currentPage = 1;
  //   this.totalPages = 0;
  //   this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
  //     next: value => {
  //       this.products = value;
  //     }
  //   })
  // }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.searchProducts();

  }
}
