let locationInfoUnit;

export const locationInfo = async () => {
  try {
    const response = await fetch(
      `https://data.ex.co.kr/openapi/locationinfo/locationinfoUnit?key=${process.env.MY_OPEN_API_SECRET_KYE}&type=json&numOfRows=100&pageNo=1`
    );

    if (response.status === 200) {
      const result = await response.json();

      locationInfoUnit = result.list; // locationInfoUnit 데이터를 할당
      return locationInfoUnit;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      locationInfoUnit = null; // 에러 발생 시 locationInfoUnit null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    locationInfoUnit = null; // 에러 발생 시 locationInfoUnit null로 설정
    return null;
  }
};

export default locationInfoUnit;
