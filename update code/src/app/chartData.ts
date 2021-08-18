import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export class chartData {
    barChartOptions: ChartOptions;
    barChartLabels: Label[];
    barChartType: ChartType;
    barChartLegend: boolean;
    barChartPlugins: [];
    barChartData: ChartDataSets[];
};
