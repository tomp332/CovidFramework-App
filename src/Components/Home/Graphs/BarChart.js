import React from 'react'
import Chart from "react-apexcharts"
import styled from '@emotion/styled'


const BarChart = ({ stats, width }) => {

    const series = (stats && Object.values(stats)) || []
    const labels = (stats && Object.keys(stats)) || []
    const options = {
        series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }},
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
  background-color: white;
  border-radius: 5px;
  border: 1px solid #aaa;
  margin: 1em;
`
export default BarChart