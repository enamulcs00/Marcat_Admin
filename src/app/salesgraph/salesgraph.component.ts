import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { chartData } from '../chartData';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-salesgraph',
  templateUrl: './salesgraph.component.html',
  styleUrls: ['./salesgraph.component.scss']
})
export class SalesgraphComponent implements OnInit {

  period = 'monthly'

  history = window.history

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[]
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[]

  data: { barChartOptions: ChartOptions; barChartLabels: Label[]; barChartType: ChartType; barChartLegend: boolean; barChartPlugins: (typeof pluginDataLabels)[]; barChartData: ChartDataSets[]; };
  chartReady: boolean;
  sub: any;
  id: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    //alert(this.id)

  }

  getData() {

    let array = [];
    let body = {
      'type': this.period,

    }
    this.apiService.getSalesGraph(body).subscribe(res => {
      console.log(res);
      let data = res.data.length
      for (let i = 0; i < data; i++) {
        if (this.period == 'monthly') {

          array.push('Week' + ' ' + [i + 1]);

        }
        if (this.period == 'weekly') {

          array.push('Day' + ' ' + [i + 1]);

        }
        if (this.period == 'yearly') {

          array.push('Month' + ' ' + [i + 1]);

        }

      }
      this.barChartLabels = array;

      // public barChartData: ChartDataSets[] = [
      //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      //     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      //   ];
      this.barChartData = [{ data: res.data, label: this.period + " " + 'Sale', backgroundColor: 'rgba(78,115,223,1)', borderColor: 'rgba(78,115,223,1)', hoverBackgroundColor: 'rgba(78,115,223,1)', hoverBorderColor: 'rgba(78,115,223,1)' }]

      this.barChartOptions = this.barChartOptions;
      // this.barChartLabels = this.barChartLabels;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartPlugins = this.barChartPlugins;
      // this.barChartData = this.barChartData;
      console.log("labels: ", this.barChartLabels);
      console.log("data: ", this.barChartData);
      console.log("options: ", this.barChartOptions);

      this.chartReady = true


    });

  }

  periodSelected(e) {
    this.period = e.target.value;
    this.getData()


  }

  goTosales() {
    this.router.navigate(['salesreport'])

  }


  ngOnInit() {

    this.getData();

  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
