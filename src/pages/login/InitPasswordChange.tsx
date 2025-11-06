// src/pages/login/InitPasswordChange.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Variant = "idle" | "success" | "error";

export default function InitPasswordChange() {
  const nav = useNavigate();

  // ✅ 숫자만 담는 step
  const [step, setStep] = useState<number>(0);
  // ✅ 메시지/상태 표현용 별도 state
  const [variant, setVariant] = useState<Variant>("idle");
  const [msg, setMsg] = useState<string>("");

  // 폼 상태
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const validate = () => {
    if (!oldPw || !newPw || !confirmPw) {
      setVariant("error");
      setMsg("모든 항목을 입력해 주세요.");
      return false;
    }
    if (newPw.length < 8) {
      setVariant("error");
      setMsg("새 비밀번호는 8자 이상이어야 합니다.");
      return false;
    }
    if (newPw !== confirmPw) {
      setVariant("error");
      setMsg("새 비밀번호와 확인이 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // TODO: 실제 API 연동
      // await api.changeInitPassword({ oldPw, newPw });

      // ⛳️ 여기서 이전 코드가 setStep({ variant: "success" }) 같은 형태였을 가능성 높음.
      //    아래처럼 분리해서 처리하면 타입 에러가 사라집니다.
      setVariant("success");
      setMsg("비밀번호가 변경되었습니다.");
      setStep(1); // 다음 단계로 이동 (예: 완료 화면)
    } catch (err) {
      setVariant("error");
      setMsg("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const goLogin = () => {
    nav("/login");
  };

  // 간단한 UI (프로젝트 스타일에 맞춰 클래스/컴포넌트 교체 가능)
  return (
    <main className="init-password-change" aria-labelledby="page-title">
      <h1 id="page-title" className="sr-only">
        초기 비밀번호 변경
      </h1>

      {step === 0 && (
        <form className="card" onSubmit={onSubmit} noValidate>
          <h2 className="card-title">초기 비밀번호 변경</h2>

          <label className="field">
            <span className="label">현재 비밀번호</span>
            <input
              type="password"
              autoComplete="current-password"
              value={oldPw}
              onChange={(e) => setOldPw(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="label">새 비밀번호</span>
            <input
              type="password"
              autoComplete="new-password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
              minLength={8}
            />
          </label>

          <label className="field">
            <span className="label">새 비밀번호 확인</span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              minLength={8}
            />
          </label>

          {variant !== "idle" && (
            <p
              role={variant === "error" ? "alert" : "status"}
              className={`notice ${variant}`}
            >
              {msg}
            </p>
          )}

          <div className="actions">
            <button type="submit" className="btn primary">
              변경하기
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <section className="card success" aria-live="polite">
          <h2 className="card-title">변경 완료</h2>
          <p>비밀번호가 성공적으로 변경되었습니다.</p>
          <div className="actions">
            <button type="button" className="btn primary" onClick={goLogin}>
              로그인으로 이동
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
