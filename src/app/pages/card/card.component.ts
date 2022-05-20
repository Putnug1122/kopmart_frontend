import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  title: string;
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.route.params.subscribe(() => {
      this.update();
    });
  }
  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
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
  getProds(page: number = 1, size: number = 4) {
    if (this.route.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page, +size).subscribe((page) => {
        this.page = page;
        this.title = 'Get Whatever You Want!';
      });
    } else {
      //  /category/:id
      const type = this.route.snapshot.url[1].path;
      this.productService
        .getCategoryInPage(+type, page, size)
        .subscribe((categoryPage) => {
          this.title = categoryPage.category;
          this.page = categoryPage.page;
        });
    }
  }
}
