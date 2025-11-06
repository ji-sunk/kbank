import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBack from "@/assets/images/icon-back.svg?react";
import AlertModal from "@/components/popup/AlertModal";

type ModalKind = "success" | "retry" | "mismatch" | null;

export default function CertificateManagement() {
  const nav = useNavigate();
  const [modal, setModal] = useState<ModalKind>(null);

  const biz = {
    name: "amart",
    owner: "amart",
    registeredAt: "2025-09-11 / 사용중",
    type: "법인",
    regNo: "1231251213",
    industry: "011000",
    industryDesc: "(곡물 및 기타 식량작물 재배업)",
  };

  // 실제로는 API 결과에 따라 setModal("success" | "retry" | "mismatch")
  const handleRegister = async () => {
    // const res = await api.registerCert(...)
    // if (res.ok) setModal("success")
    // else if (res.code === "MISMATCH") setModal("mismatch")
    // else setModal("retry")
    setModal("success"); // 데모
  };

  // 모달 사전 정의(카피 가이드)
  const MODAL_COPY: Record<
    Exclude<ModalKind, null>,
    { title?: string; body: React.ReactNode }
  > = {
    success: {
      // title: "인증서 정상 등록 안내",
      body: <>금융인증서 등록이 완료되었습니다.</>,
    },
    retry: {
      // title: "인증서 등록 실패",
      body: <>금융인증서 등록을 다시 진행해주세요.</>,
    },
    mismatch: {
      // title: "사업자등록 번호 오류",
      body: (
        <>
          인증서의 사업자등록번호가 계정과 일치하지 않습니다.
          <br />
          확인 후 다시 등록해주세요.
        </>
      ),
    },
  };

  return (
    <div className="mobile-wrap usageDetail">
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
        <h1 className="m-title">인증서 관리</h1>
        <span />
      </header>

      {/* Body */}
      <main className="m-container" role="main" aria-label="금융인증서 등록">
        <h2 id="title-detail" className="m-section-title">
          금융인증서 등록
        </h2>

        <dl className="kv" aria-label="사업자 상세정보">
          <div className="kv__row">
            <dt>사업자명</dt>
            <dd>{biz.name}</dd>
          </div>
          <div className="kv__row">
            <dt>대표자 이름</dt>
            <dd>{biz.owner}</dd>
          </div>
          <div className="kv__row">
            <dt>등록일시/상태</dt>
            <dd>{biz.registeredAt}</dd>
          </div>
          <div className="kv__row">
            <dt>사업자구분</dt>
            <dd>{biz.type}</dd>
          </div>
          <div className="kv__row">
            <dt>사업자등록번호</dt>
            <dd>{biz.regNo}</dd>
          </div>
          <div className="kv__row">
            <dt>업종코드</dt>
            <dd>
              {biz.industry} <span className="sub">{biz.industryDesc}</span>
            </dd>
          </div>
        </dl>
      </main>

      {/* Footer: 1버튼 */}
      <footer className="m-footer-actions" aria-label="금융인증서 사용등록">
        <button
          type="button"
          className="action action--secondary"
          style={{ gridColumn: "1 / -1" }}
          onClick={handleRegister}
        >
          금융인증서 사용등록
        </button>
      </footer>

      {/* Modal */}
      {modal && (
        <AlertModal
          open
          title={MODAL_COPY[modal].title}
          message={MODAL_COPY[modal].body}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
