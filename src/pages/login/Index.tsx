import React, { useState } from "react";
import { useToast } from "@/components/Toast";
// Vite/webpack에서 이미지 URL로 번들되도록 ?url 사용
import logoAbankUrl from "@/assets/images/logo-Abank.svg?url";

export default function LoginPage() {
  const { push } = useToast();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errors, setErrors] = useState<{ id?: string; pw?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!id) next.id = "ⓘ 아이디를 입력해주세요.";
    if (!pw) next.pw = "ⓘ 비밀번호를 입력해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      push("ID와 비밀번호를 입력해주세요.");
      return;
    }
    console.log("로그인 요청:", { id, pw });
  };

  const onClearUserId = () => setId("");

  return (
    <div className="login-wrap" role="main" aria-labelledby="loginTitle">
      <section className="login-card" aria-label="로그인 영역">
        <div className="logo-wrap">
          <h1 id="loginTitle" className="login-title">
            <img src={logoAbankUrl} alt="A은행 로고" className="login-logo" />
            <span className="bank-name">A은행</span>
          </h1>
          <span className="system-name">비즈 업무시스템</span>
        </div>

        <form className="login-form" onSubmit={onSubmit} noValidate>
          {/* 아이디 (플로팅 라벨) */}
          <div className={`form-field ${errors.id ? "error" : ""}`}>
            <div className={`input-wrap float ${id ? "has-value" : ""}`}>
              <input
                id="userId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                aria-invalid={!!errors.id}
                aria-describedby={errors.id ? "errId" : undefined}
                // placeholder는 플로팅 라벨과 충돌을 피하기 위해 비워둡니다.
                placeholder=""
              />
              <label htmlFor="userId" className="float-label">
                아이디를 입력해주세요.
              </label>

              {id && (
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

            {errors.id && (
              <p id="errId" className="err-text" role="alert">
                {errors.id}
              </p>
            )}
          </div>

          {/* 비밀번호 (플로팅 라벨) */}
          <div className={`form-field ${errors.pw ? "error" : ""}`}>
            <div className={`input-wrap float ${pw ? "has-value" : ""}`}>
              <input
                id="userPw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                aria-invalid={!!errors.pw}
                aria-describedby={errors.pw ? "errPw" : undefined}
                placeholder=""
              />
              <label htmlFor="userPw" className="float-label">
                비밀번호를 입력해주세요.
              </label>
            </div>

            {errors.pw && (
              <p id="errPw" className="err-text" role="alert">
                {errors.pw}
              </p>
            )}
          </div>

          <div className="form-util">
            <label className="chk-save">
              <input type="checkbox" /> 아이디 저장
            </label>
          </div>

          <button type="submit" className="btn-login">
            로그인
          </button>

          <div className="login-links">
            <a href="#">아이디찾기</a>
            <span className="bar" aria-hidden="true">
              |
            </span>
            <a href="#">비밀번호찾기</a>
          </div>
        </form>
      </section>
    </div>
  );
}
