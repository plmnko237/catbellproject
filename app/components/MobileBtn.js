"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function MobileBtn({ data }) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div
        className="mobile_mBtn"
        onClick={(e) => {
          e.stopPropagation();
          setMenu(!menu);
        }}
      >
        ≡
      </div>
      {menu === true ? (
        <MobileMenu
          data={data}
          className={menu ? "mobile-menu active" : "mobile-menu"}
        />
      ) : null}
    </>
  );
}
