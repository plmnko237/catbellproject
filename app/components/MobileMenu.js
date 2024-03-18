"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ data }) {
  const [width, setWidth] = useState("100%");
  return (
    <>
      <div
        className="mobileGnb"
        style={{ width: width, transition: "all 0.3s" }}
      >
        <div className="close" onClick={() => setWidth("0")}>
          ⨉
        </div>
        <nav id="m_gnb">
          <ul>
            {data.map((_, i) => {
              return (
                <li key={i} onClick={() => setWidth("0")}>
                  <Link href={data[i].url}>{data[i].title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
