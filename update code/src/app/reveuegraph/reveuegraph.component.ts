import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/services/api.service';
declare var $: any;

@Component({
  selector: 'app-reveuegraph',
  templateUrl: './reveuegraph.component.html',
  styleUrls: ['./reveuegraph.component.scss']
})
export class ReveuegraphComponent implements OnInit {


  page = 1;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterBy: string = '';
  search: string = '';
  salesList = []
  status: number
  flagSearch: boolean = true;
  vendorFilter = 'weekly'
  flagData: any;
  flag: any
  flagUserList: boolean = false;

  srNo: number;
  public barChartOptionsVendor: ChartOptions = {
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
  public barChartLabelVendor: Label[];
  public barChartLabelrevenue: Label[];
  public barChartTypeVendor: ChartType = 'bar';
  public barChartLegendVendor = true;
  public barChartPluginsVendor = [pluginDataLabels];

  public barChartDataVendor: ChartDataSets[]
  public barChartDataRevenue: ChartDataSets[]
  dataSource: any;
  public barChartOptionsSale: ChartOptions = {
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
  public barChartLabelSale: Label[]
  public barChartTypeSale: ChartType = 'bar';
  public barChartLegendSale = true;
  public barChartPluginsSale = [pluginDataLabels];
  public barChartDataSale: ChartDataSets[]


  public barChartLabelRevenue: Label[]
  public barChartTypeRevenue: ChartType = 'bar';
  public barChartLegendRevenue = true;
  public barChartPluginsRevenue = [pluginDataLabels];
  public barChartOptionsRevenue: ChartOptions = {
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

  data: { barChartOptions: ChartOptions; barChartLabels: Label[]; barChartType: ChartType; barChartLegend: boolean; barChartPlugins: (typeof pluginDataLabels)[]; barChartData: ChartDataSets[]; };
  chartReady: boolean;
  type: string;
  width: string;
  height: string;
  periodSale = 'weekly';
  dashboardData: any;
  salesListData: any;
  revenueFilter: string = 'weekly';
  user: string;
  roles: string;
  constructor(private apiService: ApiService) {
    this.user = JSON.parse(this.apiService.getUser())
    console.log(this.user);

  }

  ngOnInit() {

    this.roles = this.user['roles'];
    this.getDashboardData(this.page, this.pageSize, this.search, this.filterBy, this.periodSale, this.revenueFilter)


  }

  getDashboardData(page, pageSize, search, filterBy, typeSale, revenueFilter) {



    if (this.roles == 'admin') {
      this.apiService.getDashboardData(page, pageSize, search, filterBy, typeSale, revenueFilter).subscribe(res => {
        console.log("dashboardData", res);

        if (res.success) {

          this.dashboardData = res.data;
          this.salesListData = this.dashboardData.salesTable;
          this.length = this.salesListData.length
          console.log("Dashboard Data:", this.dashboardData);

          // this.salesData(this.dashboardData.salesGraph);
          //this.vendorData(this.dashboardData.vendorGraph);
          this.revenueData(this.dashboardData.revenueGraph)
        }
      })
    } else {

      this.apiService.getVednorDashboardData(page, pageSize, search, filterBy, typeSale, revenueFilter).subscribe(res => {
        console.log("dashboardData", res);

        if (res.success) {
          
          this.dashboardData = res.data;
          this.salesListData = this.dashboardData.salesTable;
          this.length = this.salesListData.length
          console.log("Dashboard Data:", this.dashboardData);

          // this.salesData(this.dashboardData.salesGraph);
          //this.vendorData(this.dashboardData.vendorGraph);
          this.revenueData(this.dashboardData.revenueGraph)
        }
      })

    }
  }

  revenueData(revenueGraphData) {

    let array = []
    console.log(revenueGraphData);
    let data = revenueGraphData.length
    for (let i = 0; i < data; i++) {
      if (this.revenueFilter == 'monthly') {

        array.push('Week' + ' ' + [i + 1]);

      }
      if (this.revenueFilter == 'weekly') {

        array.push('Day' + ' ' + [i + 1]);

      }
      if (this.revenueFilter == 'yearly') {

        array.push('Month' + ' ' + [i + 1]);

      }

    }
    this.barChartLabelrevenue = array;

    // public barChartData: ChartDataSets[] = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    //   ];
    this.barChartDataRevenue = [{ data: revenueGraphData, label: this.periodSale + " " + 'Revenue', backgroundColor: 'rgba(54,185,204,1)', borderColor: 'rgba(54,185,204,1)', hoverBackgroundColor: 'rgba(54,185,204,1)', hoverBorderColor: 'rgba(54,185,204,1)' }]


    // this.barChartData = this.barChartData;
    console.log("labels: ", this.barChartLabelVendor);
    console.log("data: ", this.barChartDataVendor);
    console.log("options: ", this.barChartOptionsVendor);

    this.chartReady = true

  }

  revenuePeriodChanged(e) {
    this.revenueFilter = e.target.value;
    this.getDashboardData(this.page, this.pageSize, this.search, this.filterBy, this.periodSale, this.revenueFilter)


  }



  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
