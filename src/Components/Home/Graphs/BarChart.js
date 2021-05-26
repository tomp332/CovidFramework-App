import {Bar} from 'react-chartjs-2'

const moment = require('moment');
const React = require('react');
import ('./PolarChart.css')

const BarGraph = (stats) => {
    let months = moment.months()
    return (
        <div className={"bar-graph"}>
            <Bar height={450} width={450} data={{
                labels: ["January", "February", "March", "April", "May", "June", "July", "August",
                    "September", "October", "November", "December"],
                datasets: [
                    {
                        label: months[0],
                        data: [10],
                        backgroundColor: ['#36a2eb']
                    },
                    {
                        label: months[1],
                        data: [null, 20],
                        backgroundColor: ['#FF7F50']
                    },
                    {
                        label: months[2],
                        data: [null, null, 30],
                        backgroundColor: ['#FAEBD7']
                    },
                    {
                        label: months[3],
                        data: [null, null, null, 40],
                        backgroundColor: ['#FA8072']
                    },
                    {
                        label: months[4],
                        data: [null, null, null, null, 50],
                        backgroundColor: ['green']
                    },
                    {
                        label: months[5],
                        data: [null, null, null, null, null, 60],
                        backgroundColor: ['red']
                    },
                    {
                        label: months[6],
                        data: [null, null, null, null, null, null, 70],
                        backgroundColor: ['#EE82EE']
                    },
                    {
                        label: months[7],
                        data: [null, null, null, null, null, null, null, 80],
                        backgroundColor: ['#6A5ACD']
                    },
                    {
                        label: months[8],
                        data: [null, null, null, null, null, null, null, null, 90],
                        backgroundColor: ['#FFFF00']
                    },
                    {
                        label: months[9],
                        data: [null, null, null, null, null, null, null, null, null, 100],
                        backgroundColor: ['orange']
                    },
                    {
                        label: months[10],
                        data: [null, null, null, null, null, null, null, null, null, null, 110],
                        backgroundColor: ['#4169E1']
                    },
                    {
                        label: months[11],
                        data: [null, null, null, null, null, null, null, null, null, null, null, 120],
                        backgroundColor: ['#FF6347']
                    },
                ],
            }
            }
                 options={{
                     scales: {},
                     animation: false,
                     plugins: {
                         title: {
                             display: true,
                             text: 'Connection statistics',
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
                 }} type={'Bar'}/>
        </div>
    )
}
export default BarGraph;