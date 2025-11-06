import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";

/**
 * BusinessInquiry → 상세로 넘어올 때 넘겨줄 수 있는 형태
 *   nav("/voucher/detail", { state: { name, type, issuer, amount, rule, start, end } })
 */
type VoucherDetailState = {
  name: string; // ex) 서울사랑 바우처
  type: "캐시백" | string; // 배지 표시
  issuer: string; // 발행 기관
  amount: string; // 발행금액 (문자 포맷)
  rule: string; // 사용 조건
  start: string; // 발행일 yyyy-mm-dd
  end: string; // 종료일 yyyy-mm-dd
};

export default function VoucherDetail() {
  const nav = useNavigate();
  const { state } = useLocation() as { state: VoucherDetailState | null };

  // 기본값 (딥링크 등 state 없을 때 대비)
  const data: VoucherDetailState = state || {
    name: "서울사랑 바우처",
    type: "캐시백",
    issuer: "서울시",
    amount: "100,000원",
    rule: "1회 최대 30,000원 캐시백",
    start: "2025-09-22",
    end: "2025-12-31",
  };

  return (
    <div className="mobile-wrap">
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>
        <h1 className="m-title">바우처 상세</h1>
        <span />
      </header>

      <main
        className="m-container voucherDetail"
        role="main"
        aria-labelledby="voucher-title"
      >
        {/* 제목 + 배지 */}
        <section className="vd-head">
          <h2 id="voucher-title" className="vd-title">
            {data.name}
          </h2>
          <span className="badge badge--dark">{data.type}</span>
        </section>

        {/* 상세 Key-Value */}
        <div className="voucher-wrap">
          <div className="vc__row">
            <dt>발행 기관</dt>
            <dd>{data.issuer}</dd>
          </div>
          <div className="vc__row">
            <dt>발행금액</dt>
            <dd>{data.amount}</dd>
          </div>
          <div className="vc__row">
            <dt>사용 조건</dt>
            <dd>{data.rule}</dd>
          </div>
          <div className="vc__row">
            <dt>발행일</dt>
            <dd>{data.start}</dd>
          </div>
          <div className="vc__row">
            <dt>종료일</dt>
            <dd>{data.end}</dd>
          </div>
        </div>
      </main>
    </div>
  );
}
