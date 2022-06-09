import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/product-info';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product = new ProductInfo();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.add();
  }

  add() {
    this.productService.create(this.product).subscribe(
      (prod) => {
        if (!prod) throw new Error();
        this.router.navigate(['/']);
      },
      (e) => {}
    );
  }
}
