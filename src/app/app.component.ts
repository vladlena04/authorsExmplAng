import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <app-data-table></app-data-table>
  `,
})

export class AppComponent {}