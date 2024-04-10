"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function BarChart({ traffic }) {
  const chartRef = useRef(null);
  //content가 "0:00"인 데이터 걸러내기
  let filterTimeZeroData = traffic.map((item) =>
    item.filter((obj) => obj.content !== "0:00")
  );
  let myFilter = filterDir();
  const backgroundColors = []; //배경색
  const borderColors = []; //테두리색
  const buttonFilterColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];

  // 구간별 색상 적용
  myFilter.title.map((direction, idx) => {
    let color;
    if (idx >= 0 && idx < 6) {
      color = "rgba(153, 102, 255, 0.2)";
    } else {
      color = "rgba(255, 159, 64, 0.2)";
    }

    backgroundColors.push(color);
    borderColors.push(color.replace("0.2", "1"));
  });

  //버튼 눌렀을때 실행되는 방향별 필터링
  function filterDir(start = 21, end = -1) {
    let flattened = [].concat(...filterTimeZeroData);
    const titles = flattened && flattened.map((item) => item.title);
    const contents = flattened && flattened.map((item) => item.content);

    const slicedTitles = titles.slice(start, end);
    const slicedContents = contents.slice(start, end).map((time) => {
      let [hour, minute] = time && time.split(":").map(Number);
      return hour * 60 + minute;
    });

    return {
      title: slicedTitles,
      content: slicedContents,
    };
  }

  const updateChart = (direction, filteredData) => {
    const { title, content } = filteredData;

    if (chartRef.current) {
      const chart = chartRef.current.chart;

      chart.data.labels = title;
      chart.data.datasets[0].data = content;
      if (direction == "전체") {
        chart.data.datasets[0].backgroundColor = backgroundColors;
        chart.data.datasets[0].borderColor = borderColors;
      } else if (direction !== "전체") {
        chart.data.datasets[0].backgroundColor = buttonFilterColors;
        chart.data.datasets[0].borderColor = buttonFilterColors.map((color) =>
          color.replace("0.2", "1")
        );
      }

      chart.update();
    }
  };

  // 차트 보여주기
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
              label: "",
              data: myFilter.content,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
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
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div className="chartArea">
      <h3>버스 고속도로 구간 별 소요시간</h3>
      <div className="carDirBtn2">
        {["전체", "서울 ⇒ 지방방향", "지방 ⇒ 지방방향"].map((a, index) => {
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
                  updateChart(a, filteredData);
                } else if (a == "서울 ⇒ 지방방향") {
                  const filteredData = filterDir(21, 28);
                  updateChart(a, filteredData);
                } else {
                  const filteredData = filterDir(28);
                  updateChart(a, filteredData);
                }
              }}
            >
              {a}
            </div>
          );
        })}
      </div>
      <canvas ref={chartRef} />
    </div>
  );
}
