import React, { PropsWithChildren } from "react";
import IconArrow from "@/assets/images/icon-arrow.svg?react";

type Props = {
  open: boolean;
  onToggle: () => void;
};

export default function BusinessDetail({ open, onToggle, children }: PropsWithChildren<Props>) {
  return (
    <section className="biz-detail">
      <button
        type="button"
        className="biz-detail__toggle"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>사업자 상세정보</span>
        <IconArrow className={`chev ${open ? "open" : ""}`} aria-hidden="true" />
      </button>

      <div className={`biz-detail__panel ${open ? "open" : ""}`}>
        {children}
      </div>
    </section>
  );
}
