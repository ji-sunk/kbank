import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/Toast";
import FooterActions from "@/components/FooterActions";

export default function TwoFactorOtp() {
  const nav = useNavigate();
  const { push } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(onlyDigits);
    if (error) setError(null);
  };

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    e.preventDefault();
    setOtp(text);
    if (error) setError(null);
  };

  const invalidate = (msg: string) => {
    setError(msg);
    push(msg); // 토스트도 같이 노출
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // 서버 검증 전, 6자리 형식만 선체크
    if (otp.length !== 6) {
      invalidate("OTP 번호가 일치 하지 않습니다.");
      return;
    }

    // TODO: 서버 검증 성공 시 라우팅
    console.log("OTP 확인:", otp);
    // nav("/next");
  };

  return (
    <div className="otp-wrap" role="main" aria-labelledby="otpTitle">
      <section className="otp-area" aria-label="이중 인증">
        <h1 id="otpTitle" className="otp-title">
          이중 인증
        </h1>

        <form ref={formRef} className="otp-form" onSubmit={onSubmit} noValidate>
          <div className={`otp-field ${error ? "is-error" : ""}`}>
            <label htmlFor="otpInput" className="otp-label sr-only">
              OTP 번호 입력
            </label>

            <input
              id="otpInput"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="OTP 번호 입력"
              value={otp}
              onChange={onChange}
              onPaste={onPaste}
              aria-label="6자리 OTP 번호 입력"
              aria-invalid={!!error}
              aria-describedby={error ? "otpErr" : "otpHelp"}
              autoFocus
            />

            {!error && (
              <p id="otpHelp" className="otp-help">
                * 앱에 표시되는 6자리 번호를 입력해주세요.
              </p>
            )}
            {error && (
              <p id="otpErr" className="otp-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </section>

      {/* footer */}
      <FooterActions
        ariaLabel="이중 인증 확인"
        columnsClass="colum1fr1"
        leftLabel="이전"
        rightLabel="확인"
        leftVariant="primary"
        rightVariant="secondary"
        onLeft={() => nav(-1)}
        onRight={() => {
          // 푸터 '확인'에서 form submit 트리거
          formRef.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
      />
    </div>
  );
}
