import EventMarkerContainer from "../components/EventMarkerContainer";
import { positionData } from "../data";

export default async function Store() {
  const kye = process.env.KAKAO_JAVASCRIPT_KYE;
  return (
    <>
      <section className="subTitle">
        <h2>영업점 찾기</h2>
      </section>
      <div className="container">
        <EventMarkerContainer position={positionData} apikey={kye} />
      </div>
    </>
  );
}
