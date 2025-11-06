import React, { useEffect, useId, useRef } from "react";

export type TabKey = "wallet" | "owners" | "vouchers";

type Props = {
  value: TabKey;
  onChange: (key: TabKey) => void;
  /** 탭 순서/레이블 커스터마이즈 가능 */
  items?: { key: TabKey; label: string }[];
  className?: string;
};

const DEFAULT_ITEMS: Props["items"] = [
  { key: "wallet", label: "지갑정보" },
  { key: "owners", label: "보유 사용처" },
  { key: "vouchers", label: "사용 가능 바우처" },
];

export default function TabsSeg({
  value,
  onChange,
  items = DEFAULT_ITEMS!,
  className = "",
}: Props) {
  const listId = useId();
  const refs = useRef<HTMLButtonElement[]>([]);

  // 현재 탭으로 포커스 이동(옵션: 필요 없으면 제거 가능)
  useEffect(() => {
    const i = items.findIndex((it) => it.key === value);
    if (i >= 0) refs.current[i]?.setAttribute("tabindex", "0");
  }, [value, items]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const idx = items.findIndex((it) => it.key === value);
    if (idx < 0) return;

    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;

    if (next !== idx) {
      e.preventDefault();
      onChange(items[next].key);
      refs.current[next]?.focus();
    }
  };

  return (
    <nav
      className={`tabs tabs--seg ${className}`}
      role="tablist"
      aria-label="사업자 하위 메뉴"
      id={listId}
      onKeyDown={onKeyDown}
    >
      {items.map((it, i) => {
        const selected = value === it.key;
        return (
          <button
            key={it.key}
            role="tab"
            aria-selected={selected}
            className={`tab ${selected ? "is-active" : ""}`}
            onClick={() => onChange(it.key)}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            // 로빙 탭인덱스
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}
