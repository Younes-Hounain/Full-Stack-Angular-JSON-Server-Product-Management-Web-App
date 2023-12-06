import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

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

  constructor(private productService:ProductService, private router:Router, public appState:AppStateService){

  }
  ngOnInit(): void {
    this.searchProducts();
  }
  searchProducts() {
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe(resp => {

          // @ts-ignore
          let products = resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productsState.totalProducts = totalProducts;
          let totalPages = Math.floor(totalProducts/this.appState.productsState.pageSize);
          if (totalProducts%this.appState.productsState.pageSize!=0){
            ++totalPages;
          }
          this.appState.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages : totalPages,
          })
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
      //this.appState.productsState.products = this.appState.productsState.products.filter((p:any) => p.id!= product.id)
      this.searchProducts();
    })
  }

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
    this.appState.productsState.currentPage = page;
    this.searchProducts();

  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
