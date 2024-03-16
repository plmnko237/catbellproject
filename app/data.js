import curStateStation, { currentInfo } from "@/util/curStateStation";
import locationInfoUnit, { locationInfo } from "@/util/locationInfo";

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
let station = await locationInfo();

let positionData = station.map((a, i) => {
  let [position] = [
    {
      title: station[i].unitName,
      latlng: {
        lat: Number(station[i].yValue),
        lng: Number(station[i].xValue),
      },
    },
  ];

  return position;
});

//주유소 현황 fetchData
//let gasStation = await currentInfo(1);

// let gasStationData = gasStation.map((a, i) => {
//   let [station] = [
//     {
//       direction: gasStation[i].direction, //방향
//       routeName: gasStation[i].routeName, //노선명
//       serviceAreaName: gasStation[i].serviceAreaName, //주유소명
//       gasolinePrice: gasStation[i].gasolinePrice, //휘발유가격
//       diselPrice: gasStation[i].diselPrice, //경유가격
//       lpgPrice: gasStation[i].lpgPrice, //LPG가격
//       telNo: gasStation[i].telNo, //전화번호
//     },
//   ];

//   return station;
// });

export { cardData, positionData };
