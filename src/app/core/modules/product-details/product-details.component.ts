import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  @Input() productId: number = -1;
  @Output() updatedProduct = new EventEmitter();
  @Output() addedProduct = new EventEmitter();

  product: any = {};
  destroyed$ = new Subject();
  constructor(
    public commonService: CommonService){}
  
  
  ngOnInit(): void {
    if(this.productId > 0) {
      this.commonService.getProductDetails(this.productId).pipe(takeUntil(this.destroyed$)).subscribe(
        (product)=>{
          this.product = product
        }
      );
    }
  }

  addOrEditProduct() {
    const title = document.getElementById("title") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const category = document.getElementById("category") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;

    this.product.title = title.value;
    this.product.price = price.value;
    this.product.category = category.value;
    this.product.description = description.value;
    if(this.productId){
      this.commonService.updateProductDetails(this.productId,this.product).pipe(takeUntil(this.destroyed$)).subscribe(
        (product: any)=>{
          if(product.id) {
            alert("Updated Successfully");
            this.productId = 0;
            this.updatedProduct.emit(this.product)
          }
          else {
            alert("Something went wrong");
          }
        },
        (error=>{
          alert("Something went wrong");
        })
      );
    }
    else {
      this.commonService.addProductDetails(this.product).pipe(takeUntil(this.destroyed$)).subscribe(
        (product: any)=>{
          if(product.id) {
            alert("Added Successfully");
            this.productId = 0;
            this.addedProduct.emit(this.product)
          }
          else {
            alert("Something went wrong");
          }
        },
        (error=>{
          alert("Something went wrong");
        })
      );
    }
  }

}
