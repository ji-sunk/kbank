// src/components/business/VouchersList.tsx
import React from "react";

export type VoucherItem = {
  name: string;
  until: string;
  type: string;               // "캐시백" 등
  status: "active" | "expired";
};

interface Props {
  items: VoucherItem[];
  onSelect?: (item: VoucherItem) => void; 
}

export default function VouchersList({ items, onSelect }: Props) {
  const onKey = (e: React.KeyboardEvent, item: VoucherItem) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(item);
    }
  };

  return (
    <section className="voucher-list">
      {items.map((v, idx) => (
        <article
          key={idx}
          className={`voucher-card card ${v.status === "expired" ? "is-expired" : ""}`}
          aria-label={v.name}
          role="button" tabIndex={0}
          onClick={() => onSelect?.(v)}  
          onKeyDown={(e) => onKey(e, v)}    
        >
          <div className="voucher-card__head">
            <h3 className="voucher-card__title">{v.name}</h3>
            <span className={`badge ${v.status === "expired" ? "badge--muted" : "badge--dark"}`}>
              {v.type}
            </span>
          </div>
          <p className="voucher-card__until">{v.until}</p>
        </article>
      ))}
    </section>
  );
}
