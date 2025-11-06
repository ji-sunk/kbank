import React, { useState, useMemo } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  /** 검색 실행 콜백 (선택) */
  onSearch?: (params: {
    type: string;
    typeIndex: number;
    keyword: string;
  }) => void;
};

const chipOptions = ["전체", "User ID", "이름", "소속/부서"];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`chip ${active ? "on" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function SearchKeywordSheet({ open, onClose, onSearch }: Props) {
  const [typeIdx, setTypeIdx] = useState(0);
  const [keyword, setKeyword] = useState("");

  const selectedType = useMemo(
    () => chipOptions[typeIdx] ?? chipOptions[0],
    [typeIdx]
  );

  const reset = () => {
    setTypeIdx(0);
    setKeyword("");
  };

  const runSearch = () => {
    const payload = {
      type: selectedType,
      typeIndex: typeIdx,
      keyword: keyword.trim(),
    };
    onSearch?.(payload);
    onClose();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  };

  return (
    <div className={`sheet ${open ? "open" : ""}`} role="dialog" aria-modal>
      {/* Header */}
      <div className="sheet-header">
        <h2 className="sheet-title">검색조건 설정</h2>
        <button
          aria-label="닫기"
          onClick={onClose}
          className="close"
          type="button"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="sheet-body keyword-sheet">
        {/* 구분 */}
        <section className="ks-section">
          <p className="sub-tit">구분</p>
          <div className="chip-row" role="tablist" aria-label="검색 구분">
            {chipOptions.map((label, i) => (
              <Chip
                key={label}
                label={label}
                active={typeIdx === i}
                onClick={() => setTypeIdx(i)}
              />
            ))}
          </div>
        </section>

        {/* 검색어 */}
        <section className="ks-section">
          <p className="sub-tit">검색어</p>
          <div className="search-field" aria-label="검색어 입력">
            <div className="search-input">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="검색어를 입력하세요."
                aria-label="검색어"
              />
              <button
                type="button"
                className="search-btn"
                aria-label="검색"
                onClick={runSearch}
                disabled={!keyword.trim()}
              >
                {/* Search Icon (inline SVG) */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M21 21l-4.2-4.2m1.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="m-footer-actions colum1fr2"
        aria-label="검색조건 설정 및 초기화"
      >
        <button className="btn--tertiary" type="button" onClick={reset}>
          초기화
        </button>
        <button
          className="btn--secondary"
          type="button"
          onClick={runSearch}
          disabled={!keyword.trim()}
        >
          검색
        </button>
      </footer>
    </div>
  );
}
