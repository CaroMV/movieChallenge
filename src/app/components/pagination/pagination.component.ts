import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})

export class PaginationComponent implements OnInit, OnDestroy {
  @Input() numOfPages!: number;
  @Output() newPageEvent = new EventEmitter<number>();

  pageSize = 20;
  pageIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
 // emitir eventos con el n° de página 
  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.newPageEvent.emit(this.pageIndex + 1);
  }
}
