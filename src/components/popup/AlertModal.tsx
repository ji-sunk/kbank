import React from "react";

type Props = {
  open: boolean;
  title?: string; // 상단 제목(없으면 생략)
  message: React.ReactNode; // 본문
  confirmText?: string; // 기본: "확인"
  onClose: () => void; // 확인/닫기
};
export default function AlertModal({
  open,
  title,
  message,
  confirmText = "확인",
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="sheet-backdrop open" aria-hidden onClick={onClose}>
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "alert-title" : undefined}
        aria-describedby="alert-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="popup-head">
            <h2 id="alert-title" className="popup-title">
              {title}
            </h2>
          </div>
        )}
        <div id="alert-desc" className="popup-body">
          {message}
        </div>
        <div className="popup-actions one">
          <button
            type="button"
            className="action action--secondary"
            onClick={onClose}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
