import React from 'react'
import Chart from "react-apexcharts";

const ApexChart = ({stats}) => {

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

export default ApexChart