"use client";
import { useEffect, useState } from "react";

export default function Situation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        const apiKey = process.env.MY_OPEN_API_SECRET_KYE;
        const response = await fetch(
          `https://data.ex.co.kr/openapi/business/curStateStation?key=${process.env.MY_OPEN_API_SECRET_KYE}&type=json&numOfRows=20&pageNo=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("데이터", data);

  return (
    <>
      <section className="subTitle">
        <h2>주유소 현황</h2>
        <span></span>
      </section>
      <div className="container">
        <div className="serachBar">
          <input type="text" />
          <button type="button"> 검색하기</button>
        </div>

        <table className="stationList">
          <thead>
            <tr>
              <th>주유소명</th>
              <th>노선명</th>
              <th>휘발유</th>
              <th>경유</th>
              <th>LPG</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {data.map((station, index) => (
              <tr key={index}>
                <td>{station.serviceAreaName || "알 수 없음"}</td>
                <td>{station.routeName || "알 수 없음"}</td>
                <td>{station.gasolinePrice || "알 수 없음"}</td>
                <td>{station.diselPrice || "알 수 없음"}</td>
                <td>{station.lpgPrice || "알 수 없음"}</td>
                <td>{station.telNo || "알 수 없음"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
