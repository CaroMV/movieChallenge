import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [MatPaginatorModule],
    }).compileComponents();
  
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new page event when onPageChanged is called', () => {
    // Arrange
    spyOn(component.newPageEvent, 'emit');

    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 100,
    };

    // Act
    component.onPageChanged(pageEvent);

    // Assert
    expect(component.pageIndex).toEqual(2);
    expect(component.pageSize).toEqual(20);
    expect(component.newPageEvent.emit).toHaveBeenCalledWith(3); // pageIndex + 1
  });

  it('should have default values for pageSize and pageIndex', () => {
    // Assert
    expect(component.pageSize).toEqual(20);
    expect(component.pageIndex).toEqual(0);
  });

  it('should update pageIndex and pageSize when input values change', () => {
    // Arrange
    const newNumOfPages = 50;

    // Act
    component.numOfPages = newNumOfPages;
    fixture.detectChanges();

    // Assert
    expect(component.pageSize).toEqual(20); // unchanged
    expect(component.pageIndex).toEqual(0); // unchanged
  });
});
