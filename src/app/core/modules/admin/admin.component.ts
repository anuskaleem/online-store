import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  productId: number = 0;
  product: any;
  addNew: boolean = false;
  newProduct: any;
  @Output() logout = new EventEmitter();
  fetchProductDetails(productId: number){
    this.productId = productId;
  }
  updatedProduct(product: any) {
    this.productId = 0;
    this.product = product;
  }

  addedProduct(product: any) {
    this.productId = 0;
    this.newProduct = product;
    this.addNew = false;
  }

  addNewProduct() {
    this.addNew = true;
  }
  logoutUser() {
    this.logout.emit();
  }
}
