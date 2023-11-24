import { months } from "./Util";

// const labels = months({count: 7});

export const lineChartData = {
  labels: months({ count: 12, section: undefined }),
  datasets: [
    {
      label: "Transactions",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1
    }
  ]
}

export const doughnutChartData = {
  labels: ['Metric', 'Metric', 'Metric'],
  datasets: [
    {
      label: 'Transaction Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        "#576574",
        "#10ac84",
        "#01a3a4"
      ],
      hoverOffset: 4
    }
  ]
}