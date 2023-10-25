import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersLoginData } from '../data/login.Interface';
import { environment } from '../../environments/environment';
import { storeURLs } from 'src/app/constants/endPointUrls';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getUserLoginData(): Observable<UsersLoginData> {
    return this.http.get<UsersLoginData>('./assets/data/login-users.json');
  }

  getAllProducts() {
    return this.http.get<any>(`${environment.apiBaseUrl}${storeURLs.store.products}`);
  }

  getAllCategories() {
    return this.http.get<any>(`${environment.apiBaseUrl}${storeURLs.store.categories}`);
  }

  getAllProductsByCategory(category: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}${storeURLs.store.productByCategory}/${category}`);
  }

  getProductDetails(productId: number){
    return this.http.get(`${environment.apiBaseUrl}${storeURLs.store.products}/${productId}`);
  }

  addProductDetails(product: any) {
    return this.http.post(`${environment.apiBaseUrl}${storeURLs.store.products}`,
      product);
  }
  updateProductDetails(productId: number, product: any){
    return this.http.put(`${environment.apiBaseUrl}${storeURLs.store.products}/${productId}`,
      product);
  }

  deleteProduct(productId: any) {
    return this.http.delete(`${environment.apiBaseUrl}${storeURLs.store.products}/${productId}`);
  }
}
