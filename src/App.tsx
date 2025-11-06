import { Routes, Route, Navigate } from "react-router-dom";
import MainDashboard from "@/pages/MainDashboard";
import MainNotification from "@/pages/MainNotification";
// import Sitemap from "@/pages/Sitemap";
import Login from "@/pages/login/index";
import TwoFactorOtp from "@/pages/login/TwoFactorOtp";
import InitPasswordChange from "@/pages/login/InitPasswordChange";
import CertificateManagement from "@/pages/biz/CertificateManagement";
import AccountDetail from "@/pages/biz/AccountDetail";
import VoucherDetail from "@/pages/biz/VoucherDetail";
import UsagePlaceDetail from "@/pages/biz/UsagePlaceDetail";
import SearchUsage from "@/pages/biz/SearchUsage";
import AccountRegistration from "@/pages/biz/AccountRegistration";
import BusinessInquiry from "@/pages/biz/BusinessInquiry";
import AccountManagement from "@/pages/biz/AccountManagement";

import WalletInfo from "@/pages/wallet/WalletInfo";
import WalletHistory from "@/pages/wallet/WalletHistory";

export default function App() {
  return (
    <Routes>
      {/* 메인 - 대시보드 */}
      <Route path="/" element={<MainDashboard />} />
      {/* <Route path="/sitemap" element={<Sitemap />} /> */}
      {/* 메인 - 알림 */}
      <Route path="/notification" element={<MainNotification />} />
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      {/* 로그인 */}
      <Route path="/login" element={<Login />} />
      {/* 이중인증 */}
      <Route path="/login/TwoFactorOtp" element={<TwoFactorOtp />} />
      {/* 초기 비밀번호 변경 */}
      <Route path="/login/passwordChange" element={<InitPasswordChange />} />
      {/* -------------------사업자 관리 > 계정 관리 ------------------------ */}
      {/* 메인 */}
      <Route path="/biz/account" element={<AccountManagement />} />
      {/* 계정 상세 */}
      <Route path="/biz/account/detail" element={<AccountDetail />} />
      {/* 계정 등록 */}
      <Route
        path="/biz/account/registration"
        element={<AccountRegistration />}
      />
      {/* -----------------사업자 관리 > 사업자 조회-------------------------- */}
      {/* 사업자 조회 */}
      <Route path="/biz/search" element={<BusinessInquiry />} />
      {/* 사업자 바우처 상세 */}
      <Route path="/biz/voucher/detail" element={<VoucherDetail />} />
      {/* -----------------사업자 관리 > 사용처 조회-------------------------- */}
      {/* 사용처 조회 */}
      <Route path="/biz/search/usage" element={<SearchUsage />} />
      {/* 사용처 상세 */}
      <Route path="/biz/usage/detail" element={<UsagePlaceDetail />} />
      {/* 인증서 관리 */}
      <Route path="/biz/cert" element={<CertificateManagement />} />
      {/* -------------------전자 지갑 관리 ------------------------ */}
      {/* 전자지갑 관리 > 전자지갑 내역 관리 */}
      <Route path="/wallet/history" element={<WalletHistory />} />
      {/* 전자지갑 관리 > 전자지갑 정보 */}
      <Route path="/wallet/info" element={<WalletInfo />} />
    </Routes>
  );
}
