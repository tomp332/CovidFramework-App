import React from 'react'
import Chart from "react-apexcharts"
import styled from '@emotion/styled'


const DoughnutChart = ({stats, width}) => {
    const series = (stats && Object.values(stats)) || []
    const labels = (stats && Object.keys(stats)) || []
    const options = {
        chart: {
            type: 'pie',
            width
        },
        labels,
        dataLabels: {
            colors: ['white', 'white', 'white']
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }, {
            breakpoint: 768,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'right'
                }
            }
        }, {
            breakpoint: 1024,
            options: {
                chart: {
                    width: 400
                },
                legend: {
                    position: 'right'
                }
            }
        }, {
            breakpoint: 1200,
            options: {
                chart: {
                    width: 500
                },
                legend: {
                    position: 'right'
                }
            }
        }, {
            breakpoint: 4096,
            options: {
                chart: {
                    width: 600
                },
                legend: {
                    position: 'right'
                }
            }
        }]
    }

    return (
        <ChartWrapper>
            <Chart
                options={options}
                series={series}
                type="pie"
            />
        </ChartWrapper>
    )
}


const ChartWrapper = styled.div`
  background-color: #151313;
  border-radius: 5px;
  border: 1px solid #aaa;
  margin: 1em;
`
export default DoughnutChart