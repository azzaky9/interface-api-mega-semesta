import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import moment from "moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SalesChart() {
  const [previousMonths, setPreviousMonths] = useState<string[]>([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: `Grafik penjualan bulanan ${previousMonths[0]} - ${
          previousMonths.at(-1) 
        } ${moment().format("YYYY")} `
      }
    }
  };

  const calculatePreviousMonths = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const months = [];

    for (let i = 0; i <= currentMonth; i++) {
      const previousMonth = new Date(today.getFullYear(), i, 1);
      months.push(
        previousMonth.toLocaleString("default", {
          month: "long"
        })
      );
    }

    setPreviousMonths(months);
  };

  const data = {
    labels: previousMonths,
    datasets: [
      {
        label: "Penjualan",
        data: previousMonths.map(() =>
          faker.number.int({ min: -1000, max: 1000 })
        ),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb"
      }
    ]
  };

  useEffect(() => {
    calculatePreviousMonths();
  }, []);

  console.log(previousMonths);

  return (
    <Line
      options={options}
      data={data}
    />
  );
}
