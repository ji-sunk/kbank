import React, { useMemo, useState, useEffect } from "react";
import { IconCopy } from "@/components/Icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import TabsSeg, { TabKey } from "@/components/TabsSeg";
import Pager from "@/components/Pager";
import UsageSelectSheet from "@/components/popup/sheet/UsageSelectSheet";

// 분리된 컴포넌트
import BusinessDetail from "@/components/business/BusinessDetail";
import OwnersList, { PlaceItem } from "@/components/business/OwnersList";
import VouchersList, { VoucherItem } from "@/components/business/VouchersList";
import VoucherStoreFilter from "@/components/business/VoucherStoreFilter";

const MOCK_OWNERS: PlaceItem[] = [
  {
    name: "사용처명",
    address: "울산 중구 반구정4길 62",
    phone: "010-1234-5678",
  },
  {
    name: "사용처명",
    address: "서울 중구 수표로 40-1",
    phone: "010-1234-5678",
  },
  {
    name: "사용처명",
    address: "울산 북구 호계로 216-1 1층 신세계분식",
    phone: "010-1234-5678",
  },
  { name: "사용처명", address: "부산 중구 부평1길 40", phone: "010-1234-5678" },
];

const MOCK_VOUCHERS: VoucherItem[] = [
  {
    name: "서울사랑 바우처",
    until: "2025.12.31 까지 사용 가능",
    type: "캐시백",
    status: "active",
  },
  {
    name: "영등포구 바우처",
    until: "2025.12.31 까지 사용 가능",
    type: "캐시백",
    status: "active",
  },
  {
    name: "바우처명",
    until: "2025.08.31 까지 사용 가능 (기한 만료)",
    type: "캐시백",
    status: "expired",
  },
];

export default function BusinessInquiryPage() {
  const nav = useNavigate();

  // URL ?tab=owners|wallet|vouchers 동기화 (없으면 owners)
  const [params, setParams] = useSearchParams();
  const paramTab = params.get("tab") as TabKey | null;
  const [tab, setTab] = useState<TabKey>(paramTab ?? "owners");

  // params 반영 (값이 바뀔 때만 갱신)
  useEffect(() => {
    const current = params.get("tab");
    if (current !== tab) {
      const next = new URLSearchParams(params);
      next.set("tab", tab);
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const [openDetail, setOpenDetail] = useState(true);

  // 페이지네이션 더미
  const [page, setPage] = useState<number>(2);
  const totalCount = 19;
  const totalPages = 3;

  // 바우처 매장 선택 시트
  const [usageOpen, setUsageOpen] = useState(false);
  const usageOptions = useMemo(
    () => [
      { id: "yongdeungpo", label: "amart 영등포구청점" },
      { id: "jongno", label: "amart 종로점" },
      { id: "myeongdong", label: "amart 명동점" },
    ],
    []
  );
  const [store, setStore] = useState("amart 영등포구청점");

  // --- 추가: 콜백들 정의 ---
  const handleTabChange = (key: TabKey) => setTab(key);

  const handleUsageChange = (id: string) => {
    const label = usageOptions.find((o) => o.id === id)?.label;
    if (label) setStore(label);
  };
  // 바우처 선택 → 상세 페이지로 이동
  const handleVoucherSelect = (v: VoucherItem) => {
    nav("/biz/voucher/detail", {
      state: {
        name: v.name,
        type: v.type, // "캐시백"
        issuer: "서울시", // 데모 값 (API 연동 시 치환)
        amount: "100,000원",
        rule: "1회 최대 30,000원 캐시백",
        start: "2025-09-22",
        end: "2025-12-31",
      },
    });
  };

  return (
    <div className="mobile-wrap">
      <header className="m-header">
        <button
          className="icon-btn"
          onClick={() => nav(-1)}
          aria-label="뒤로가기"
        >
          <IconBack />
        </button>
        <h1 className="m-title">사업자 조회</h1>
        <span />
      </header>

      <main className="m-container BusinessInquiry">
        {/* 상단 접힘 상세정보 */}
        <BusinessDetail
          open={openDetail}
          onToggle={() => setOpenDetail((v) => !v)}
        >
          <dl className="kv">
            <div className="kv__row">
              <dt>사업자명</dt>
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
              <dt>사업자번호</dt>
              <dd>1231251213</dd>
            </div>
            <div className="kv__row">
              <dt>업종코드</dt>
              <dd>
                011000{" "}
                <span className="sub">(곡물 및 기타 식량작물 재배업)</span>
              </dd>
            </div>
            <div className="kv__row">
              <dt>사업자 소재지</dt>
              <dd>서울특별시</dd>
            </div>
            <div className="kv__row">
              <dt>대표번호</dt>
              <dd>01012345678</dd>
            </div>
            <div className="kv__row">
              <dt>대표자 연락처</dt>
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
              <dt>관리자 User ID</dt>
              <dd>amart</dd>
            </div>

            {/* 라디오: 이용동의 */}
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
                    <input type="radio" name="agreeUse" value="no" disabled />
                    <span>비동의</span>
                  </label>
                </fieldset>
              </dd>
            </div>

            {/* 라디오: 약관동의 */}
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

            {/* 엑세스 토큰 + 복사 */}
            <div className="kv__row">
              <dt>엑세스 토큰</dt>
              <dd className="token-cell">
                <span className="mono">0xb02aC559...2Fa04</span>
                <button
                  type="button"
                  className="copy-btn"
                  aria-label="엑세스 토큰 복사"
                  onClick={() =>
                    navigator.clipboard.writeText("0xb02aC559...2Fa04")
                  }
                >
                  <IconCopy width={20} height={20} />
                </button>
              </dd>
            </div>

            <div className="kv__row">
              <dt>엑세스 토큰 발급일시</dt>
              <dd>2025-09-11 14:05:39</dd>
            </div>
          </dl>
        </BusinessDetail>

        {/* 세그먼트 탭: 동일 페이지 전환 */}
        <TabsSeg value={tab} onChange={handleTabChange} />

        {/* 바우처 탭: 매장 선택 */}
        {tab === "vouchers" && (
          <VoucherStoreFilter
            open={usageOpen}
            storeLabel={store}
            onOpen={() => setUsageOpen(true)}
          />
        )}

        {/* 총 개수: wallet 탭일 땐 숨김 */}
        {tab !== "wallet" && <p className="biz-count">총 {totalCount}개</p>}

        {/* 리스트/본문 */}
        {tab === "wallet" && (
          <section aria-labelledby="wallet-info-title">
            <h2 id="wallet-info-title" className="sr-only">
              지갑 상세 정보
            </h2>
            <dl className="kv kv--spacious">
              <div className="kv__row">
                <dt>연동계좌</dt>
                <dd>123456789123</dd>
              </div>
              <div className="kv__row">
                <dt>상태</dt>
                <dd>사용</dd>
              </div>
              <div className="kv__row">
                <dt>계좌잔액</dt>
                <dd>999,998,000,000 원</dd>
              </div>
              <div className="kv__row">
                <dt>지갑잔액</dt>
                <dd>2,149,500 원</dd>
              </div>

              <div className="kv__row">
                <dt>간편주소</dt>
                <dd className="token-cell">
                  <span className="mono">3901011000011892690</span>
                  <button
                    type="button"
                    className="copy-btn"
                    aria-label="간편주소 복사"
                    onClick={() =>
                      navigator.clipboard.writeText("3901011000011892690")
                    }
                  >
                    <IconCopy width={20} height={20} />
                  </button>
                </dd>
              </div>

              <div className="kv__row">
                <dt>지갑주소</dt>
                <dd className="token-cell">
                  <span className="mono">0xb02aC559...2Fa04</span>
                  <button
                    type="button"
                    className="copy-btn"
                    aria-label="지갑주소 복사"
                    onClick={() =>
                      navigator.clipboard.writeText("0xb02aC559...2Fa04")
                    }
                  >
                    <IconCopy width={20} height={20} />
                  </button>
                </dd>
              </div>
            </dl>
          </section>
        )}

        {tab === "owners" && (
          <OwnersList
            items={MOCK_OWNERS}
            onSelect={() => nav("/biz/usage/detail")}
          />
        )}

        {tab === "vouchers" && (
          <VouchersList items={MOCK_VOUCHERS} onSelect={handleVoucherSelect} />
        )}

        {/* 페이지네이션: wallet 탭일 땐 숨김 */}
        {tab !== "wallet" && (
          <Pager page={page} totalPages={totalPages} onChange={setPage} />
        )}
      </main>

      {/* 매장 선택 바텀시트 */}
      <UsageSelectSheet
        open={usageOpen}
        onClose={() => setUsageOpen(false)}
        options={usageOptions}
        value={usageOptions.find((o) => o.label === store)?.id ?? null}
        onChange={(id: string) => {
          handleUsageChange(id);
          setUsageOpen(false);
        }}
      />
    </div>
  );
}
