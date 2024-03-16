import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import { positionData } from "../data";
import EventMarkerContainer from "../components/EventMarkerContainer";

export default async function Store() {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KYE}&autoload=false`;
  let positions = positionData;

  return (
    <>
      <section className="subTitle">
        <h2>영업점 찾기</h2>
      </section>
      <div className="container">
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={{ lat: 37.396399, lng: 127.1032 }}
          style={{ width: "100%", height: "50vh", borderRadius: "20px" }}
          level={3}
        >
          {positions.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.title}
            />
          ))}
        </Map>
      </div>
    </>
  );
}
