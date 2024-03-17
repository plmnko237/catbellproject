"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function BarChart({ traffic }) {
  const chartRef = useRef(null);

  //구간이름
  let title = traffic
    .map((a, i) => a.title)
    .slice(21)
    .map((segment) => segment.split("->").join(" ⇒ "));

  //소요시간
  let content = traffic
    .map((a, i) => a.content)
    .slice(21)
    .map((time) => {
      let [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute; // 소요 시간을 분 단위로 변환하여 Chart.js에 맞게 가공
    });

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: title,
          datasets: [
            {
              axis: "y",
              label: "구간 별 소요 시간(분 단위)",
              data: content,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          //responsive: true,
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: "left",
            },
          },
          indexAxis: "y",
          scales: {
            x: {
              type: "linear", // x축을 수치형으로 설정
              min: 0, // 최소값을 0으로 설정
            },
            y: { type: "category" },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, []);
  return (
    <div className="chartArea">
      <h3>버스 고속도로 구간 별 소요시간</h3>
      <div className="carDirBtn">
        <div className="active1">전체</div>
        <div className="inactive1">서울 ⇒ 지방방향</div>
        <div className="inactive1">지방 ⇒ 서울방향</div>
        <div className="inactive1">지방 ⇒ 지방방향</div>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
}
