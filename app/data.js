import curStateStation, { curStateInfo } from "@/util/curStateStation";

let cardData = [
  {
    title: "영업점 찾기",
    contents: "지도를 통해 주변의 가까운 주유소 정보를 알려드려요.",
    icon: "🔎",
    url: "/store",
  },
  {
    title: "주유소 현황",
    contents: "주유소별 가격, 업체 현황을 알려드립니다.",
    icon: "⛽",
    url: "/situation",
  },
  {
    title: "실시간 교통",
    contents: "구간별 실시간 교통 정보를 알려드립니다.",
    icon: "🚥",
    url: "/traffic",
  },
];

//영업소 위치 fetchData
let station = await curStateInfo();
//console.log("station", station);

let positionData = station.map((a, i) => {
  let [myPosition] = [
    {
      title: station[i].unitName,
      latlng: {
        lat: Number(station[i].yValue),
        lng: Number(station[i].xValue),
      },
    },
  ];

  return myPosition;
});

export { cardData, positionData };
