import React from 'react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    plugins,
    scales,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const Linechart = () => {

    const data ={
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [{
            label: "Revenue",
            data: [100, 200, 300, 154, 140, 150, 390, 233, 509, 123, 123, 454],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true,
          }]
    };
    const options ={
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: { display: false }
            },
        }
    };  

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  )
}

export default Linechart
