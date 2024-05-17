import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalCount = 100 as number
  @Input() itemsPerpage  = 10 as number
  @Input() pageIndex = 1 as number;
  @Output() lastPageClick = new EventEmitter<any>()
  @Output() firstPageClick = new EventEmitter<any>()
  @Output() pageClick = new EventEmitter<any>()
  
  
  
  // getNumberCount(): number[]{
  //    const pagination = [] as number[]
  //     const pages = Math.ceil(this.totalCount / this.itemsPerpage)
  //     for(let i = 1 as number; i<=pages; i++){
  //       pagination.push(i)
  //     }
  //       return pagination
  //   }

  getNumberCount(): number[] {
    const pagination = [] as number[];
    const pages = Math.ceil(this.totalCount / this.itemsPerpage);
    const maxPagesToShow = 10; // Maximum number of pages to show before adding ellipsis
  
    // Add first 5 pages
    for (let i = 1 as number; i <= Math.min(pages, maxPagesToShow); i++) {
      pagination.push(i);
    }
  
    // Add ellipsis if there are more pages
    if (pages > maxPagesToShow) {
      pagination.push(-1); // Add ellipsis
    }
  
    // Add last 5 pages if there are more than 10 pages
    if (pages > maxPagesToShow) {
      for (let i = pages - 4; i <= pages; i++) {
        pagination.push(i);
      }
    }
  
    return pagination;
  }

    get visiblePages(): any[] {
      const range = 2; // Number of pages to display before and after the current page
      const pages: any[] = [];
      for (let i = 1; i <= Math.ceil(this.totalCount / this.itemsPerpage); i++) {
        if (i === this.pageIndex || i === 1 || i === this.totalCount ||
            (i >= this.pageIndex - range && i <= this.pageIndex + range)) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }
      return pages;
    }
  
  
    previous(){
      console.log(this.pageIndex)
      // if(this.pageIndex < 1){
      //   return
      // }
      this.pageIndex = this.pageIndex - 1;
      console.log(this.pageIndex)
      const data = this.pageIndex -1
      const paginationObject = {
        pageNumber: data,
        totalCount : this.totalCount,
        pageSize : this.itemsPerpage
      }
      this.pageClick.emit(paginationObject)
    }
  
    next(){
      
      this.pageClick.emit()
    }

    

  
    paginationClick(data: number){
     
      this.pageClick.emit(data)
    }

  getLastPage(){
    const lastItem = this.getNumberCount()[this.getNumberCount().length - 1]
    this.lastPageClick.emit(lastItem)
  }

  getFirstPage(){
    const firstItem = this.getNumberCount()[0]
    this.firstPageClick.emit(firstItem)
  }
  
}

