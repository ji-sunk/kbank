import React, { useEffect, useMemo, useRef, useState } from "react";

type UsageOption = { id: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  options: UsageOption[]; // 사용처 목록
  value?: string | null; // 선택된 id
  onChange?: (id: string) => void; // 선택 콜백
  title?: string; // 시트 타이틀
  description?: string; // 시트 설명
};

export default function UsageSelectSheet({
  open,
  onClose,
  options,
  value = null,
  onChange,
  title = "사용처 선택",
  description = "조회하실 사용처명을 선택해 주세요.",
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  // 포커스 이동용 인덱스(선택값 기준 초기화)
  const initialIndex = Math.max(
    0,
    options.findIndex((o) => o.id === value)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) {
      // 열릴 때 포커스 첫 항목으로
      setActiveIndex(initialIndex);
      // 살짝 딜레이 후 포커스(마운트 안정화)
      const t = setTimeout(() => {
        listRef.current
          ?.querySelector<HTMLButtonElement>('[tabindex="0"]')
          ?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [open, initialIndex]);

  const onSelect = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    onChange?.(opt.id);
    onClose();
  };

  const onKeyDownList: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((p) => (p + 1) % options.length);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((p) => (p - 1 + options.length) % options.length);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(activeIndex);
      return;
    }
  };

  // 로빙 탭인덱스: activeIndex인 항목만 tabIndex=0
  const items = useMemo(
    () =>
      options.map((opt, i) => ({
        ...opt,
        isActive: i === activeIndex,
        isSelected: opt.id === value,
      })),
    [options, activeIndex, value]
  );

  return (
    <div
      className={`sheet ${open ? "open" : ""}`}
      role="dialog"
      aria-modal
      aria-labelledby="usage-sheet-title"
    >
      {/* Header */}
      <div className="sheet-header">
        <div className="sheet-title" id="usage-sheet-title">
          {title}
        </div>
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
      <div className="sheet-body usage-sheet" onKeyDown={onKeyDownList}>
        {description && <p className="usage-desc">{description}</p>}

        <div
          ref={listRef}
          role="listbox"
          aria-label="사용처 목록"
          className="usage-list"
        >
          {items.map((it, i) => (
            <button
              key={it.id}
              role="option"
              aria-selected={it.isSelected}
              tabIndex={it.isActive ? 0 : -1}
              className={`usage-item ${it.isSelected ? "is-selected" : ""}`}
              onClick={() => onSelect(i)}
              onFocus={() => setActiveIndex(i)}
              type="button"
            >
              <span className="usage-label">{it.label}</span>

              {/* 체크 아이콘 */}
              <span className="usage-check" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M20 6L9 17l-5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

