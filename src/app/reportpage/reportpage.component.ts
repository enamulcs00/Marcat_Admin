import { Component, OnInit } from '@angular/core';
import * as FusionCharts from "fusioncharts";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
declare var $: any;

@Component({
  selector: 'app-reportpage',
  templateUrl: './reportpage.component.html',
  styleUrls: ['./reportpage.component.scss']
})
export class ReportpageComponent implements OnInit {
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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  // dataSource: any;
  // type: string;
  // width: string;
  // height: string;
  constructor() {
    // this.type = "timeseries";
    // this.width = "100%";
    // this.height = "400";


  }

  ngOnInit() {
    // // This is the dataSource of the chart
    // this.dataSource = {
    //   chart: {},
    //   caption: {
    //     text: "Sales Analysis"
    //   },
    //   subcaption: {
    //     text: "Grocery & Footwear"
    //   },
    //   series: "Type",
    //   yaxis: [
    //     {
    //       plot: "Sales Value",
    //       title: "Sale Value",
    //       format: {
    //         prefix: "$"
    //       }
    //     }
    //   ]
    // };

    // this.fetchData();
  }
  // fetchData() {
  //   var jsonify = res => res.json();
  //   var dataFetch = fetch(
  //     "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json"
  //   ).then(jsonify);
  //   var schemaFetch = fetch(
  //     "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
  //   ).then(jsonify);

  //   Promise.all([dataFetch, schemaFetch]).then(res => {
  //     const [data, schema] = res;
  //     // First we are creating a DataStore
  //     const fusionDataStore = new FusionCharts.DataStore();
  //     // After that we are creating a DataTable by passing our data and schema as arguments
  //     const fusionTable = fusionDataStore.createDataTable(data, schema);
  //     // Afet that we simply mutated our timeseries datasource by attaching the above
  //     // DataTable into its data property.
  //     this.dataSource.data = fusionTable;
  //   });
  // }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
 

}
