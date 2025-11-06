import React from "react";
import { IconCopy } from "./Icons";
import { useToast } from "@/components/Toast";

export type InfoRow = {
  label: string;
  value: string;
  copy?: boolean;
  copyText?: string;
  onCopy?: () => void;
};

export function InfoList({ rows }: { rows: InfoRow[] }) {
  const { push } = useToast();

  const handleCopy = async (row: InfoRow) => {
    try {
      if (row.onCopy) {
        row.onCopy();
        return;
    }
      const text = row.copyText ?? row.value;
      await navigator.clipboard.writeText(text);
      push(`${row.label}가 복사되었습니다.`);
    } catch {
      push("복사 실패", 2200);
    }
  };

  return (
    <div className="rows">
      {rows.map((r, i) => (
        <div className="row" key={i}>
          <div className="row-label">{r.label}</div>
          <div className={`row-value ${r.copy ? "has-copy" : ""}`}>
            <div className="value-text">{r.value}</div>
            {r.copy && (
              <button
                className="copy-btn"
                onClick={() => handleCopy(r)}
                aria-label={`${r.label} 복사`}
              >
                <IconCopy />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
