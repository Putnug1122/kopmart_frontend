import { ProductInfo } from 'src/app/models/product-info';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  products: ProductInfo[];
  searchMode: boolean = false;
  title: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleSearch();
    });
  }

  handleSearch() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.searchMode = true;
      this.productService.searchProducts(keyword).subscribe((products) => {
        this.products = products['content'];
        this.title = 'Search Results for: ' + keyword;
      });
    } else {
      this.searchMode = false;
      this.title = 'Get Whatever You Want!';
    }
  }
}
