import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnChanges{
  destroyed$ = new Subject();
  products: any;

  @Input() isAdmin: boolean = false;
  @Input() updatedProduct: any = null;
  @Input() addedProduct: any = null;
  @Input() productsList: any = null;
  @Output() fetchProductDetails = new EventEmitter();
  
  constructor(
    public commonService: CommonService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.products = changes['productsList'].currentValue
  }
  
  
  ngOnInit(): void {
    this.commonService.getAllProducts().pipe(takeUntil(this.destroyed$)).subscribe(
      (products) =>{
        this.products = products;
        if(this.updatedProduct){
          this.products.map((product: any, index:number)=>{
            if(product.id == this.updatedProduct.id) {
              this.products[index] = this.updatedProduct;
            }
          })
        }
        else if(this.addedProduct) {
          this.products.push(this.addedProduct);
        }
        else if(this.productsList){
          this.products = this.productsList;
        }
      }
    );
  }

  fetchAndEditProduct(productId: number) {
    this.fetchProductDetails.emit(this.products[productId].id);
  }
  deleteProduct(productId: number) {
    this.commonService.deleteProduct(this.products[productId].id).pipe(takeUntil(this.destroyed$)).subscribe(
      (product:any)=>{
        if(product.id>=0){
          console.log(product);
          this.products.splice(productId,1);
        }
        else{
          alert("Something went wrong");
        }
      },
      (error=>{
        alert("Something went wrong");
      })
    );
  }


  sortItems(sortIndex: number) {
    switch(sortIndex) {
      case 0: {
        this.products.sort((a: any, b: any) => {
          let fa = a.title.toLowerCase(),
              fb = b.title.toLowerCase();
      
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
      });
        break;
      }
      case 1: {
        this.products.sort((a:any, b:any) => {
          return a.price - b.price;
      });
        break;
      }
      case 2: {
        this.products.sort((a:any, b:any) => {
          return b.price - a.price;
      });
        break;
      }
      case 3: {
        this.products.sort((a:any, b:any) => {
          return b.rating.rate - a.rating.rate;
      });
        break;
      }
    }
  }
}
