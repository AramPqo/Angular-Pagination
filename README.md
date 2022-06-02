# Paginator for Angular
`ngpq-pagination`

## Example
#### Template
```html
<ngpq-pagination 
  [pageSize]="8" 
  [maxSize]="6"
  [(page)]="pageNumber" 
  [totalElements]="data.length"
  [directionLinks]="true"
  (pageChange)="pageChange($event)">
</ngpq-pagination>

```
#### Component
```typescript
export class AppComponent {
    pageNumber = 1;
}
```

#### Module
```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component.ts';
import { NgpqPaginationComponent } from 'ngpq-pagination';

export class AppModule {
    declarations: [
    AppComponent
  ],
    imports: [
    NgPqPaginationModule
    ]
}
```

## Installation
```
npm install ngpq-pagination
```

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
