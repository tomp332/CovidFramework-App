import React from 'react'
import Chart from "react-apexcharts"


const DoughnutChart = ({ stats }) => {

    const series = (stats && Object.values(stats)) || []
    const labels = (stats && Object.keys(stats)) || []

    const options = {
      chart: {
        type: 'pie',
      }, 
      labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 500
          },
          legend: {
            position: 'bottom'
          }
        }
      }, {
        breakpoint: 768,
        options: {
          chart: {
            width: 600
          },
          legend: {
            position: 'bottom'
          }
        }
      }, {
        breakpoint: 1024,
        options: {
          chart: {
            width: 700
          },
          legend: {
            position: 'right'
          }
        }
      }]
    }

    return (
        <Chart
          options={options}
          series={series}
          type="pie"
        />
    )
}

export default DoughnutChart