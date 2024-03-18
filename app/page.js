import Link from "next/link";
import Card from "./components/Card";

export default function Home() {
  return (
    <main>
      <section className="mainVisual">
        <div className="mainTxt">
          <h3>실시간 주유소 찾기 서비스</h3>
          <div>
            언제 어디서나 간편하게!
            <br />
            공공데이터 API를 기반으로
            <br />
            주유소 위치와 가격을 실시간으로 확인하실 수 있어요.
          </div>
          <Link href={"/store"}>
            <div className="main_vBtn">주유소 찾으러 가기 📍</div>
          </Link>
        </div>
        <div className="animationArea">
          <div className="dashLine"></div>
          <div className="circle1"></div>
          <div className="circle2"></div>
        </div>
        <div className="visualImg">
          <img src="/main_visual.png" alt="메인이미지" />
        </div>
      </section>
      <section className="mainContents">
        <Card />
      </section>
    </main>
  );
}
