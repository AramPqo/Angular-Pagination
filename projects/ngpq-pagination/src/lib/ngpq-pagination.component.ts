import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'ngpq-pagination',
  template: `
    <ul class="pagination">
      <li *ngIf="directionLinks" class="page-item arrow" [class.disabled]="pageNumber === pages[0]">
        <a class="page-link" (click)="first()">««</a>
      </li>
      <li class="page-item arrow" [class.disabled]="pageNumber === pages[0]">
        <a class="page-link" (click)="prev()">«</a>
      </li>
      <li *ngFor="let page of pages;" class="page-item" [class.active]="page === pageNumber">
        <a class="page-link" (click)="setCurrent($event, page)">{{page}}</a>
      </li>
      <li class="page-item arrow" [class.disabled]="pageNumber === pages[pages.length -1]">
        <a class="page-link" (click)="next()">»</a>
      </li>
      <li *ngIf="directionLinks" class="page-item arrow" [class.disabled]="pageNumber === pages[pages.length -1]">
        <a class="page-link" (click)="last()">»»</a>
      </li>
    </ul>
  `,
  styleUrls: ['./ngpq-pagination.component.css']
})
export class NgpqPaginationComponent implements OnChanges {

  @Input() totalElements: number;
  @Input('page') pageNumber = 1;
  @Input() maxSize: number;
  @Input() pageSize: number;
  @Input() directionLinks = false;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  totalPages: number;
  pages: number[] = [];

  constructor() { }

  ngOnChanges() {
    if (this.pageSize || this.totalElements) {
      this.createPaginator();
    }
  }

  createPaginator() {
    this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    this.pages = this.paginate(+this.totalPages, + this.pageNumber, +this.maxSize);
  }

  paginate(totalPages: number, pageNumber: number = 1, maxPages: any): any {
    let startPage: number, endPage: number;

    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforepageNumber = Math.floor(maxPages / 2);
      const maxPagesAfterpageNumber = Math.ceil(maxPages / 2) - 1;
      if (pageNumber <= maxPagesBeforepageNumber) {
        startPage = 1;
        endPage = maxPages;
      } else if (pageNumber + maxPagesAfterpageNumber >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = pageNumber - maxPagesBeforepageNumber;
        endPage = pageNumber + maxPagesAfterpageNumber;
      }
    }

    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    return pages;
  };

  first() {
    if (this.pageNumber > 1) {
      this.emit(1);
    } else {
      console.warn(`It is forbidden!`);
    }
  }

  last() {
    if (this.pageNumber < this.totalPages) {
      this.emit(this.totalPages);
    } else {
      console.warn(`It is forbidden!`);
    }
  }

  prev() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.emit();
    } else {
      console.warn(`It is forbidden!`);
    }
  }

  next() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.emit();
    } else {
      console.warn(`It is forbidden!`);
    }
  }

  setCurrent(event: MouseEvent, page: number) {
    event.preventDefault();
    if (page !== this.pageNumber) {
      this.emit(page);
    }
  }

  emit(pageNumber?: number) {
    if (pageNumber) {
      this.pageNumber = pageNumber;
    }

    this.createPaginator();
    this.pageChange.emit(this.pageNumber);
  }
}
