# 🚗 CATBELL GAS STATION

## 📑 프로젝트 회고록

- **노션** : https://zany-dish-c5c.notion.site/c62756ecb1b44500be60813f1cf1ab5c?pvs=4

<br/>
<br/>

## 👩‍🏫 프로젝트 소개
CATBELL 주유소는 한국 도로교통 공사의 공공데이터를 이용해 주유소 정보를 제공하는 사이트입니다.<br>
해당 프로젝트는 Next.js를 이용한 미니 사이드 프로젝트로 고속도로의 주유소 위치와 주유소별 가격정보,<br>
교통예보 현황 등을 확인하실 수 있습니다.
<br/><br/>

### 🚩 기술스택
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">


<br/><br/><br/>


| 설명                                                                                    | 화면 이미지                                                                                                |
| --------------------------------------------------------------------------------        | -----------------------------------------------------                                                      |
| **메인 페이지**<br><br>메인페이지 접속 시 보이는 화면입니다.                              | ![main](https://github.com/plmnko237/catbellproject/assets/120162946/4bcadad0-b6ab-4b1d-841e-0e3fb3769bbb) |
| **영업점 찾기**<br><br>고속도로에 위치한 주유소 이름과 위치를 확인 할 수 있습니다.          | ![sub1](https://github.com/plmnko237/catbellproject/assets/120162946/98146ef8-3ad8-47af-bd49-7988034f61d3)|
| **주유소 현황**<br><br>운영중인 주유소 이름과 방향, 노선명, 전화번호와 가격정보를 확인할 수 있습니다.            | ![sub2](https://github.com/plmnko237/catbellproject/assets/120162946/d452e4a0-f8de-47c6-b1ec-11785125e314)|
| **실시간 교통**<br><br>실시간으로 고속도로 구간 별 소요시간을 확인할 수 있습니다.<br>탭과 버튼을 이용해 필터링이 가능합니다.           | ![sub3](https://github.com/plmnko237/catbellproject/assets/120162946/5f40f6e8-ffe1-4603-8048-8802f653542d)![sub4](https://github.com/plmnko237/catbellproject/assets/120162946/6d943a30-5862-4a53-a4c1-dd7e5839d42e)<br>![sub5](https://github.com/plmnko237/catbellproject/assets/120162946/247bac4e-d34e-4197-9c2c-a80ed78fe343)|


 
 
<br/>
<br/>


## 💡 프로젝트에서 발생했던 문제와 해결방법 

1. <b>배포 후 영업점 찾기 페이지에서 카카오 지도 API가 뜨지 않는 문제</b><br/>
   로컬환경에서는 카카오 지도가 잘 뜨지만 배포 이후 서비스 링크에서 지도가 화면에 나오지 않는 문제를 겪었습니다.<br/>
   문제를 해결하기 위해 공식문서, 블로그를 검색하다가 NEXT.js에서 카카오 api를 배포할 때 CORS설정이 되어 있어야<br/>
   지도를 띄울 수 있다는 것을 알게 되었습니다.<br/>
   
   참고주소: https://vercel.com/guides/how-to-enable-cors
   ```
   module.exports = {
   async headers() {
     return [
       {
         // matching all API routes
         source: "/api/:path*",
         headers: [
         
           { key: "Access-Control-Allow-Credentials", value: "true" },
           { key: "Access-Control-Allow-Origin", value: "*" },
           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
         ]
       }
     ]
   }};
   ```   
   Vercel 공식문서 가이드에서 CORS를 활성화하는 코드를 찾아 추가했지만 해결할 수 없었고<br>
   카카오 Developers Dev Talk에 문의를 남겨 보니 401앱 인증 오류라는 답변을 받게 되었는데,<br>
   만약 앱 인증이 잘못되었다면 로컬에서도 뜨지 않아야 한다는 생각이 들었습니다.<br/><br/>
   문제가 해결될 기미가 없어 막막하던 찰나 Bit Harbor프로젝트를 진행했던 당시 카카오 소셜 로그인 기능을 구현할 때<br/>
   kakao애플리케이션 등록에서 플랫폼 웹 사이트 도메인을 추가해야 했던 것이 생각났습니다.<br/>
   이후 애플리케이션에 플랫폼 웹사이트 도메인을 추가하자 지도가 정상적으로 뜨게 되어 문제를 해결할 수 있었습니다.
   ![Untitled (1)](https://github.com/plmnko237/catbellproject/assets/120162946/c980d2d4-6739-4e07-a2c7-177c4da05751)

   <br/><br/>
3. <b>주유소명 검색 오류</b><br/>
   주유소 현황 페이지의 검색바에서 주유소명을 검색하면 해당 검색어를 포함하는 내용만 다시 필터링 하도록 코드를 작성했지만<br/>
   includes 함수를 쓸 수 없다며 오류가 발생하는 문제가 있었습니다.<br/>
   콘솔창에 디버깅을 하며 문제를 찾아보던 중, 주유소 이름이 null인 데이터를 발견하였고<br/>
   ![Untitled (2)](https://github.com/plmnko237/catbellproject/assets/120162946/3051c7ed-6fe1-4899-9d71-5443c0de534e)<br/>
   이후 검색 함수를 아래와 같이 수정하여 문제를 해결할 수 있었습니다.
   ```
   const filtered = data.filter(
        (item) =>
          item &&
          item.serviceAreaName &&
          item.serviceAreaName.includes(searchWord)
      );
   ```
   <br/>
   
5. <b>실시간 교통 페이지에서 차트 구현하기</b><br/>
   실시간 교통 페이지는 공공데이터 “현재 교통예보 현황”을 받아와 구간별 소요시간을 차트로 시각화 하는 페이지입니다.<br/>
   API로 받아온 데이터의 구간이 너무 많아 어떻게 하면 효율적으로 차트를 구현할 수 있을까 고민하다가<br/>
   라인차트 보다는 모바일을 고려하여 가로형 막대 차트로 구현하기로 하였습니다.<br/><br/>
   먼저 데이터를 크게 자동차와 버스로 탭을 나누고,행선지에 따라 전체 / 서울→지방 / 지방→서울 / 지방→지방으로<br/>
   세부 항목을 나누어 버튼을 누르면 해당 구간만 재 렌더링 되도록 작업했습니다.<br/>
   ```
   <div className="tabBox">
        <div
          className="active"
          onClick={(e) => {
            e.target.nextElementSibling.className = "inactive";
            e.target.className = "active";
            setTab(0);
          }}
        >
          자동차
        </div>
        <div
          className="inactive"
          onClick={(e) => {
            e.target.previousSibling.className = "inactive";
            e.target.className = "active";
            setTab(1);
          }}
        >
          버스
        </div>
      </div>
      <div className="chartBox">
        {tab === 0 ? (
          <BarChart traffic={trafficData} />
        ) : tab === 1 ? (
          <LineChart traffic={trafficData} />
        ) : null}
      </div>
   ```
   이후 전체 차트에서는 같은 행선지끼리 같은 색상으로 표현하기 위해 배열의 인덱스를 나누어 배경색을 적용하였고,<br/>
   ```
   const backgroundColors = []; //"전체"버튼에 적용되는 배경색
   const borderColors = []; //"전체"버튼에 적용되는 테두리색
   // 구간별 색상 적용
   myFilter.title.map((direction, idx) => {
     let color;
     if (idx >= 0 && idx < 7) {
       color = "rgba(255, 99, 132, 0.2)";
     } else if (idx >= 7 && idx < 14) {
       color = "rgba(255, 205, 86, 0.2)";
     } else {
       color = "rgba(75, 192, 192, 0.2)";
     }
   
     backgroundColors.push(color);
     borderColors.push(color.replace("0.2", "1"));
   });
   ```
   방향 별 필터링 버튼을 누르면 각각 도착지가 다른 점을 고려하여 각각 다른 배경색을 적용하여 사용자의 편의를 높이기 위해 노력하였습니다.
  ```
     //버튼 클릭 시 구간별로 필터링되는 함수
     const updateChart = (direction, filteredData) => {
     const { title, content } = filteredData;
  
     if (chartRef.current) {
       const chart = chartRef.current.chart;
       chart.data.labels = title;
       chart.data.datasets[0].data = content;
      
     // 버튼 이름이 전체면 같은 방향끼리 배경색 적용
     if (direction == "전체") { 
        chart.data.datasets[0].backgroundColor = backgroundColors;
        chart.data.datasets[0].borderColor = borderColors;
     // 버튼 이름이 전체가 아니면 아래 배경색 각각 적용
     } else if (direction !== "전체") {
        chart.data.datasets[0].backgroundColor = buttonFilterColors;
        chart.data.datasets[0].borderColor = buttonFilterColors.map((color) =>
          color.replace("0.2", "1")
        );
     }
     chart.update();
     }
  ```
   
<br/><br/><br/><br/>


## 🚩 커밋 컨벤션

<br/>

| Message    | 설명                                                  |
| ---------- | ----------------------------------------------------- |
| [feat]     | 새로운 기능을 추가할 경우                             |
| [fix]      | 버그를 고친 경우                                      |
| [design]   | CSS 등 사용자 UI 디자인 변경                          |
| [style]    | 코드 포맷변경, 세미콜론 누락, 코드수정이 없는 경우    |
| [refactor] | 프로덕션 코드 리펙토링할 경우                         |
| [comment]  | 필요한 주석 추가 및 변경                              |
| [docs]     | 문서를 수정한 경우                                    |
| [test]     | 테스트 코드 작업을할 경우                             |
| [chore]    | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우   |
| [rename]   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만 하는 경우 |
| [init]     | 브랜치 초기화 및 초기셋팅 관련된 설정일 경우          |
| [Test]     | 테스트 코드 추가, 이 외 테스트                        |
| [refactor] | Code refactoring                                      |
| [etc]      | 이 외 기타사항                                        |
