import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { ProductInfo } from 'src/app/models/product-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  product = new ProductInfo();
  productId: string;
  isEdit: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEdit = true;
      this.productService
        .getDetail(this.productId)
        .subscribe((prod) => (this.product = prod));
    }
  }
  update() {
    this.productService.update(this.product).subscribe(
      (prod) => {
        if (!prod) throw new Error();
        this.router.navigate(['/seller']);
      },
      (err) => {}
    );
  }

  onSubmit() {
    if (this.productId) {
      this.update();
    } else {
      this.add();
    }
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

  ngAfterContentChecked(): void {
    console.log(this.product);
  }
}
