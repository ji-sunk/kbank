// src/pages/UsagePlaceDetail.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import { IconCopy } from "@/components/Icons";

export default function UsagePlaceDetail() {
  const nav = useNavigate();

  return (
    <div className="mobile-wrap usageDetail">
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>
        <h1 className="m-title">사용처 상세</h1>
        <span />
      </header>

      <main className="m-container" role="main" aria-label="사용처 상세정보">
        <section aria-labelledby="title-detail">
          <h2 id="title-detail" className="m-section-title">
            사용처 상세정보
          </h2>

          <dl className="kv">
            <div className="kv__row">
              <dt>사용처 명</dt>
              <dd>amart</dd>
            </div>

            <div className="kv__row">
              <dt>대표자 이름</dt>
              <dd>amart</dd>
            </div>

            <div className="kv__row">
              <dt>등록일시/상태</dt>
              <dd>2025-09-11 / 사용중</dd>
            </div>

            <div className="kv__row">
              <dt>사업자구분</dt>
              <dd>법인</dd>
            </div>

            <div className="kv__row">
              <dt>사업자등록번호</dt>
              <dd>1231251213</dd>
            </div>

            <div className="kv__row">
              <dt>사용처 코드</dt>
              <dd>011000</dd>
            </div>

            <div className="kv__row">
              <dt>사용처 소재지</dt>
              <dd>서울특별시</dd>
            </div>

            <div className="kv__row">
              <dt>사용처 연락처</dt>
              <dd>01012345678</dd>
            </div>

            <div className="kv__row">
              <dt>담당자 연락처</dt>
              <dd>01012345678</dd>
            </div>

            <div className="kv__row">
              <dt>대표자 이메일</dt>
              <dd>ksm9781@partner.co.kr</dd>
            </div>

            <div className="kv__row">
              <dt>관리자 이름</dt>
              <dd>에이마트</dd>
            </div>

            <div className="kv__row">
              <dt>PlaceId</dt>
              <dd className="token-cell">
                <span className="mono">903XYH952C4F1DAFA0</span>
                <button
                  type="button"
                  className="copy-btn"
                  aria-label="PlaceId 복사"
                  onClick={() =>
                    navigator.clipboard.writeText("903XYH952C4F1DAFA0")
                  }
                >
                  <IconCopy width={20} height={20} />
                </button>
              </dd>
            </div>

            {/* 이용동의 */}
            <div className="kv__row fset">
              <dt>이용동의</dt>
              <dd className="radio-row">
                <fieldset
                  className="radio-fieldset"
                  aria-describedby="agreeUseFs"
                >
                  <legend id="agreeUseFs" className="sr-only">
                    이용동의 선택
                  </legend>
                  <label className="radio">
                    <input
                      type="radio"
                      name="agreeUse"
                      value="yes"
                      defaultChecked
                    />
                    <span>동의</span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="agreeUse" value="no" />
                    <span>비동의</span>
                  </label>
                </fieldset>
              </dd>
            </div>

            {/* 약관동의 */}
            <div className="kv__row fset">
              <dt>약관동의</dt>
              <dd className="radio-row">
                <fieldset
                  className="radio-fieldset"
                  aria-describedby="agreeTosFs"
                >
                  <legend id="agreeTosFs" className="sr-only">
                    약관동의 선택
                  </legend>
                  <label className="radio">
                    <input
                      type="radio"
                      name="agreeTos"
                      value="yes"
                      defaultChecked
                    />
                    <span>동의</span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="agreeTos" value="no" />
                    <span>비동의</span>
                  </label>
                </fieldset>
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}
