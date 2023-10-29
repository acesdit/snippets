function createBarChart() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var chartBuilder = sheet.newChart();
  var range= "";
  var chart = chartBuilder
    .addRange(sheet.getRange(range)) 
    .setChartType(Charts.ChartType.HISTOGRAM)
    .setPosition(2, 2, 0, 0)            // Position of the chart in the sheet
    .setOption('title','SGPA Bar Chart')         // Chart title
             // Y-axis title
    .build();

  sheet.insertChart(chart);
}
