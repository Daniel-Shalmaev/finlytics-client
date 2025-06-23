import { take } from 'rxjs/operators';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule , DataTableComponent ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Output() dateRangeChanged = new EventEmitter<string>(); 

  fromDate: string = '2021-06-01'; // Default start date
  toDate: string = '2021-12-31'; // Default end date
  chartType: ChartType = 'line' as ChartType; // Default chart type  
  showCount: number = 10; // Default number of data points to display
  tableData: any[] = []; 

  chartData: ChartData<ChartType> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration<ChartType>['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: '📅 תאריך' } }, 
      y: { title: { display: true, text: '💲 סכום' } } 
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData(); 
  }

  loadData(): void {
    // Notify parent component about the selected date range
    this.dateRangeChanged.emit(`${new Date(this.toDate).toLocaleDateString('he-IL')} - ${new Date(this.fromDate).toLocaleDateString('he-IL')}`);

    this.apiService.loadFinanceData(this.fromDate, this.toDate).pipe(
      take(1) // Unsubscribes automatically after first value is emitted
    ).subscribe((data: any[]) => {
      // Sort data by date in ascending order
      data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      data = data.slice(0, this.showCount);

      const labels: string[] = [];
      const income: number[] = [];
      const outcome: number[] = [];
      const profit: number[] = [];

      this.tableData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString('he-IL'),
        income: Number(item.income),
        outcome: Number(item.outcome),
        profit: Number(item.income) - Number(item.outcome)
      }));

      data.forEach((item: any) => {
        labels.push(new Date(item.date).toLocaleDateString('he-IL'));
        income.push(Number(item.income));
        outcome.push(Number(item.outcome));
        profit.push(Number(item.income) - Number(item.outcome));
      });

      // 'fill' is only applicable for specific chart types
      const shouldFill = this.chartType === 'line' || this.chartType === 'radar';

      this.chartData = {
        labels,
        datasets: [
          { label: '💰 הכנסות', data: income, borderColor: 'rgba(255, 99, 132, 0.4)', backgroundColor: 'rgba(255, 99, 132, 0.2)', ...(shouldFill && { fill: true }) },
          { label: '💸 הוצאות', data: outcome, borderColor: 'rgba(54, 162, 235, 0.4)', backgroundColor: 'rgba(54, 162, 235, 0.2)', ...(shouldFill && { fill: true }) },
          { label: '📈 רווח נקי', data: profit, borderColor: 'rgba(75, 192, 192, 0.4)', backgroundColor: 'rgba(75, 192, 192, 0.2)', ...(shouldFill && { fill: true }) }
        ]
      };
    });
  }
}
