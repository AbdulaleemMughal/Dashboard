import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend, Title } from "chart.js";
ChartJS.register(Tooltip, ArcElement, Legend, Title);

const DoughnutChart = () => {
  const data = {
    datasets: [
      {
        data: [100, 200, 300, 154, 150],
        backgroundColor: ["red", "yellow", "blue", "green", "orange"],
      },
    ],
    labels: ["Red", "Yellow", "Blue", "Green",  "Orange" ],
  };

  const options = {};

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const json = await data.json();
        console.log(json);
    };  

    fetchData();
  }, [])

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
