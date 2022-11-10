# Paginator for Angular
`ngpq-pagination`

## Installation
```
npm install ngpq-pagination
```

## Example
#### Template
```html
<ngpq-pagination 
  [pageSize]="8" 
  [maxSize]="6"
  [(page)]="pageNumber" 
  [totalElements]="data.length"
  [arrows]="arrows"
  [directionLinks]="true"
  (pageChange)="pageChange($event)">
</ngpq-pagination>

```
#### Component
```typescript
export class AppComponent {
    pageNumber = 1;
    arrows = new PaginationArrow('prev', 'next', 'first', 'last');
}
```

#### Module
```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component.ts';
import { NgPqPaginationModule } from 'ngpq-pagination';

export class AppModule {
    declarations: [
    AppComponent
   ],
   imports: [
    NgPqPaginationModule
   ]
}
```
![alt text](https://www.linkpicture.com/q/pagination.png) 

## Inputs

```typescript
[(page)]: number;
[pageSize]: number; 
[maxSize]: number;
[totalElements]: number;
[directionLinks]: boolen;
```

## Ouputs

```typescript
(pageChange): EventEmitter<number>;
```
