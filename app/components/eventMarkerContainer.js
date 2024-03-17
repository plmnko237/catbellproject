"use client";
import React, { useState } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

export default function EventMarkerContainer({ position, content }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && content}
    </MapMarker>
  );
}
