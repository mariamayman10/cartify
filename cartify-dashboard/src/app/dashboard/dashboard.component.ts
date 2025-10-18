import { Component } from '@angular/core';
import { ChartBarComponent } from '../chart-bar/chart-bar.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('revenue', {
      type: 'bar',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Profit',
            data: [5000, 10000, 7500, 15000, 12000, 6000],
            backgroundColor: '#f5b214',
            borderRadius: 5,
            barThickness: 'flex',
          },
          {
            label: 'Loss',
            data: [4000, 9000, 6000, 12000, 10000, 5000],
            backgroundColor: '#ffca4e',
            borderRadius: 5,
            barThickness: 'flex',
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5000,
            },
          },
        },
      },
    });
  }
}
