import CarTab from "../components/CarTab";
import { trafficAttributes } from "../data";

export default async function Traffic() {
  return (
    <>
      <section className="subTitle">
        <h2>실시간 교통 예보 현황</h2>
      </section>
      <div className="container" style={{ marginBottom: "100px" }}>
        <CarTab trafficAttributes={trafficAttributes} />
      </div>
    </>
  );
}
