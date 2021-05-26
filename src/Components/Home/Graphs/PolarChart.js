import {PolarArea} from 'react-chartjs-2'

const React = require('react');
import ('./PolarChart.css')

const PolarChart = (stats) => {
    return (
        <>
            <div className={"polar-graph"}>
                <PolarArea height={600} width={600} data={{
                    labels: ['Low privileges', 'High privileges', 'Disconnected', 'Connected'],
                    datasets: [{
                        data: [ stats.stats.lowPrivs, stats.stats.highPrivs, stats.stats.offlineClients, stats.stats.onlineClients],
                        backgroundColor: [
                            '#36a2eb',
                            '#ffcd56',
                            'red',
                            '#98d14a',
                        ],
                    }]
                }}
                           options={{
                               scales: {},
                               animation: false,
                               plugins: {
                                   title: {
                                       display: true,
                                       text: 'Summary',
                                       align: "center",
                                       font: {
                                           weight: 'bold',
                                           size: 30,
                                           fontColor: 'black'
                                       },
                                   },
                                   legend: {
                                       labels: {
                                           color: "white",
                                       }
                                   }
                               }
                           }} type={'polarArea'}/>
            </div>
        </>
    )
}
export default PolarChart;