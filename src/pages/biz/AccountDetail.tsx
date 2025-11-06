import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Select, { Option } from "@/components/Select";
import { useToast } from "@/components/Toast";
import IconBack from "@/assets/images/icon-back.svg?react";
import IconMore from "@/assets/images/icon-more.svg?react";
import FooterActions from "@/components/FooterActions";

const STATUS_OPTS: Option[] = [
  { label: "사용중", value: "active" },
  { label: "미사용", value: "inactive" },
  { label: "일시정지", value: "paused" },
];

type MenuRole = { a: boolean; b: boolean; c: boolean; d: boolean };

export default function AccountDetail() {
  const nav = useNavigate();
  const { push } = useToast();

  // form states
  const [status, setStatus] = useState<string>("active");
  const [menuRole, setMenuRole] = useState<MenuRole>({
    a: true,
    b: false,
    c: true,
    d: false,
  });
  const [approveYes, setApproveYes] = useState(true);

  // ids
  const h1Id = useId();
  const statusId = useId();
  const approveFsId = useId();
  const chkA = useId();
  const chkB = useId();
  const chkC = useId();
  const chkD = useId();

  // focus anchor
  const titleRef = useRef<HTMLHeadingElement>(null);

  // ===== More(popover) =====
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const calcPos = () => {
    const btn = moreBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const w = 150; // 포팝 너비
    const gap = 8; // 버튼과 간격
    const inset = 10; //

    // 기본: 버튼 오른쪽에 정렬 + inset 만큼 더 안쪽으로
    let left = rect.right + window.scrollX - w - inset;

    // 최소 8px 여백 보장 (오른쪽 넘어감 방지용 가벼운 클램프)
    left = Math.max(8 + window.scrollX, left);

    setPopoverPos({
      top: rect.bottom + window.scrollY + gap,
      left,
    });
  };

  // toggle
  const openMore = () => {
    setMoreOpen(true);
    requestAnimationFrame(calcPos); // 위치는 다음 프레임에서 계산
  };
  const closeMore = () => setMoreOpen(false);

  // 외부 클릭/ESC/리사이즈/스크롤로 닫기 & 위치 재계산
  useEffect(() => {
    if (!moreOpen) return;

    const onClick = (e: MouseEvent) => {
      const btn = moreBtnRef.current;
      if (!btn) return;
      if (btn.contains(e.target as Node)) return; // 버튼 클릭은 무시(토글 책임)
      if (!(e.target as HTMLElement).closest?.(".more-popover--portal")) {
        closeMore();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMore();
    };
    const onRelayout = () => calcPos();

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onRelayout);
    window.addEventListener("scroll", onRelayout, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onRelayout);
      window.removeEventListener("scroll", onRelayout);
    };
  }, [moreOpen]);

  // actions
  const onResetPassword = () => push("비밀번호가 초기화되었습니다.");
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    push("저장되었습니다.");
    titleRef.current?.focus();
  };

  return (
    <div className="mobile-wrap account">
      <header className="m-header" role="banner" aria-label="상단 헤더">
        <button
          type="button"
          className="icon-btn"
          aria-label="이전 화면으로 이동"
          onClick={() => nav(-1)}
        >
          <IconBack />
        </button>

        <h1 id={h1Id} ref={titleRef} className="m-title" tabIndex={-1}>
          계정 상세
        </h1>

        {/* more button */}
        <button
          type="button"
          ref={moreBtnRef}
          className="icon-btn"
          aria-label="더보기"
          aria-haspopup="menu"
          aria-expanded={moreOpen}
          onClick={() => (moreOpen ? closeMore() : openMore())}
        >
          <IconMore />
        </button>
      </header>

      {/* === Popover (Portal) === */}
      {moreOpen &&
        popoverPos &&
        createPortal(
          <div
            className="more-popover--portal"
            role="menu"
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            <button
              type="button"
              role="menuitem"
              className="more-popover__item"
              onClick={() => {
                closeMore();
                // TODO: 수정 페이지 이동 or 편집 모드 진입
                push("수정 메뉴가 선택되었습니다.");
              }}
            >
              수정
            </button>
          </div>,
          document.body
        )}

      <main className="m-container" role="main" aria-labelledby={h1Id}>
        <form onSubmit={onSubmit} noValidate>
          <h2 className="sr-only">계정 정보</h2>

          <dl className="kv">
            <div className="kv__row">
              <dt>User ID</dt>
              <dd>amart</dd>
            </div>
            <div className="kv__row">
              <dt>이름</dt>
              <dd>김한국</dd>
            </div>
            <div className="kv__row">
              <dt>소속/부서</dt>
              <dd>amart 명동점</dd>
            </div>
            <div className="kv__row">
              <dt>비밀번호</dt>
              <dd>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onResetPassword}
                >
                  초기화
                </button>
              </dd>
            </div>
            <div className="kv__row">
              <dt>휴대폰 번호</dt>
              <dd>010-1234-5678</dd>
            </div>
            <div className="kv__row">
              <dt>계정유형</dt>
              <dd>사용자</dd>
            </div>
            <div className="kv__row">
              <dt>로그인 일시</dt>
              <dd>2025.10.14 12:53:50</dd>
            </div>
            <div className="kv__row">
              <dt>생성일시</dt>
              <dd>2025.10.14 12:53:50</dd>
            </div>
            <div className="kv__row">
              <dt>생성자</dt>
              <dd>홍길동</dd>
            </div>
            <div className="kv__row">
              <dt>수정자</dt>
              <dd>홍길동</dd>
            </div>

            <div className="kv__row">
              <dt>
                <label htmlFor={statusId}>이용상태</label>
              </dt>
              <dd>
                <Select
                  id={statusId}
                  label={undefined}
                  value={status}
                  options={STATUS_OPTS}
                  onChange={setStatus}
                />
              </dd>
            </div>

            <div className="kv__row fset">
              <dt>메뉴권한</dt>
              <dd>
                <div className="chk-items">
                  <label className="chk" htmlFor={chkA}>
                    <input
                      id={chkA}
                      type="checkbox"
                      checked={menuRole.a}
                      onChange={(e) =>
                        setMenuRole((s) => ({ ...s, a: e.target.checked }))
                      }
                    />
                    <span>사업자 계정관리</span>
                  </label>
                  <label className="chk" htmlFor={chkB}>
                    <input
                      disabled
                      id={chkB}
                      type="checkbox"
                      checked={menuRole.b}
                      onChange={(e) =>
                        setMenuRole((s) => ({ ...s, b: e.target.checked }))
                      }
                    />
                    <span>사업자 전자지갑관리</span>
                  </label>
                  <label className="chk" htmlFor={chkC}>
                    <input
                      id={chkC}
                      type="checkbox"
                      checked={menuRole.c}
                      onChange={(e) =>
                        setMenuRole((s) => ({ ...s, c: e.target.checked }))
                      }
                    />
                    <span>사업자 매출관리</span>
                  </label>
                  <label className="chk" htmlFor={chkD}>
                    <input
                      id={chkD}
                      type="checkbox"
                      checked={menuRole.d}
                      onChange={(e) =>
                        setMenuRole((s) => ({ ...s, d: e.target.checked }))
                      }
                    />
                    <span>사업자 커뮤니티관리</span>
                  </label>
                </div>
              </dd>
            </div>

            <div className="kv__row fset">
              <dt>승인권한</dt>
              <dd className="radio-row">
                <fieldset
                  className="radio-fieldset"
                  aria-describedby={approveFsId}
                >
                  <legend id={approveFsId} className="sr-only">
                    승인권한 선택
                  </legend>
                  <label className="radio">
                    <input
                      type="radio"
                      name="approve"
                      value="yes"
                      disabled
                      checked={approveYes}
                      onChange={() => setApproveYes(true)}
                    />
                    <span>있음</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="approve"
                      value="no"
                      checked={!approveYes}
                      onChange={() => setApproveYes(false)}
                    />
                    <span>없음</span>
                  </label>
                </fieldset>
              </dd>
            </div>
          </dl>

          {/* footer (컴포넌트 분리) */}
          <FooterActions
            ariaLabel="저장 및 취소 버튼"
            columnsClass="colum1fr1"
            leftLabel="취소"
            rightLabel="저장"
            leftVariant="primary"
            rightVariant="secondary"
            onLeft={() => nav(-1)}
            onRight={() => {
              // form submit 트리거
              const form = titleRef.current?.closest("form");
              form?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            }}
          />
        </form>
      </main>
    </div>
  );
}
