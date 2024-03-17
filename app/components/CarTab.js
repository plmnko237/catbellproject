"use client";

import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

export default function CarTab({ traffic }) {
  let [tab, setTab] = useState(0);

  return (
    <>
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
          <BarChart traffic={traffic} />
        ) : tab === 1 ? (
          <LineChart traffic={traffic} />
        ) : null}
      </div>
    </>
  );
}
