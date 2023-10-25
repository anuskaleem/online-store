import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit{
  categories: any = null;
  destroyed$ = new Subject();
  productsList: any = null;
  @Output() logout = new EventEmitter();
  constructor(
    public commonService: CommonService){}
  ngOnInit(): void {
    this.commonService.getAllCategories().pipe(takeUntil(this.destroyed$)).subscribe(
      (categories: any)=>{
        this.categories = categories;
      });
  }

  filterItems(category: any) {
    this.commonService.getAllProductsByCategory(category).pipe(takeUntil(this.destroyed$)).subscribe(
      (products: any)=>{
        this.productsList = products;
      });    
  }

  logoutUser() {
    this.logout.emit();
  }
}
