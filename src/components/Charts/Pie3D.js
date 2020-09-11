
import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);



const Pie3D = ({data}) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "400", // Width of the charts
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages",
        theme: "fusion",
        decimals: 0,
        pieRadius: "45%"
      },
      // Chart Data
      data
    }
  };
  return (<ReactFC {...chartConfigs} />);

};

export default Pie3D;