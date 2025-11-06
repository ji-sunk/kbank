import React from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import IconBank from "@/assets/images/icon-bank-logo.svg?react";
import { IconCopy } from "@/components/Icons";

export default function WalletInfo() {
  const nav = useNavigate();

  const bankLabel = "신한 123-456-789-0";
  const totalToken = 1584710; // 총 보유 예금 토큰 (예시)
  const linkAccount = "123456789123";
  const accountBalance = "999,998,000,000 원";
  const walletStatus = "사용";
  const simpleAddr = "390101100011892690";
  const walletRemain = "2,149,500 원";
  const walletAddr = "0xb02aC559...2Fa04";

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="mobile-wrap walletInfo">
      {/* Header */}
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>
        <h1 className="m-title">전자지갑정보</h1>
        <span />
      </header>

      {/* Body */}
      <main className="m-container" role="main" aria-labelledby="walletTitle">
        {/* 상단 요약 카드 */}
        <section className="wallet-summary" aria-label="지갑 요약">
          <div className="wallet-summary__top">
            {/* 은행/계좌명 */}
            <div className="wallet-summary__bank">
              {/* 은행 아이콘 */}
              <IconBank width={16} height={16} />
              <span className="bank-mark" aria-hidden="true">
              </span>
              <span className="bank-name">{bankLabel}</span>
              <button
                type="button"
                className="copy-btn"
                aria-label="계좌번호 복사"
                onClick={() => copy(bankLabel)}
                title="복사"
              >
                <IconCopy />
              </button>
            </div>
          </div>

          <div className="wallet-summary__bottom" aria-live="polite">
            <div className="caption">총 보유 예금 토큰</div>
            <div className="total">
              {totalToken.toLocaleString()} <span className="unit">원</span>
            </div>
          </div>
        </section>

        {/* 상세 표 */}
        <h2 id="walletTitle" className="m-section-title">
          계좌/지갑 정보
        </h2>
        <dl className="kv" aria-labelledby="walletTitle">
          <div className="kv__row">
            <dt>연동계좌</dt>
            <dd className="token-cell">
              <span className="mono">{linkAccount}</span>
              <button
                type="button"
                className="copy-btn"
                aria-label="연동계좌 복사"
                onClick={() => copy(linkAccount)}
              >
                <IconCopy />
              </button>
            </dd>
          </div>

          <div className="kv__row">
            <dt>계좌잔액</dt>
            <dd>{accountBalance}</dd>
          </div>

          <div className="kv__row">
            <dt>상태</dt>
            <dd>{walletStatus}</dd>
          </div>

          <div className="kv__row">
            <dt>간편주소</dt>
            <dd className="token-cell">
              <span className="mono">{simpleAddr}</span>
              <button
                type="button"
                className="copy-btn"
                aria-label="간편주소 복사"
                onClick={() => copy(simpleAddr)}
              >
                <IconCopy />
              </button>
            </dd>
          </div>

          <div className="kv__row">
            <dt>잔액</dt>
            <dd>{walletRemain}</dd>
          </div>

          <div className="kv__row">
            <dt>지갑주소</dt>
            <dd className="token-cell">
              <span className="mono">{walletAddr}</span>
              <button
                type="button"
                className="copy-btn"
                aria-label="지갑주소 복사"
                onClick={() => copy(walletAddr)}
              >
                <IconCopy />
              </button>
            </dd>
          </div>
        </dl>
      </main>
    </div>
  );
}
