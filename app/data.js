import locationInfoUnit, { locationInfo } from "@/util/locationInfo";

export const cardData = [
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

export const positionData = station?.map((a, i) => {
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

//필터링할 내용
export const trafficAttributes = [
  "시간",
  "날짜",
  "전국교통량",
  "지방방향 교통량",
  "서울방향 교통량",
  "서울⇒대전",
  "서울⇒대구",
  "서울⇒울산",
  "서울⇒부산",
  "서울⇒광주",
  "서울⇒목포",
  "서울⇒강릉",
  "대전⇒서울",
  "대구⇒서울",
  "울산⇒서울",
  "부산⇒서울",
  "광주⇒서울",
  "목포⇒서울",
  "강릉⇒서울",
  "남양주⇒양양",
  "양양⇒남양주",
  "서울⇒대전 버스",
  "서울⇒대구 버스",
  "서울⇒울산 버스",
  "서울⇒부산 버스",
  "서울⇒광주 버스",
  "서울⇒목포 버스",
  "서울⇒강릉 버스",
  "남양주⇒양양 버스",
  "대전⇒서울 버스",
  "대구⇒서울 버스",
  "울산⇒서울 버스",
  "부산⇒서울 버스",
  "광주⇒서울 버스",
  "목포⇒서울 버스",
  "강릉⇒서울 버스",
  "양양⇒남양주 버스",
];
