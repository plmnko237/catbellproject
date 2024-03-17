import BarChart from "../components/BarChart";
import { today, trafficData } from "../data";

export default async function Traffic() {
  const data = trafficData;
  let nowDate = today;
  let cjunkook = Number(data[2].content).toLocaleString("ko-KR");
  let cjibangDir = Number(data[3].content).toLocaleString("ko-KR");
  let cseoulDir = Number(data[4].content).toLocaleString("ko-KR");

  return (
    <>
      <section className="subTitle">
        <h2>실시간 교통 예보 현황</h2>
      </section>
      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="dateBox">
          <div>
            <h4>
              📅 날짜 : <span>{nowDate}</span>
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
        <BarChart traffic={data} />
      </div>
    </>
  );
}
