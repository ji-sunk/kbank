import React from "react";
import IconPager from "@/assets/images/icon-pager-btn.svg?react";
import IconDPager from "@/assets/images/icon-pager-double-btn.svg?react";


interface PagerProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pager({ page, totalPages, onChange, className }: PagerProps) {
  const go = (p: number) => onChange(Math.min(totalPages, Math.max(1, p)));

  return (
    <nav className={`pager ${className || ""}`} aria-label="페이지네이션">
      {/* <button className="pager__btn" aria-label="첫 페이지" disabled={page === 1} onClick={() => go(1)}>«</button> */}
      <button
        className="pager__btn"
        aria-label="첫 페이지"
        disabled={page === 1}
        onClick={() => go(1)}
      >
        <IconDPager className="pager__icon" />
      </button>
      {/* <button className="pager__btn" aria-label="이전 페이지" disabled={page === 1} onClick={() => go(page - 1)}>‹</button> */}
      <button
        className="pager__btn"
        aria-label="이전 페이지"
        disabled={page === 1}
        onClick={() => go(page - 1)}
      >
        <IconPager className="pager__icon" />
      </button>
      <span className="pager__info">
        {page} / {totalPages}
      </span>
      <button
        className="pager__btn"
        aria-label="다음 페이지"
        disabled={page === totalPages}
        onClick={() => go(page + 1)}
      >
        <IconPager
          className="pager__icon"
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
      <button
        className="pager__btn"
        aria-label="마지막 페이지"
        disabled={page === totalPages}
        onClick={() => go(totalPages)}
      >
        <IconDPager
          className="pager__icon"
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </nav>
  );
}
