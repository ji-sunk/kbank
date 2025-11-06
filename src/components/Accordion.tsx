import React, { useState } from "react";
import IconArrow from "@/assets/images/icon-arrow.svg?react";

// 문자열 또는 객체 형태 모두 허용
type MenuItem = string | { label: string; updated?: boolean };

interface Section {
  title: string;
  items: MenuItem[];
}

export default function Accordion({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpen((prev) => (prev === idx ? null : idx));
  };

  // 아이템 유틸: 문자열이면 라벨로 변환
  const normalize = (it: MenuItem) =>
    typeof it === "string" ? { label: it, updated: false } : it;

  return (
    <div>
      {sections.map((sec, i) => {
        const isOpen = open === i;
        const headerId = `acc-header-${i}`;
        const panelId = `acc-panel-${i}`;

        return (
          <section
            key={i}
            className="acc-section"
            aria-labelledby={headerId}
            aria-expanded={isOpen}
          >
            {/* 헤더 전체가 버튼 역할 */}
            <button
              id={headerId}
              className="acc-header"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span className="acc-title">{sec.title}</span>
              <IconArrow
                className={`acc-arrow ${isOpen ? "open" : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`acc-list ${isOpen ? "open" : ""}`}
            >
              {sec.items.map((raw, idx) => {
                const { label, updated } = normalize(raw);
                return (
                  <div key={`${label}-${idx}`} className="acc-item">
                    <span className="menu-label">{label}</span>
                    {updated && (
                      <span
                        className="badge-dot"
                        aria-label="새 항목 있음"
                        title="새 항목 있음"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
