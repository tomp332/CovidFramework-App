import React from 'react'
import Chart from "react-apexcharts"
import styled from '@emotion/styled'


const BarChart = ({ stats, width }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const series = (stats && Object.values(stats)) || []
    const labels = (stats && Object.keys(stats)) || []
    const options = {
        chart: {
            id:'basic-bar',
            type: 'bar',
            width
        },
        xaxis:{
          categories:monthNames,
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
                type="bar"
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
export default BarChart