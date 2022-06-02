import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgpqPaginationComponent } from './ngpq-pagination.component';

describe('NgpqPaginationComponent', () => {
  let component: NgpqPaginationComponent;
  let fixture: ComponentFixture<NgpqPaginationComponent>;
  let pageChange: EventEmitter<number>;
  let totalElements = 50;
  let pageSize = 5;
  let maxSize = 6;
  let directionLinks = false;
  let pages: number[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgpqPaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgpqPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pages = [];
    component.totalElements = totalElements;
    component.pageSize = pageSize;
    component.maxSize = maxSize;
    component.directionLinks = directionLinks;
    pageChange = component.pageChange;
    spyOn(component.pageChange, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have totalPages', () => {
    component.ngOnChanges();
    expect(component.totalPages).toBe(10);
  });

  it('pages should to be correct with maxSize and pageSize', () => {
    component.ngOnChanges();

    expect(component.pages).toEqual([1, 2, 3, 4, 5, 6]);
    const event = new MouseEvent('click');

    component.setCurrent(event, 5);
    expect(component.pages).toEqual([2, 3, 4, 5, 6, 7]);
    expect(component.pageChange.emit).toHaveBeenCalledWith(5);

    fixture.detectChanges();
    checkActive(5);

    component.setCurrent(event, 7);
    expect(component.pages).toEqual([4, 5, 6, 7, 8, 9]);
    expect(component.pageChange.emit).toHaveBeenCalledWith(7);
  });

  it('should go to next', () => {
    component.ngOnChanges();
    component.next();
    expect(component.pageNumber).toBe(2);

    component.pageNumber = component.totalElements / component.pageSize;
    component.next();
    expect(component.pageNumber).toBe(10);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);

    fixture.detectChanges();
    expect(getActiveEl()).toBeUndefined();
  });

  it('should go to previous', () => {
    component.ngOnChanges();
    component.prev();
    expect(component.pageNumber).toBe(1);

    component.pageNumber = 3;
    component.prev();
    expect(component.pageNumber).toBe(2);

    fixture.detectChanges();
    checkActive(2);
  });

  it(`direction Links should be available when it is 'true'`, () => {
    component.directionLinks = true;
    component.ngOnChanges();
    fixture.detectChanges();
    const item = document.getElementsByClassName('page-item arrow');
    expect(item.length).toBe(4);
  });

});

function checkActive(page: number) {
  const activeEl = getActiveEl();
  expect(+activeEl.innerText).toBe(page);
}

function getActiveEl(): HTMLLIElement {
  return (document.getElementsByClassName('active')[0] as HTMLLIElement);
}