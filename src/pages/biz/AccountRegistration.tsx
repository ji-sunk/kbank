import React, { useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import { useToast } from "@/components/Toast";
// import IconInfo from "@/components/icons/IconInfo";

type MenuRoleKey = "a" | "b" | "c" | "d";

type Errors = {
  userId?: string[];
  name?: string;
  phone?: string;
  menu?: string;
};

const TAKEN_IDS = useMemo ? [] : []; // TS quiet

export default function AccountRegistration() {
  const nav = useNavigate();
  const { push } = useToast();

  // ids (접근성용)
  const h1Id = useId();
  const userIdId = useId();
  const nameId = useId();
  const deptId = useId();
  const phoneId = useId();
  const approveFsId = useId();

  // form states
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [phone, setPhone] = useState("");
  const [menuRole, setMenuRole] = useState<Record<MenuRoleKey, boolean>>({
    a: false, // 사업자 계정관리
    b: false, // 사업자 전자지갑관리
    c: false, // 사업자 매출관리
    d: false, // 사업자 커뮤니티관리
  });
  const [approveYes, setApproveYes] = useState(false); // 기본 '없음'

  // 에러
  const [errors, setErrors] = useState<Errors>({});

  const onToggleMenu = (k: MenuRoleKey, v: boolean) =>
    setMenuRole((s) => ({ ...s, [k]: v }));

  const onClearUserId = () => setUserId("");

  // 유효성
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const isPhone = (v: string) => /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim()); // 대충 010-1234-5678

  const validate = (): boolean => {
    const next: Errors = {};

    // UserID
    const idErrs: string[] = [];
    if (!userId.trim()) {
      idErrs.push("아이디를 입력해주세요.");
    } else {
      if (!isEmail(userId))
        idErrs.push("User ID는 이메일 형식으로 입력해주세요.");
      // 사용 불가 아이디(데모)
      const taken = ["test@naver.com", "admin@example.com"];
      if (taken.includes(userId.trim()))
        idErrs.push("사용할 수 없는 아이디입니다.");
    }
    if (idErrs.length) next.userId = idErrs;

    // 이름
    if (!name.trim() || name.trim().length < 2) {
      next.name = "이름을 두 글자 이상 입력해주세요.";
    }

    // 전화번호
    if (!phone.trim()) {
      next.phone = "휴대폰 번호를 입력해주세요.";
    } else if (!isPhone(phone)) {
      next.phone = "휴대폰 번호 형식을 확인해주세요.";
    }

    // 메뉴권한
    const anyMenu = Object.values(menuRole).some(Boolean);
    if (!anyMenu) {
      next.menu = "메뉴 권한을 선택해주세요.";
    }

    setErrors(next);

    // 토스트도 오류별로 안내
    if (next.userId?.length) push("User ID를 다시 확인해주세요.");
    if (next.name) push("이름을 두 글자 이상 입력해주세요.");
    if (next.phone) push("휴대폰 번호를 입력해주세요.");
    if (next.menu) push("메뉴 권한을 선택해주세요.");

    return Object.keys(next).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // 실제 API 연동 자리
    push("계정 등록 요청을 보냈습니다.");
    nav(-1);
  };

  return (
    <div className="mobile-wrap reg-page">
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>
        <h1 id={h1Id} className="m-title">
          계정 등록
        </h1>
        <div />
      </header>

      <main className="m-container" role="main" aria-labelledby={h1Id}>
        <form className="reg-form" onSubmit={onSubmit} noValidate>
          {/* User ID */}
          <div className={`fset ${errors.userId ? "is-error" : ""}`}>
            <label htmlFor={userIdId} className="fset__label">
              User ID <span className="sub">(이메일 형식)</span>
            </label>
            <div className="input-wrap">
              <input
                id={userIdId}
                type="email"
                inputMode="email"
                placeholder="User ID (이메일 형식)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="input"
                aria-invalid={!!errors.userId}
              />
              {userId && (
                <button
                  type="button"
                  className="clear-btn"
                  aria-label="입력 지우기"
                  onClick={onClearUserId}
                >
                  ×
                </button>
              )}
            </div>

            {/* 여러 개 에러 메시지 가능 */}
            {errors.userId && (
              <ul className="fset__errors" role="alert">
                {errors.userId.map((m, i) => (
                  <li key={i}>ⓘ {m}</li>
                ))}
              </ul>
            )}
          </div>

          {/* 이름 */}
          <div className={`fset ${errors.name ? "is-error" : ""}`}>
            <label htmlFor={nameId} className="fset__label">
              이름
            </label>
            <input
              id={nameId}
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="fset__error" role="alert">
                ⓘ{/* <IconInfo></IconInfo> */}
                {errors.name}
              </p>
            )}
          </div>

          {/* 소속/부서 (선택) */}
          <div className="fset">
            <label htmlFor={deptId} className="fset__label">
              소속/부서 <span className="sub">(선택)</span>
            </label>
            <input
              id={deptId}
              type="text"
              placeholder="소속/부서 입력"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="input"
            />
          </div>

          {/* 휴대폰 번호 */}
          <div className={`fset ${errors.phone ? "is-error" : ""}`}>
            <label htmlFor={phoneId} className="fset__label">
              휴대폰 번호
            </label>
            <input
              id={phoneId}
              type="tel"
              inputMode="numeric"
              placeholder="숫자 또는 - 없이 번호 입력"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="fset__error" role="alert">
                ⓘ {errors.phone}
              </p>
            )}
          </div>

          {/* 계정 유형 (disabled) */}
          <div className="fset">
            <span className="fset__label">계정 유형</span>
            <input
              type="text"
              className="input input--readonly"
              value="사용자"
              readOnly
              aria-readonly="true"
            />
          </div>

          {/* 메뉴 권한 */}
          <div className={`fset ${errors.menu ? "is-error" : ""}`}>
            <span className="fset__label">메뉴 권한</span>
            <div className="chk-items">
              <label className="chk">
                <input
                  type="checkbox"
                  aria-checked="true"
                  checked={menuRole.a}
                  onChange={(e) => onToggleMenu("a", e.target.checked)}
                />
                <span>사업자 계정관리</span>
              </label>
              <label className="chk">
                <input
                  type="checkbox"
                  aria-checked="true"
                  disabled
                  checked={menuRole.b}
                  onChange={(e) => onToggleMenu("b", e.target.checked)}
                />
                <span>사업자 전자지갑관리</span>
              </label>
              <label className="chk">
                <input
                  type="checkbox"
                  disabled
                  checked={menuRole.c}
                  onChange={(e) => onToggleMenu("c", e.target.checked)}
                />
                <span>사업자 매출관리</span>
              </label>
              <label className="chk">
                <input
                  type="checkbox"
                  checked={menuRole.d}
                  onChange={(e) => onToggleMenu("d", e.target.checked)}
                />
                <span>사업자 커뮤니티관리</span>
              </label>
            </div>
            {errors.menu && (
              <p className="fset__error" role="alert">
                ⓘ {errors.menu}
              </p>
            )}
          </div>

          {/* 승인 권한 */}
          <div className="fset">
            <span className="fset__label">승인 권한</span>
            <fieldset className="radio-fieldset" aria-describedby={approveFsId}>
              <legend id={approveFsId} className="sr-only">
                승인 권한 선택
              </legend>
              <label className="radio">
                <input
                  type="radio"
                  name="approve"
                  value="yes"
                  disabled
                  checked={approveYes}
                  onChange={() => setApproveYes(true)}
                />
                <span>있음</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="approve"
                  value="no"
                  checked={!approveYes}
                  onChange={() => setApproveYes(false)}
                />
                <span>없음</span>
              </label>
            </fieldset>
          </div>

          {/* 하단 버튼 */}
          <footer className="m-footer-actions">
            <button type="submit" className="action action--save">
              계정 등록 요청하기
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}
