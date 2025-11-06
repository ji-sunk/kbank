import React from "react";

type Variant = "primary" | "secondary" | "tertiary";

type Props = {
  /** 왼쪽 버튼 라벨 */
  leftLabel: string;
  /** 오른쪽 버튼 라벨 */
  rightLabel: string;
  /** 왼쪽 버튼 클릭 */
  onLeft: () => void;
  /** 오른쪽 버튼 클릭 */
  onRight: () => void;
  /** 레이아웃 클래스 (ex. colum1fr1, colum1fr2) */
  columnsClass?: string;
  /** aria-label */
  ariaLabel?: string;
  /** 버튼 비활성화 */
  disabledLeft?: boolean;
  disabledRight?: boolean;
  /** 버튼 스타일 */
  leftVariant?: Variant;   // default: primary
  rightVariant?: Variant;  // default: secondary
};

export default function FooterActions({
  leftLabel,
  rightLabel,
  onLeft,
  onRight,
  columnsClass = "colum1fr1",
  ariaLabel = "하단 액션",
  disabledLeft = false,
  disabledRight = false,
  leftVariant = "primary",
  rightVariant = "secondary",
}: Props) {
  return (
    <footer className={`m-footer-actions ${columnsClass}`} aria-label={ariaLabel}>
      <button
        type="button"
        className={`action action--${leftVariant}`}
        onClick={onLeft}
        disabled={disabledLeft}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        className={`action action--${rightVariant}`}
        onClick={onRight}
        disabled={disabledRight}
      >
        {rightLabel}
      </button>
    </footer>
  );
}
