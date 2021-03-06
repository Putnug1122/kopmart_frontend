import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: any;
  constructor() {}

  ngOnInit(): void {}

  counter(i = 1) {
    return Array(i);
  }
}
