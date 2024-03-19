"use client";

import Script from "next/script";
import { useState } from "react";
import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

export default function EventMarkerContainer({ position, apikey }) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
  const [loading, error] = useKakaoLoader({
    appkey: apikey, // 발급 받은 APPKEY
  });
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  let positions = position;
  const handleMouseOver = (index) => {
    setVisibleMarkers([index]);
  };

  const handleMouseOut = () => {
    setVisibleMarkers([]);
  };

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.396399, lng: 127.1032 }}
        style={{ width: "100%", height: "70vh", borderRadius: "20px" }}
        level={3}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        {positions.map((value, index) => (
          <MapMarker
            key={`EventMarkerContainer-${index}`}
            position={value.latlng}
            onClick={(marker) => map.panTo(marker.getPosition())}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
          >
            {visibleMarkers.includes(index) && value.title}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}
