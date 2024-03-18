"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function BarChart({ traffic }) {
  const chartRef = useRef(null);
  let myFilter = filterDir();

  function filterDir(start = 5, end = 21) {
    const flattened = [].concat(...traffic);
    const titles = flattened.map((item) => item.title);
    const contents = flattened.map((item) => item.content);

    const slicedTitles = titles.slice(start, end);
    const slicedContents = contents.slice(start, end).map((time) => {
      let [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    });

    return {
      title: slicedTitles,
      content: slicedContents,
    };
  }

  const updateChart = (filteredData) => {
    const { title, content } = filteredData;

    if (chartRef.current) {
      const chart = chartRef.current.chart;

      chart.data.labels = title;
      chart.data.datasets[0].data = content;

      chart.update();
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: myFilter.title,
          datasets: [
            {
              axis: "y",
              label: "구간 별 소요 시간(분 단위)",
              data: myFilter.content,
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
          responsive: true,
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
      <h3>자동차 고속도로 구간 별 소요시간</h3>
      <div className="carDirBtn">
        {["전체", "서울 ⇒ 지방방향", "지방 ⇒ 서울방향", "지방 ⇒ 지방방향"].map(
          (a, index) => {
            return (
              <div
                key={index}
                className={index === 0 ? "active1" : "inactive1"}
                onClick={(e) => {
                  const parentElement = e.target.parentElement;

                  Array.from(parentElement.children).forEach((child) => {
                    if (child === e.target) {
                      child.className = "active1";
                    } else {
                      child.className = "inactive1";
                    }
                  });

                  if (a == "전체") {
                    const filteredData = filterDir();
                    updateChart(filteredData);
                  } else if (a == "서울 ⇒ 지방방향") {
                    const filteredData = filterDir(5, 12);
                    updateChart(filteredData);
                  } else if (a == "지방 ⇒ 서울방향") {
                    const filteredData = filterDir(12, 19);
                    updateChart(filteredData);
                  } else {
                    const filteredData = filterDir(19);
                    updateChart(filteredData);
                  }
                }}
              >
                {a}
              </div>
            );
          }
        )}
      </div>
      <canvas ref={chartRef} />
    </div>
  );
}
