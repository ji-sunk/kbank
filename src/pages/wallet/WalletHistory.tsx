import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import IconMore from "@/assets/images/icon-more.svg?react";
import IconBank from "@/assets/images/icon-bank-logo.svg?react";
import { IconCopy } from "@/components/Icons";
import FilterControls, { FilterKey } from "@/components/FilterControls";
import SearchFilterSheet from "@/components/popup/sheet/SearchFilterSheet";
import SearchKeywordSheet from "@/components/popup/sheet/SearchKeywordSheet";
import Pager from "@/components/Pager";
import { useToast } from "@/components/Toast";

type Tx = {
  id: string;
  bank: string;
  when: string;
  kind: "결제" | "환불" | "전환입금" | "예금전환";
  amount: number;
  section: "오늘" | "어제" | "2025.10.18";
};

const MOCK_TX: Tx[] = [
  {
    id: "t1",
    bank: "C은행",
    when: "25-10-20 23:19:21",
    kind: "전환입금",
    amount: 30000,
    section: "오늘",
  },
  {
    id: "t2",
    bank: "A은행",
    when: "25-10-20 23:19:21",
    kind: "결제",
    amount: 30000,
    section: "오늘",
  },
  {
    id: "t3",
    bank: "C은행",
    when: "25-10-20 23:19:21",
    kind: "예금전환",
    amount: -30000,
    section: "오늘",
  },
  {
    id: "t4",
    bank: "B은행",
    when: "25-10-19 23:19:21",
    kind: "결제",
    amount: 30000,
    section: "어제",
  },
  {
    id: "t5",
    bank: "C은행",
    when: "25-10-19 23:19:21",
    kind: "환불",
    amount: -30000,
    section: "어제",
  },
];

export default function WalletHistory() {
  const nav = useNavigate();
  const { push } = useToast();

  // 상단 요약
  const bankLabel = "신한 123-456-789-0";
  const totalToken = 1584710;

  // ===== 필터/검색 값 =====
  const [chipTypeA, setChipTypeA] = useState("전체");
  const [chipTypeB, setChipTypeB] = useState("직접입력");
  const [chipPeriod, setChipPeriod] = useState("오늘");
  const [chipSort, setChipSort] = useState("최신순");
  const [query, setQuery] = useState("");

  // ===== 시트 열림/포커스 =====
  const [filterOpen, setFilterOpen] = useState(false);
  const [keywordOpen, setKeywordOpen] = useState(false);
  const [filterFocus, setFilterFocus] = useState<FilterKey | null>(null); // 클릭한 버튼만 강조용

  // ===== 목록/페이지 =====
  const items = useMemo(() => MOCK_TX, []);
  const [page, setPage] = useState(2);
  const totalPages = 3;
  const totalCount = 14;
  const periodText = "2025.10.01 ~ 2025.10.20";

  // 복사 (토스트만 여기서)
  const copy = async (t: string) => {
    try {
      await navigator.clipboard.writeText(t);
      push("계좌번호가 복사되었습니다.");
    } catch {
      // 실패 시엔 별도 안내 생략
    }
  };

  // 전환 버튼: 토스트 없앰 (요청사항)
  const onDepositConvert = () => {
    // nav("/wallet/deposit/convert")
  };
  const onSavingConvert = () => {
    // nav("/wallet/saving/convert")
  };

  // 섹션 그룹
  const sections = useMemo(() => {
    const m = new Map<string, Tx[]>();
    items.forEach((tx) => {
      const arr = m.get(tx.section) || [];
      arr.push(tx);
      m.set(tx.section, arr);
    });
    return Array.from(m.entries());
  }, [items]);

  // 시트 적용/닫기
  const applyFilterSummary = (v: {
    typeA: string;
    typeB: string;
    period: string;
    sort: string;
  }) => {
    setChipTypeA(v.typeA);
    setChipTypeB(v.typeB);
    setChipPeriod(v.period);
    setChipSort(v.sort);
    closeFilter();
  };
  const applyKeyword = (kw: string) => {
    setQuery(kw.trim());
    setKeywordOpen(false);
  };
  const openFilter = (focus: FilterKey) => {
    setFilterFocus(focus); // ⬅️ 클릭한 버튼만 강조
    setFilterOpen(true);
  };
  const closeFilter = () => {
    setFilterOpen(false);
    setFilterFocus(null); // ⬅️ 닫힐 때 강조 제거
  };

  return (
    <div className="mobile-wrap walletHistory">
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
        <h1 className="m-title">전자지갑 내역 관리</h1>
        <button type="button" className="icon-btn" aria-label="메뉴">
          <IconMore />
        </button>
      </header>

      {/* Body */}
      <main
        className="m-container"
        role="main"
        aria-labelledby="walletHistoryTitle"
      >
        {/* 상단 카드 */}
        <section className="wallet-summary" aria-label="지갑 요약">
          <div className="wallet-summary__top">
            <div className="wallet-summary__bank">
              <IconBank width={16} height={16} />
              <span className="bank-name">{bankLabel}</span>
              <button
                type="button"
                className="copy-btn"
                aria-label="계좌번호 복사"
                onClick={() => copy(bankLabel)}
              >
                <IconCopy />
              </button>
            </div>
          </div>

          <div className="wallet-summary__bottom" aria-live="polite">
            <div className="caption">총 보유 예금토큰</div>
            <div className="total">
              {totalToken.toLocaleString()} <span className="unit">원</span>
            </div>
          </div>

          <div
            className="wallet-actions"
            role="group"
            aria-label="전환 신청 버튼"
          >
            <button
              type="button"
              className="wa-btn wa-btn--outline"
              onClick={onDepositConvert}
            >
              전환 입금 신청
            </button>
            <button
              type="button"
              className="wa-btn wa-btn--outline"
              onClick={onSavingConvert}
            >
              예금 전환 신청
            </button>
          </div>
        </section>

        <h2 id="walletHistoryTitle" className="m-section-title">
          거래정보
        </h2>

        {/* 상단 필터/검색 바 */}
        <FilterControls
          chipTypeA={chipTypeA}
          chipTypeB={chipTypeB}
          chipPeriod={chipPeriod}
          chipSort={chipSort}
          onOpenFilter={openFilter}
          onOpenKeyword={() => setKeywordOpen(true)}
          query={query}
          onClearKeyword={() => setQuery("")}
          /** 시트가 열려 있을 때만 강조. 닫히면 null로 전달 → 강조 해제 */
          activeKey={filterOpen ? filterFocus : null}
        />

        {/* 기간/건수 */}
        <div className="tx-period" aria-live="polite">
          <span className="date">{periodText}</span>
          <span className="total">({totalCount}건)</span>
        </div>

        {/* 섹션 리스트 */}
        <section className="tx-sections" aria-label="거래 내역 목록">
          {sections.map(([label, rows]) => (
            <div
              key={label}
              className="tx-section"
              role="group"
              aria-labelledby={`sec-${label}`}
            >
              <h3 id={`sec-${label}`} className="tx-section__label">
                {label}
              </h3>
              <ul className="tx-list" role="list">
                {rows.map((tx) => (
                  <li key={tx.id} className="tx-item">
                    <div className="tx-item__left">
                      <div className="tx-bank">{tx.bank}</div>
                      <div className="tx-meta">
                        {tx.when}{" "}
                        <span className="dot" aria-hidden>
                          {" "}
                          |{" "}
                        </span>{" "}
                        {tx.kind}
                      </div>
                    </div>
                    <div
                      className={`tx-amount ${
                        tx.amount < 0 ? "is-out" : "is-in"
                      }`}
                      aria-label={`${tx.amount < 0 ? "출금" : "입금"} 금액`}
                    >
                      {tx.amount < 0 ? "- " : ""}
                      {Math.abs(tx.amount).toLocaleString()}원
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <Pager page={page} totalPages={totalPages} onChange={setPage} />
      </main>

      {/* 오버레이 */}
      <div
        className={`overlay ${filterOpen || keywordOpen ? "open" : ""}`}
        onClick={() => {
          closeFilter(); // ✅ 강조 제거
          setKeywordOpen(false);
        }}
        aria-hidden={!filterOpen && !keywordOpen}
      />

      {/* 시트 */}
      <SearchFilterSheet
        open={filterOpen}
        onClose={closeFilter}
        onApply={applyFilterSummary}
        initial={{
          typeA: chipTypeA,
          typeB: chipTypeB,
          period: chipPeriod,
          sort: chipSort,
        }}
        focusTab={filterFocus || "typeA"}
      />
      <SearchKeywordSheet
        open={keywordOpen}
        onClose={() => setKeywordOpen(false)}
        onSearch={({ keyword }: { keyword: string }) => applyKeyword(keyword)}
        defaultKeyword={query}
      />
    </div>
  );
}
