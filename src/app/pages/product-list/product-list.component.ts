import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductStatus } from 'src/app/enum/product-status';
import { Subscription } from 'rxjs';
import { JwtResponse } from 'src/app/response/jwt-response';
import { Role } from 'src/app/enum/role';
import { CategoryType } from 'src/app/enum/category-type';
import { ProductInfo } from 'src/app/models/product-info';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Role = Role;
  currentUser: JwtResponse;
  page: any;
  CategoryType = CategoryType;
  ProductStatus = ProductStatus;
  private querySub: Subscription;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }

  getProds(page: number = 1, size: number = 5) {
    this.productService.getAllInPage(+page, +size).subscribe((page) => {
      this.page = page;
    });
  }

  remove(productInfos: ProductInfo[], productInfo) {
    this.productService.delete(productInfo).subscribe(
      (_) => {
        productInfos = productInfos.filter((e) => e.productId != productInfo);
      },
      (err) => {}
    );
  }
}
