// src/pages/SearchUsage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import FilterControls from "@/components/FilterControls";
import Pager from "@/components/Pager";

// 공용 시트
import SearchFilterSheet from "@/components/popup/sheet/SearchFilterSheet";
import SearchKeywordSheet from "@/components/popup/sheet/SearchKeywordSheet";

// 보유사용처 리스트 컴포넌트 재사용
import OwnersList, { PlaceItem } from "@/components/business/OwnersList";

type FilterKey = "typeA" | "typeB" | "period" | "sort";

// 더미 데이터 (이미 OwnersList에서 쓰던 구조 그대로)
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

export default function SearchUsage() {
  const nav = useNavigate();

  // ===== 필터/검색 값 =====
  const [chipTypeA, setChipTypeA] = useState("전체");
  const [chipTypeB, setChipTypeB] = useState("전체");
  const [chipPeriod, setChipPeriod] = useState("오늘");
  const [chipSort, setChipSort] = useState("최신순");
  const [query, setQuery] = useState("");

  // ===== 시트 열림/포커스 =====
  const [filterOpen, setFilterOpen] = useState(false);
  const [keywordOpen, setKeywordOpen] = useState(false);
  const [filterFocus, setFilterFocus] = useState<FilterKey>("typeA");

  // ===== 목록/페이지 =====
  const owners = useMemo(() => MOCK_OWNERS, []);
  const totalCount = 19;
  const [page, setPage] = useState(2);
  const totalPages = 3;

  // ===== 콜백 =====
  const handleOpenFilter = (focus: FilterKey) => {
    setFilterFocus(focus);
    setFilterOpen(true);
  };
  const handleOpenKeyword = () => setKeywordOpen(true);
  const handleClearKeyword = () => setQuery("");

  // 시트 → 값 반영
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
    setFilterOpen(false);
  };
  const applyKeyword = (kw: string) => {
    setQuery(kw.trim());
    setKeywordOpen(false);
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
        <h1 className="m-title">사용처 조회</h1>
        <span />
      </header>

      <main
        className="m-container searchUsage"
        role="main"
        aria-labelledby="usage-title"
      >
        {/* 상단 필터/검색 */}
        <FilterControls
          chipTypeA={chipTypeA}
          chipTypeB={chipTypeB}
          chipPeriod={chipPeriod}
          chipSort={chipSort}
          onOpenFilter={handleOpenFilter}
          onOpenKeyword={handleOpenKeyword}
          query={query}
          onClearKeyword={handleClearKeyword}
          activeKey={filterFocus}
        />

        {/* 총 개수 */}
        <p className="biz-count" aria-live="polite">
          총 {totalCount}개
        </p>

        {/* 사용처 조회 리스트: OwnersList 재사용 */}
        <OwnersList
          items={owners}
          onSelect={() => nav("/biz/usage/detail")} // ← 상세로 이동
        />
      </main>
      {/* 페이지네이션 */}
      <Pager page={page} totalPages={totalPages} onChange={setPage} />

      {/* 공용 오버레이 */}
      <div
        className={`overlay ${filterOpen || keywordOpen ? "open" : ""}`}
        onClick={() => {
          setFilterOpen(false);
          setKeywordOpen(false);
        }}
        aria-hidden={!filterOpen && !keywordOpen}
      />

      {/* 필터/검색 시트 */}
      <SearchFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={applyFilterSummary}
        initial={{
          typeA: chipTypeA,
          typeB: chipTypeB,
          period: chipPeriod,
          sort: chipSort,
        }}
        focusTab={filterFocus}
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
