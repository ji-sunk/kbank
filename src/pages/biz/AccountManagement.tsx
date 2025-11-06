import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import IconArrow from "@/assets/images/icon-arrow.svg?react";
import SearchFilterSheet from "@/components/popup/sheet/SearchFilterSheet";
import SearchKeywordSheet from "@/components/popup/sheet/SearchKeywordSheet";
import ConfirmModal from "@/components/popup/ConfirmModal";
import FilterControls from "@/components/FilterControls";
import { useToast } from "@/components/Toast";

type RequestItem = { id: string; name: string; phone: string; org: string };
type StaffItem = {
  id: string;
  name: string;
  role?: string;
  phone: string;
  org?: string;
};
type FilterKey = "typeA" | "typeB" | "period" | "sort";

export default function AcconuntManagement() {
  const nav = useNavigate();
  const { push } = useToast();

  // ======= 필터/검색 값 =======
  const [chipTypeA, setChipTypeA] = useState("전체");
  const [chipTypeB, setChipTypeB] = useState("전체");
  const [chipPeriod, setChipPeriod] = useState("오늘");
  const [chipSort, setChipSort] = useState("최신순");
  const [query, setQuery] = useState("");

  // ======= 시트 열림 상태 / 포커스 =======
  const [filterOpen, setFilterOpen] = useState(false);
  const [keywordOpen, setKeywordOpen] = useState(false);
  const [filterFocus, setFilterFocus] = useState<FilterKey>("typeA");

  // ======= 목록 더미 =======
  const initialRequests: RequestItem[] = useMemo(
    () => [
      { id: "r1", name: "김농협", phone: "010-1234-5678", org: "amart 종로점" },
      {
        id: "r2",
        name: "직원명",
        phone: "010-1234-5678",
        org: "amart 영등포구청점",
      },
    ],
    []
  );
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);

  const staffs: StaffItem[] = useMemo(
    () => [
      { id: "s1", name: "홍길동", role: "관리자", phone: "010-1234-5678" },
      { id: "s2", name: "김한국", phone: "010-1234-5678", org: "amart 명동점" },
    ],
    []
  );

  // ======= 등록요청 액션 =======
  const [rejectTarget, setRejectTarget] = useState<RequestItem | null>(null);
  const onApprove = (id: string) => console.log("승인:", id);
  const onRejectAsk = (id: string) =>
    setRejectTarget(requests.find((r) => r.id === id) || null);
  const onRejectConfirm = () => {
    if (!rejectTarget) return;
    setRequests((prev) => prev.filter((r) => r.id !== rejectTarget.id));
    setRejectTarget(null);
    push("등록 요청을 거절하였습니다.");
  };

  // ======= 네비 =======
  const goAccountDetail = () => nav("/biz/account/detail");

  // ======= FilterControls 콜백 =======
  const handleOpenFilter = (focus: FilterKey) => {
    setFilterFocus(focus);
    setFilterOpen(true);
  };
  const handleOpenKeyword = () => setKeywordOpen(true);
  const handleClearKeyword = () => setQuery("");

  // ======= 시트에서 값 적용 =======
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
    const openFilter = (focus: FilterKey) => {
      setFilterFocus(focus);
      setFilterOpen(true);
    };
    const closeFilter = () => {
      setFilterOpen(false);
      setFilterFocus(null);
    };

  return (
    <div className="mobile-wrap am-page">
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>
        <h1 className="m-title">계정 관리</h1>
      </header>

      <main className="m-container account-management">
        {/* ===== 상단 필터/검색 바 ===== */}
        <FilterControls
          chipTypeA={chipTypeA}
          chipTypeB={chipTypeB}
          chipPeriod={chipPeriod}
          chipSort={chipSort}
          onOpenFilter={handleOpenFilter}
          onOpenKeyword={handleOpenKeyword}
          query={query}
          onClearKeyword={handleClearKeyword}
          // activeKey={filterFocus}
          activeKey={filterOpen ? filterFocus : null}
        />

        {/* 등록 요청 */}
        <section className="am-section">
          <div className="am-section__title">
            등록 요청 <strong className="num">{requests.length}</strong>
          </div>
          <ul className="am-req-list" role="list">
            {requests.map((r) => (
              <li key={r.id} className="am-req-item">
                <div className="am-req-item__meta">
                  <span className="am-link">{r.name}</span>
                  <div className="sub">{r.phone}</div>
                  <div className="sub">{r.org}</div>
                </div>
                <div className="am-req-item__actions">
                  <button
                    type="button"
                    className="pill pill--secondary"
                    onClick={() => onRejectAsk(r.id)}
                  >
                    거절
                  </button>
                  <button
                    type="button"
                    className="pill pill--primary"
                    onClick={() => onApprove(r.id)}
                  >
                    승인
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 직원 목록 */}
        <section className="am-section">
          <h2 className="am-section__title">
            직원 목록 <strong className="num">{staffs.length}</strong>
          </h2>
          <ul className="am-staff-list" role="list">
            {staffs.map((s) => (
              <li
                key={s.id}
                className="am-staff-item"
                role="button"
                tabIndex={0}
                onClick={goAccountDetail}
              >
                <div className="am-staff-item__meta">
                  <span className="am-link">
                    {s.name}
                    {s.role ? ` / ${s.role}` : ""}
                  </span>
                  <div className="sub">{s.phone}</div>
                  {s.org && <div className="sub">{s.org}</div>}
                </div>
                <IconArrow
                  width={16}
                  height={16}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* 거절 확인 모달 */}
        <ConfirmModal
          open={!!rejectTarget}
          title="등록 요청을 거절하시겠습니까?"
          message={
            <>
              등록 요청을 거절하시면
              <br />
              해당 요청 건이 삭제됩니다.
            </>
          }
          cancelLabel="취소"
          confirmLabel="거절하기"
          onCancel={() => setRejectTarget(null)}
          onConfirm={onRejectConfirm}
        />
      </main>

      {/* 오버레이 */}
      <div
        className={`overlay ${filterOpen || keywordOpen ? "open" : ""}`}
        onClick={() => {
          setFilterOpen(false);
          setKeywordOpen(false);
        }}
      />

      {/* 시트들 */}
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
