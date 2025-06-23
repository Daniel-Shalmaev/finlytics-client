import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() tableData: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnTitles: { [key: string]: string } = {};

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  filterDate: string = '';

  // Returns the columns to be displayed in the table
  getColumnKeys(): string[] {
    return this.displayedColumns.length ? this.displayedColumns : Object.keys(this.tableData[0] || {});
  }

  // Formats numeric values to include the shekel sign and two decimal places
  formatValue(value: any): string {
    if (typeof value === 'number') {
      return `${value.toFixed(2)} ₪`;
    }
    return value;
  }

  // Sorts the table data by the specified column
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.tableData.sort((a, b) => {
      if (column === 'date') {
        // Convert date strings into timestamps for accurate sorting
        const dateA = this.convertDate(a[column]);
        const dateB = this.convertDate(b[column]);

        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (typeof a[column] === 'number' && typeof b[column] === 'number') {
        return this.sortDirection === 'asc' ? a[column] - b[column] : b[column] - a[column];
      }

      return 0;
    });
  }

  // Converts a date string from "DD.MM.YYYY" format to a timestamp for sorting
  convertDate(dateString: string): number {
    const parts = dateString.split('.');
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return 0;
  }

  // Filters table data by selected date
  filterByDate(): void {
    if (!this.filterDate) return;

    this.tableData = this.tableData.filter(item =>
      new Date(item.date).toLocaleDateString('he-IL') === new Date(this.filterDate).toLocaleDateString('he-IL')
    );
  }
}
