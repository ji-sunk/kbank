import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";

type NotiKind = "all" | "token" | "security" | "activity";

interface NotiItem {
  id: string;
  time: string;
  kind: NotiKind;
  title: string;
  text?: string;
  message: string;
  dateKey: string; // "오늘" | "어제" | "2일 전" | "YYYY.MM.DD"
  read: boolean;
}

const LABEL: Record<NotiKind, string> = {
  all: "전체",
  token: "토큰 • 결제",
  security: "보안",
  activity: "활동 • 소식",
};

// 데모 데이터
const MOCK: NotiItem[] = [
  {
    id: "n1",
    time: "hh:mm:ss",
    kind: "token",
    title: "거래구분",
    text: "토큰명",
    message: "안내 문구 노출 영역 (최대 2줄, 이후 말줄임)",
    dateKey: "오늘",
    read: false,
  },
  {
    id: "n2",
    time: "23:19:21",
    kind: "token",
    title: "송금",
    text: "예금 토큰",
    message: "34,500원을 송금하였습니다.",
    dateKey: "오늘",
    read: false,
  },
  {
    id: "n3",
    time: "23:19:21",
    kind: "activity",
    title: "알림타임",
    message: "안내 문구 노출 영역 (최대 2줄, 이후 말줄임)",
    dateKey: "오늘",
    read: true,
  },
  {
    id: "n4",
    time: "23:19:21",
    kind: "activity",
    title: "공지사항",
    message: "개인정보 처리 방침 개정 안내 (2024.02.01 시행)",
    dateKey: "오늘",
    read: true,
  },
  {
    id: "n5",
    time: "hh:mm:ss",
    kind: "activity",
    title: "알림타임",
    message: "안내 문구 노출 영역 (최대 2줄, 이후 말줄임)",
    dateKey: "어제",
    read: true,
  },
  {
    id: "n6",
    time: "23:19:21",
    kind: "security",
    title: "보안",
    text: "본인 인증",
    message:
      "본인 인증 기간이 만료됩니다. 한 번 더 본인 인증을 해주세요. (기한: 2024.01.29) 본인 인증 기간이 만료됩니다. 한 번 더 본인 인증을 해주세요. (기한: 2024.01.29)",
    dateKey: "2일 전",
    read: false,
  },
  {
    id: "n7",
    time: "23:19:21",
    kind: "activity",
    title: "1:1 문의",
    message: "문의하신 내용에 답변이 등록되었습니다.",
    dateKey: "2023.12.23",
    read: true,
  },
];

export default function MainNotification() {
  const nav = useNavigate();
  const [filter, setFilter] = useState<NotiKind>("all");
  const [items, setItems] = useState<NotiItem[]>(MOCK);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((n) => n.kind === filter);
  }, [filter, items]);

  // 날짜 그룹 + 정렬
  const grouped = useMemo(() => {
    const map = new Map<string, NotiItem[]>();
    filtered.forEach((n) => {
      if (!map.has(n.dateKey)) map.set(n.dateKey, []);
      map.get(n.dateKey)!.push(n);
    });
    const pref = ["오늘", "어제", "2일 전"];
    const keys = Array.from(map.keys()).sort((a, b) => {
      const ai = pref.indexOf(a);
      const bi = pref.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a > b ? -1 : 1; // 날짜 문자열은 최근이 위
    });
    return keys.map((k) => ({ key: k, list: map.get(k)! }));
  }, [filtered]);

  // 상태 변경
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));
  // const toggleRead = (id: string) =>
  //   setItems((prev) =>
  //     prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
  //   );
  //  일방향 읽음 처리 (이미 읽음이면 아무 동작 없음)
  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? (n.read ? n : { ...n, read: true }) : n))
    );
  // const markAllRead = () =>
  //   setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  // 카드 전체 클릭/키보드로 토글
  // const onCardActivate = (id: string) => toggleRead(id);
  // const onCardKeyDown = (e: React.KeyboardEvent, id: string) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     e.preventDefault();
  //     toggleRead(id);
  //   }
  // };
    const onCardActivate = (id: string) => markRead(id);
    const onCardKeyDown = (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        markRead(id);
      }
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
        <h1 className="m-title">알림</h1>
        <div />
      </header>

      <main className="m-container mainNoti">
        {/* 칩형 필터 */}
        <div className="chips" role="group" aria-label="알림 필터">
          {(["all", "token", "security", "activity"] as NotiKind[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${filter === k ? "is-active" : ""}`}
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
            >
              {LABEL[k]}
            </button>
          ))}
          {/* <button
            type="button"
            className="chip chip--ghost"
            onClick={markAllRead}
          >
            모두 읽음 처리
          </button> */}
        </div>

        <p className="noti-hint">알림 내역은 최근 3개월까지만 보관됩니다.</p>
        <div className="divider" aria-hidden />

        {grouped.map((group, gi) => {
          const headingId = `noti-date-${gi}`;
          return (
            <section
              key={group.key}
              className="noti-section"
              aria-labelledby={headingId}
            >
              <p id={headingId} className="noti-section__label">
                {group.key}
              </p>

              <div className="noti-list">
                {group.list.map((item) => (
                  <article
                    key={item.id}
                    className={`noti-card ${
                      item.read ? "is-read" : "is-unread"
                    }`}
                    aria-label={item.title}
                    role="button"
                    tabIndex={0}
                    aria-pressed={!item.read}
                    onClick={() => onCardActivate(item.id)}
                    onKeyDown={(e) => onCardKeyDown(e, item.id)}
                  >
                    <header className="noti-card__head">
                      <div className="when">
                        <span className="time">{item.time}</span>
                        {/* {!item.read && <span className="dot" aria-hidden />} */}
                        {/* 안읽음일 때만 닷 표시, 읽음 후에는 다시 안 나타남 */}
                        {!item.read && <span className="dot" aria-hidden />}
                      </div>

                      <button
                        className="close"
                        aria-label="알림 삭제"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                      >
                        ×
                      </button>
                    </header>

                    <div className="noti-card__body">
                      {/* 제목 + (선택적) 보조 텍스트 */}
                      <div className="title-row">
                        <strong className="title">{item.title}</strong>
                        {item.text && (
                          <span className="title-sub">{item.text}</span>
                        )}
                      </div>
                      <p className="msg">{item.message}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
