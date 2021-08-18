import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { chartData } from '../chartData';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input('chartData') chartData
  constructor() {
    //  console.log(this.chartData)
  }

  public barChartOptions: ChartOptions
  public barChartLabels: Label[]
  public barChartType: ChartType
  public barChartLegend
  public barChartPlugins

  public barChartData: ChartDataSets[]



  ngOnInit() {
    console.log(this.chartData)
    this.barChartOptions = this.chartData.barChartOptions;
    this.barChartLabels = this.chartData.barChartLabels;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = this.chartData.barChartPlugins;

    this.barChartData = this.chartData.barChartData;
  }

  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }

}
