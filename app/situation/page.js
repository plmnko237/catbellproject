"use client";
import { useEffect, useState } from "react";

export default function Situation() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchData = async (size) => {
      try {
        const response = await fetch(
          `https://data.ex.co.kr/openapi/business/curStateStation?key=7711838617&type=json&numOfRows=${size}&pageNo=${page}&serviceAreaName=${searchWord}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData((prevData) => [...prevData, ...(result.list || [])]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //무한 스크롤
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData(20); // 20씩 추가로 데이터 가져오기
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      }
    };

    fetchData(20); //기본 목록 20개 가져오기
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, searchWord]);

  //엔터 눌렀을때 검색
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (searchWord) {
      setData([]); // 검색 결과를 보여주기 전에 이전 데이터 초기화
      setPage(1); // 검색 시 페이지 번호 초기화
    } else {
      alert("검색어를 입력해주세요.");
    }
  };
  return (
    <>
      <section className="subTitle">
        <h2>주유소 현황</h2>
      </section>
      <div className="container">
        <div className="serachArea">
          <div className="searchBar">
            <input
              type="text"
              placeholder="주유소를 검색해주세요."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button type="button" className="searchBtn">
              <img src="/search.svg" alt="검색" onClick={handleSearch} />
            </button>
          </div>
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
