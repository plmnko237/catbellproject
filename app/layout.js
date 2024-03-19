import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cardData } from "./data";
import SearchBar from "./components/SearchBar";
import MobileBtn from "./components/MobileBtn";
import { Html, Head, Main, NextScript } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  let data = cardData;
  return (
    <Html lang="en">
      <Head />
      <body className={inter.className}>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KYE}&libraries=services&autoload=false';
              document.body.appendChild(script);
            `,
          }}
        /> */}
        <header>
          <div className="con">
            <h1>
              <Link href={"/"}>
                <img src="/logo.svg" alt="logo" />
              </Link>
            </h1>
            <nav id="gnb">
              <ul>
                {data?.map((_, i) => {
                  return (
                    <li key={i}>
                      <Link href={data[i].url}>{data[i].title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <MobileBtn data={data} />
            <SearchBar />
          </div>
        </header>
        {children}
        {/* <NextScript /> */}
      </body>
    </Html>
  );
}
