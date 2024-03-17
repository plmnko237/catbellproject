import locationInfoUnit, { locationInfo } from "@/util/locationInfo";
import forecast, { forecastInfo } from "@/util/forecast";

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

//실시간 교통 fetchData
let traffic = await forecastInfo();

//오늘 날짜
let today = traffic[0].sdate;
today =
  today.slice(0, 4) +
  "년" +
  today.slice(4, 6) +
  "월" +
  today.slice(6, 8) +
  "일";

let trafficAttributes = [
  "날짜",
  "시간",
  "전국교통량",
  "지방방향 교통량",
  "서울방향 교통량",
  "서울->대전 소요시간",
  "서울->대구 소요시간",
  "서울->울산 소요시간",
  "서울->부산 소요시간",
  "서울->광주 소요시간",
  "서울->목포 소요시간",
  "서울->강릉 소요시간",
  "대전->서울 소요시간",
  "대구->서울 소요시간",
  "울산->서울 소요시간",
  "부산->서울 소요시간",
  "광주->서울 소요시간",
  "목포->서울 소요시간",
  "강릉->서울 소요시간",
  "남양주->양양 소요시간",
  "양양->남양주 소요시간",
  "서울->대전 버스 소요시간",
  "서울->대구 버스 소요시간",
  "서울->울산 버스 소요시간",
  "서울->부산 버스 소요시간",
  "서울->광주 버스 소요시간",
  "서울->목포 버스 소요시간",
  "서울->강릉 버스 소요시간",
  "남양주->양양 버스 소요시간",
  "대전->서울 버스 소요시간",
  "대구->서울 버스 소요시간",
  "울산->서울 버스 소요시간",
  "부산->서울 버스 소요시간",
  "광주->서울 버스 소요시간",
  "목포->서울 버스 소요시간",
  "강릉->서울 버스 소요시간",
  "양양->남양주 버스 소요시간",
];

let trafficData = trafficAttributes.map((attr, i) => {
  return { title: attr, content: traffic[0][Object.keys(traffic[0])[i]] };
});

export { cardData, positionData, today, trafficData };
