import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Accordion from "./Accordion";
import IconClose from "@/assets/images/icon-close.svg?react";
import IconSetting from "@/assets/images/icon-setting.svg?react";

type MenuItem = string | { label: string; updated?: boolean };

export default function LeftDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const settingBtnRef = useRef<HTMLButtonElement>(null);

  const sections: { title: string; items: MenuItem[] }[] = [
    {
      title: "사업자관리",
      items: ["계정관리", "사업자조회", "사용자조회", "인증서관리"],
    },
    { title: "전자지갑관리", items: ["전자지갑관리", "지갑정보"] },
    { title: "매출관리", items: ["매출관리", "현금영수증 조회"] },
    {
      title: "커뮤니티",
      items: [{ label: "공지사항", updated: true }, "FAQ", "1:1문의"],
    },
  ];

  // 버튼 rect 포털 팝오버의 고정 좌표 계산
  const calcPosition = () => {
    const btn = settingBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const width = 150; // 팝오버 고정 폭
    const gap = 20; // 버튼 하단 20px
    setPos({
      top: rect.bottom + gap,
      left: Math.round(rect.right - width), // 우측 정렬
    });
  };

  useLayoutEffect(() => {
    if (settingsOpen) calcPosition();
  }, [settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onScrollOrResize = () => calcPosition();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [settingsOpen]);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!settingsOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const btn = settingBtnRef.current;
      if (btn && btn.contains(e.target as Node)) return; // 버튼 자체 클릭은 무시
      setSettingsOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [settingsOpen]);

  return (
    <aside
      className={`drawer ${open ? "open" : ""}`}
      role="dialog"
      aria-label="왼쪽 메뉴"
    >
      <div className="drawer-header">
        <span className="name">
          <span>amart</span>
          <span>님</span>
        </span>

        <button
          type="button"
          ref={settingBtnRef}
          className="drawer-setting-btn"
          aria-label="설정 열기"
          aria-expanded={settingsOpen}
          onClick={() => setSettingsOpen((v) => !v)}
        >
          <IconSetting width={22} height={22} />
        </button>

        <button className="drawer-close" onClick={onClose} aria-label="닫기">
          <IconClose width={22} height={22} />
        </button>
      </div>

      <div className="drawer-body">
        <p className="txt">최근 접속 일시 2025.10.15 13:21:33</p>
        <Accordion sections={sections} />
      </div>

      {/* === 포털 팝오버 === */}
      {settingsOpen &&
        pos &&
        createPortal(
          <div
            className="setting-popover--portal"
            role="dialog"
            aria-label="설정 메뉴"
            // style={{ top: pos.top, left: pos.left }}
          >
            <button
              type="button"
              className="setting-popover__item"
              onClick={() => setSettingsOpen(false)}
            >
              마이페이지
            </button>
            <button
              type="button"
              className="setting-popover__item"
              onClick={() => setSettingsOpen(false)}
            >
              로그아웃
            </button>
          </div>,
          document.body
        )}
    </aside>
  );
}
