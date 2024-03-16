let curStateStation;

export const currentInfo = async (page = 1) => {
  try {
    const response = await fetch(
      `https://data.ex.co.kr/openapi/business/curStateStation?key=${process.env.MY_OPEN_API_SECRET_KYE}&type=json&numOfRows=20&pageNo=${page}`
    );

    if (response.status === 200) {
      const result = await response.json();
      //console.log("Fetched data:", result.list);
      curStateStation = result.list; // curStateStation 데이터를 할당
      return curStateStation;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      curStateStation = null; // 에러 발생 시 curStateStation null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    curStateStation = null; // 에러 발생 시 curStateStation null로 설정
    return null;
  }
};

export default curStateStation;
