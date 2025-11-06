import React, { useState } from "react";
import { useToast } from "@/components/Toast";

export default function InitPasswordChange() {
  const { push } = useToast();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  type Err = { currentPw?: string; newPw?: string; confirmPw?: string };
  const [errors, setErrors] = useState<Err>({});

  // 8~16, 대/소문자+숫자+특수문자 각 1개 이상
  const policy =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,16}$/;

  const validate = (): boolean => {
    const next: Err = {};
    if (!currentPw) next.currentPw = "기존 비밀번호를 입력해주세요.";
    if (!newPw) next.newPw = "신규 비밀번호를 입력해주세요.";
    if (!confirmPw) next.confirmPw = "신규 비밀번호를 다시 한번 입력해주세요.";

    if (newPw && !policy.test(newPw)) {
      next.newPw =
        "비밀번호 양식은 영문 대소문자, 숫자, 특수문자 포함 8-16자 입니다.";
    }
    if (newPw && confirmPw && newPw !== confirmPw) {
      next.confirmPw = "신규 비밀번호가 일치하지 않습니다.";
    }

    setErrors(next);

    // 토스트(에러 컬러는 토스트 컴포넌트에서 variant='error'로 스타일 적용)
    const firstErr =
      next.currentPw || next.newPw || next.confirmPw || undefined;
    if (firstErr) push(firstErr, { variant: "error" });

    return Object.keys(next).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: API 연동
    push("비밀번호 변경이 완료되었습니다.");
  };

  return (
    <div className="auth-wrap" role="main" aria-labelledby="pwChangeTitle">
      <section className="auth-area" aria-label="초기 비밀번호 변경">
        <h1 id="pwChangeTitle" className="auth-title">
          초기 비밀번호 변경
        </h1>
        <p className="auth-sub">
          초기화된 비밀번호를 변경해주세요.
          <br />
          변경하지 않을 경우 시스템 접근이 제한됩니다.
        </p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {/* 현재 비밀번호 */}
          <div className={`form-field ${errors.currentPw ? "is-error" : ""}`}>
            <label htmlFor="currPw" className="field-label">
              현재 비밀번호
            </label>
            <input
              id="currPw"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              autoComplete="current-password"
              aria-invalid={!!errors.currentPw}
              aria-describedby={errors.currentPw ? "errCurrPw" : undefined}
            />
            {errors.currentPw && (
              <p id="errCurrPw" className="err-text" role="alert">
                ⓘ {errors.currentPw}
              </p>
            )}
          </div>

          {/* 신규 비밀번호 */}
          <div className={`form-field ${errors.newPw ? "is-error" : ""}`}>
            <label htmlFor="newPw" className="field-label">
              신규 비밀번호
            </label>
            <input
              id="newPw"
              type="password"
              placeholder="신규 비밀번호를 입력해주세요."
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              autoComplete="new-password"
              aria-invalid={!!errors.newPw}
              aria-describedby={errors.newPw ? "errNewPw" : undefined}
            />
            {errors.newPw && (
              <p id="errNewPw" className="err-text" role="alert">
                ⓘ {errors.newPw}
              </p>
            )}
          </div>

          {/* 신규 비밀번호 확인 */}
          <div className={`form-field ${errors.confirmPw ? "is-error" : ""}`}>
            <label htmlFor="confirmPw" className="field-label">
              신규 비밀번호 확인
            </label>
            <input
              id="confirmPw"
              type="password"
              placeholder="입력한 비밀번호를 입력해주세요."
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPw}
              aria-describedby={errors.confirmPw ? "errConfirmPw" : undefined}
            />
            {errors.confirmPw && (
              <p id="errConfirmPw" className="err-text" role="alert">
                ⓘ {errors.confirmPw}
              </p>
            )}
          </div>

          {/* 액션 (푸터 버튼 톤과 맞춤) */}
          <div className="auth-actions" role="group" aria-label="변경 버튼">
            <button type="submit" className="auth-btn auth-btn--dark">
              비밀번호 변경
            </button>
          </div>

          {/* 안내문 */}
          <p className="auth-hint" aria-live="polite">
            ✓ 비밀번호는 영문 대소문자, 숫자, 특수문자를 조합하여 8-16자로
            설정해 주시기 바랍니다.
          </p>
        </form>
      </section>
    </div>
  );
}
