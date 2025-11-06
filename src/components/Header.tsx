import { IconMenu } from './Icons'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import LeftDrawer from "@/components/LeftDrawer";
// import SearchFilterSheet from "@/components/sheet/SearchFilterSheet";
// import SearchFilterSheet from "@/components/sheet/SearchKeywordSheet";
import IconNoti from "@/assets/images/icon-noti.svg?react";

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <header className="m-header" role="banner" aria-label="헤더">
      <button
        className="icon-btn"
        aria-label="메뉴 열기"
        onClick={() => setDrawerOpen(true)}
      >
        <IconMenu />
      </button>
      <h1 className="m-title">비즈업무시스템</h1>
      <Link to="/notification" className="icon-btn" aria-label="알림 이동">
        <IconNoti width={22} height={22} />
      </Link>
      {/* Overlays */}
      <div
        className={`overlay ${drawerOpen || sheetOpen ? "open" : ""}`}
        onClick={() => {
          setDrawerOpen(false);
          setSheetOpen(false);
        }}
      />
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {/* <SearchFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} /> */}
    </header>
  );
}
