// src/components/business/OwnersList.tsx
import React from "react";

export type PlaceItem = { name: string; address: string; phone: string };

interface Props {
  items: PlaceItem[];
  onSelect?: (item: PlaceItem) => void;
}

export default function OwnersList({ items, onSelect }: Props) {
  const onKey = (e: React.KeyboardEvent, item: PlaceItem) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(item);
    }
  };

  return (
    <section className="biz-list" aria-label="사용처 목록">
      {items.map((item, idx) => (
        <article
          key={idx}
          className="biz-card card"
          aria-label={item.name}
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(item)}
          onKeyDown={(e) => onKey(e, item)} 
        >
          <h3 className="biz-card__title">{item.name}</h3>
          <p className="biz-card__addr">{item.address}</p>
          <p className="biz-card__phone">{item.phone}</p>
        </article>
      ))}
    </section>
  );
}
