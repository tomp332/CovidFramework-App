import {Doughnut} from 'react-chartjs-2'
import withMediaQuery from '../../HighOrderComponents/withMediaQuery'

const React = require('react');
import ('./DoughnutChart.css')

const ResponsiveDoughnutChart = (props) => {
    
    return withMediaQuery(DoughnutChart, (size, chartProps=props) => {
        const sizes = {
            mobile: { width: 100, height: 100},
            tablet: { width: 200, height: 200},
            small: { width: 300, height: 300},
            large: { width: 400, height: 400},
            extraLarge: { width: 500, height: 500}
        }
        return {
            ...sizes[size],
            ...chartProps
        }
    })
}

const DoughnutChart = ({ stats, height, width }) => {
    const { lowPrivs, highPrivs, offlineClients, onlineClients } = stats
    return (
        <div className={"doughnut-graph"}>
            <Doughnut options={{ maintainAspectRatio: false }} height={height} width={width} data={{
                labels: ['Low privileges', 'High privileges', 'Disconnected', 'Connected'],
                datasets: [{
                    data: [lowPrivs, highPrivs, offlineClients, onlineClients],
                    backgroundColor: [
                        '#FFA07A',
                        'rgba(54, 162, 235, 1)',
                        'red',
                        'green'
                    ],
                    borderColor: [
                        '#FFA07A',
                        'rgba(54, 162, 235, 1)',
                        'red',
                        'green'
                    ],
                    borderWidth: 1
                }]
            }}
                      options={{
                          scales: {},
                          animation: false,
                          plugins: {
                              title: {
                                  display: true,
                                  text: 'Client statistics',
                                  align: "center",
                                  font: {
                                      weight: 'bold',
                                      size: 30,
                                      fontColor: 'white'
                                  },
                              },
                              legend: {
                                  labels: {
                                      color: "white"
                                  }
                              }
                          }
                      }} type={'Doughnut'}/>
        </div>
    )
}
export default ResponsiveDoughnutChart;