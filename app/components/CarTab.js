"use client";

import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import axios from "axios";

export default function CarTab({ appKey, trafficAttributes }) {
  let [tab, setTab] = useState(0);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://data.ex.co.kr/openapi/safeDriving/forecast?key=7711838617&type=json`
        );
        const data = response.data;
        setForecast(data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!forecast) {
    return <div>Loading...</div>;
  }

  const trafficData = forecast.map((data) => {
    const formattedData = Object.keys(data).map((key, index) => ({
      title: trafficAttributes[index],
      content: data[key],
    }));
    return formattedData;
  });

  let today = forecast[0].sdate;
  today =
    today.slice(0, 4) +
    "년" +
    today.slice(4, 6) +
    "월" +
    today.slice(6, 8) +
    "일";

  let cjunkook = Number(forecast[0].cjunkook).toLocaleString("ko-KR");
  let cjibangDir = Number(forecast[0].cjibangDir).toLocaleString("ko-KR");
  let cseoulDir = Number(forecast[0].cseoulDir).toLocaleString("ko-KR");

  return (
    <>
      <div className="dateBox">
        <div>
          <h4>
            📅 기준 날짜 : <span>{today}</span>
          </h4>
        </div>
        <div>
          <h4>
            <span className="icon">🚙</span> 전국 교통량 :{" "}
            <span>{cjunkook}대</span>
          </h4>
        </div>
        <div>
          <h4>
            <span className="icon">🚗</span> 지방방향 교통량 :{" "}
            <span>{cjibangDir}대</span>
          </h4>
        </div>
        <div>
          <h4>
            <span className="icon">🚐</span> 서울방향 교통량:{" "}
            <span>{cseoulDir}대</span>
          </h4>
        </div>
      </div>
      <div className="tabBox">
        <div
          className="active"
          onClick={(e) => {
            e.target.nextElementSibling.className = "inactive";
            e.target.className = "active";
            setTab(0);
          }}
        >
          자동차
        </div>
        <div
          className="inactive"
          onClick={(e) => {
            e.target.previousSibling.className = "inactive";
            e.target.className = "active";
            setTab(1);
          }}
        >
          버스
        </div>
      </div>
      <div className="chartBox">
        {tab === 0 ? (
          <BarChart traffic={trafficData} />
        ) : tab === 1 ? (
          <LineChart traffic={trafficData} />
        ) : null}
      </div>
    </>
  );
}
