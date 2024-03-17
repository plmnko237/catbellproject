let forecast;

export const forecastInfo = async () => {
  try {
    const response = await fetch(
      `https://data.ex.co.kr/openapi/safeDriving/forecast?key=${process.env.MY_OPEN_API_SECRET_KYE}&type=json`
    );

    if (response.status === 200) {
      const result = await response.json();
      forecast = result.list; // forecast 데이터를 할당
      return forecast;
    } else {
      console.error("Failed to fetch data. Status:", response.status);
      forecast = null; // 에러 발생 시 forecast null로 설정
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    forecast = null; // 에러 발생 시 forecast null로 설정
    return null;
  }
};

export default forecast;
