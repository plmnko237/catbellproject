let curStateStation;

export const curStateInfo = async () => {
  try {
    const response = await fetch(
      `https://data.ex.co.kr/openapi/locationinfo/locationinfoUnit?key=${process.env.MY_OPEN_API_SECRET_KYE}&type=json&numOfRows=100&pageNo=1`
    );

    if (response.status === 200) {
      const result = await response.json();
      // console.log("Fetched data:", result.list);
      curStateStation = result.list; // curStateStation에 데이터를 할당
      return curStateStation;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      curStateStation = null; // 에러 발생 시 curStateStation를 null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    curStateStation = null; // 에러 발생 시 curStateStation를 null로 설정
    return null;
  }
};

export default curStateStation;
