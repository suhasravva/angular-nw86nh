import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { customers } from './customers';

@Component({
  selector: 'my-app',
  template: `
        <kendo-grid
            [kendoGridBinding]="gridData"
            [pageSize]="2000"
            [pageable]="true"
            [sortable]="true"
            [filterable]="true"
            [groupable]="true"
            [height]="800">
            <ng-template kendoGridToolbarTemplate>
        <button (click)="Stop()" type="button" kendoGridExcelCommand>
          Stop
        </button>        
        <button (click)="continue()" type="button" kendoGridExcelCommand>
          Restart
        </button>
      </ng-template>
            <kendo-grid-column field="CompanyName" [width]="140"></kendo-grid-column>
            <kendo-grid-column field="ContactName" [width]="120"></kendo-grid-column>
            <kendo-grid-column field="City" [width]="100"></kendo-grid-column>
            <kendo-grid-column field="ContactTitle" [width]="130"></kendo-grid-column>
        </kendo-grid>
    `,
})
export class AppComponent {
  public gridData: unknown[] = customers;
  public newsub: Subscription;
  public constructor() {
    this.newsub = this.fetchData().subscribe((ob: any[]) => {
      this.gridData = ob;
    });
    //console.log('weree');
  }
  public Stop(): void {
    this.newsub.unsubscribe();
  }
  public continue(): void {
    this.newsub.unsubscribe();
    this.newsub = this.fetchData().subscribe((ob: any[]) => {
      this.gridData = ob;
    });
  }
  fetchData(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      let customerdata: any[] = customers.slice(0, 3);
      observer.next(customerdata);
      let n: number = 3;
      setInterval(() => {
        n = n + 3;
        customerdata = customers.slice(0, n).reverse();
        observer.next(customerdata);
      }, 6000);
    });
  }
}
