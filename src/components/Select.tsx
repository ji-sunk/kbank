import React, { useEffect, useId, useRef, useState } from "react";
import IconArrow from "@/assets/images/icon-arrow.svg?react";
// import "./select.scss";

export type Option = { label: string; value: string };

interface SelectProps {
  label?: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  id?: string;
}

export default function Select({
  label,
  value,
  options,
  placeholder = "선택",
  onChange,
  disabled,
  id,
}: SelectProps) {
  const uid = useId();
  const inputId = id ?? `select-${uid}`;
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState<string | undefined>(value);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setInner(value), [value]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = options.find((o) => o.value === inner);

  return (
    <div className={`ui-select ${disabled ? "is-disabled" : ""}`} ref={boxRef}>
      {label && (
        <label htmlFor={inputId} className="ui-select__label">
          {label}
        </label>
      )}
      <button
        id={inputId}
        type="button"
        className={`ui-select__control ${open ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
      >
        <span className={`ui-select__value ${current ? "" : "is-placeholder"}`}>
          {current ? current.label : placeholder}
        </span>
        <IconArrow className="ui-select__arrow" aria-hidden="true" />
        {/* <span className="ui-select__arrow" aria-hidden>
          ▾ 
        </span> */}
      </button>

      <ul
        role="listbox"
        className={`ui-select__menu ${open ? "is-open" : ""}`}
        aria-label={label ?? "옵션 선택"}
      >
        {options.map((o) => (
          <li
            role="option"
            key={o.value}
            aria-selected={o.value === inner}
            className={`ui-select__option ${
              o.value === inner ? "is-active" : ""
            }`}
            onClick={() => {
              setInner(o.value);
              onChange?.(o.value);
              setOpen(false);
            }}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
