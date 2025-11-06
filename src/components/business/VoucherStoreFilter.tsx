import React from "react";
import IconArrow from "@/assets/images/icon-arrow.svg?react";

type Props = {
  open: boolean;
  storeLabel: string;
  onOpen: () => void;
};

export default function VoucherStoreFilter({
  open,
  storeLabel,
  onOpen,
}: Props) {
  return (
    <div className="sheetbar">
      <button
        type="button"
        className="combo"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onOpen}
      >
        <span className="combo__value">{storeLabel}</span>
        <IconArrow className="combo__arrow" aria-hidden="true" />
      </button>
    </div>
  );
}
