"use client";
import { useEffect, useState } from "react";

export default function Situation() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchData = async (size, keyWord) => {
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
        document.documentElement.offsetHeight - window.innerHeight <=
        document.documentElement.scrollTop
      ) {
        fetchData(20, searchWord); // 20씩 추가로 데이터 가져오기
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
    // 검색어가 있다면
    if (searchWord) {
      setPage(1);

      const filtered = data.filter((item) => item == searchWord);

      // 필터된 결과로 데이터 업데이트
      setData(filtered);
    } else {
      alert("검색어를 입력해주세요.");
      setData([]);
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
        <div className="message">↔ 좌우로 스크롤해보세요.</div>
        <div style={{ overflow: "hidden", overflowX: "scroll" }}>
          <table className="stationList">
            <thead>
              <tr>
                <th>번호</th>
                <th>주유소명</th>
                <th>방향</th>
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
                  <td>{index + 1}</td>
                  <td>{station.serviceAreaName || "알 수 없음"}</td>
                  <td>{station.direction || "알 수 없음"}</td>
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
      </div>
    </>
  );
}
