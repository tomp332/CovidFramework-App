import React from 'react'
import Chart from "react-apexcharts"
import withMediaQuery from '../../HighOrderComponents/withMediaQuery'


const DoughnutChart = ({ stats, width }) => {

    const series = (stats && Object.values(stats)) || []
    const labels = (stats && Object.keys(stats)) || []
    const options = {
      chart: {
        type: 'pie',
        width
      }, 
      labels
    }

    return (
        <Chart
          options={options}
          series={series}
          type="pie"
        />
    )
}
const ResponsiveDonutChart = (props) => {
  return withMediaQuery(DoughnutChart, (size, graphProps=props) => {

    const sizes = {
      mobile: 300,
      tablet: 400,
      small: 450,
      large: 450,
      extraLarge: 500
    }

    return {
      ...graphProps,
      width: sizes[size],
  }
  })
}

export default ResponsiveDonutChart