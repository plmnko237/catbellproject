import { forecastInfo } from "@/util/forecast";
import CarTab from "../components/CarTab";
import { trafficAttributes } from "../data";

export default async function Traffic() {
  let appKey = process.env.MY_OPEN_API_SECRET_KYE;

  return (
    <>
      <section className="subTitle">
        <h2>실시간 교통 예보 현황</h2>
      </section>
      <div className="container" style={{ marginBottom: "100px" }}>
        <CarTab appkey={appKey} trafficAttributes={trafficAttributes} />
      </div>
    </>
  );
}
