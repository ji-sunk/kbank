import React from "react";
import IconSearch from "@/assets/images/icon-search.svg?react";

export type FilterKey = "typeA" | "typeB" | "period" | "sort";

interface Props {
  chipTypeA: string;
  chipTypeB: string;
  chipPeriod: string;
  chipSort: string;
  onOpenFilter: (focus: FilterKey) => void;
  onOpenKeyword: () => void;
  query: string;
  onClearKeyword: () => void;
  /** 클릭해서 시트를 연 버튼만 전달. 초기/닫힘 상태는 null. */
  activeKey?: FilterKey | null;
}

export default function FilterControls({
  chipTypeA,
  chipTypeB,
  chipPeriod,
  chipSort,
  onOpenFilter,
  onOpenKeyword,
  query,
  onClearKeyword,
  activeKey,
}: Props) {
 
  const btn = (key: FilterKey, label: string) => {
    const isActive = activeKey === key; // 클릭한 버튼만
    return (
      <button
        type="button"
        className={`sum-item ${isActive ? "is-active" : ""}`}
        onClick={() => onOpenFilter(key)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="am-filterbar" role="region" aria-label="검색 및 필터">
      <div
        className="am-filterbar__summary"
        role="group"
        aria-label="검색 조건"
      >
        <div className="sum-line">
          {btn("typeA", chipTypeA)}
          <span className="dot">·</span>
          {btn("typeB", chipTypeB)}
          <span className="dot">·</span>
          {btn("period", chipPeriod)}
          <span className="dot">·</span>
          {btn("sort", chipSort)}
        </div>
      </div>

      {/* query가 있을 때만 pill 렌더링 */}
      <div className="am-filterbar__search" role="search">
        {query && (
          <div className="search-pill">
            <input
              type="text"
              className="pill-input"
              value={query}
              readOnly
              aria-label="검색어"
            />
            <button
              type="button"
              className="pill-clear"
              aria-label="검색어 지우기"
              onClick={onClearKeyword}
            >
              ×
            </button>
          </div>
        )}
        <button
          type="button"
          className="search-icon"
          aria-label="검색 시트 열기"
          onClick={onOpenKeyword}
          title="키워드 검색"
        >
          <IconSearch width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
