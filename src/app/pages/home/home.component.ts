import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newArrivalProducts = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getNewArrivalProducts();
  }

  getNewArrivalProducts() {
    this.productService.getNewArrivalProducts().subscribe((res) => {
      this.newArrivalProducts = res['content'];
    });
  }
}
