import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  order$: Observable<Order>;

  ngOnInit(): void {
    this.order$ = this.orderService.show(
      this.route.snapshot.paramMap.get('id')
    );
  }
}
