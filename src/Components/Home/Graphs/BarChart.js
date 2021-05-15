import {Bar} from 'react-chartjs-2'

const React = require('react');
import ('./DoughnutChart.css')

const BarGraph = (stats) => {
    return (
        <div className={"bar-graph"}>
            <Bar height={600} width={600} data={{
                labels: ['Low privileges', 'High privileges', 'Disconnected', 'Connected'],
                datasets: [{
                    data: [stats.stats.lowPrivs, stats.stats.highPrivs, stats.stats.offlineClients, stats.stats.onlineClients],
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
export default BarGraph;