import {
  Component,
  OnInit,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() numOfPages!: number;
  @Output() newPageEvent = new EventEmitter<number>();

  maxButtons = 12;
  selection = 1;
  pages: number[] = [];
  totalPages: number[][] = [];
  indixes = 0;
  msg = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.resetPagination();
  }

  ngOnDestroy(): void {
    // Limpieza si es necesario
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetPagination();
  }

  onPageClicked(index: number): void {
    this.updatePagination(index);
  }

  onPreviousClicked(): void {
    if (this.selection > 1) {
      this.updatePagination(this.selection - 1);
    }
  }

  onNextClicked(): void {
    if (this.selection < this.numOfPages) {
      this.updatePagination(this.selection + 1);
    }
  }

  showToast() {
    const toastElement = this.el.nativeElement.querySelector('.toast');
    this.renderer.addClass(toastElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(toastElement, 'show');
    }, 3000);
  }

   resetPagination(): void {
    this.selection = 1;
    this.indixes = 0;
    this.pages = [];
    this.totalPages = [];
    this.createPagesButton(this.createArrayOfTotalNums());
    this.pages = this.totalPages[this.indixes];
  }

  updatePagination(index: number): void {
    if (index >= 1 && index <= this.numOfPages) {
      if (this.selection !== index) {
        this.selection = index;
        this.newPageEvent.emit(this.selection);
      } else {
        this.msg = `This is already the page ${index}`;
        this.showToast();
      }
    } else {
      this.msg = `Invalid page number`;
      this.showToast();
    }
  }

  createArrayOfTotalNums(): number[] {
    return Array.from({ length: this.numOfPages }, (_, i) => i + 1);
  }

  createPagesButton(totalButtons: number[]): void {
    while (totalButtons.length > 0) {
      const pack = totalButtons.splice(0, this.maxButtons);
      this.totalPages.push(pack);
    }
    if (this.totalPages.length > 1 && this.totalPages[0].length === 0) {
      this.totalPages.shift();
    }
  }
}
