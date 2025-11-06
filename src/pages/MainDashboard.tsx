
import Header from "@/components/Header";
import KPI from "@/components/KPI";
import { Card, CardTitle } from "@/components/Card";
import { InfoList } from "@/components/InfoList";
import { useToast } from "@/components/Toast";

export default function MainDashboard() {
  const { push } = useToast();

  // 공통 복사 함수
  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    push(`${label}가 복사되었습니다.`);
  };

  return (
    <div className="mobile-wrap">
      <Header />

      <main className="m-container mainDashboard">
        {/* 대시보드 */}
        <div className="dash-card">
          <Card>
            <div className="dash-head">대시보드</div>
            <div className="kpi-wrap">
              <KPI label="현재 기준 당일 매출" value="927,800 원" />
              <KPI label="현재 기준 당일 매출" value="927,800 원" />
            </div>
          </Card>

          {/* 사업자 정보 */}
          <Card>
            <CardTitle>사업자 정보</CardTitle>
            <InfoList
              rows={[
                { label: "사업자", value: "amart" },
                { label: "사업자ID", value: "amart" },
                { label: "상태", value: "사용중" },
                { label: "대표자", value: "amart" },
                { label: "사업자번호", value: "123-12-51213" },
                { label: "연락처", value: "01012345678" },
              ]}
            />
          </Card>

          {/* 계좌&지갑 */}
          <Card>
            <CardTitle>계좌&지갑</CardTitle>
            <InfoList
              rows={[
                {
                  label: "연동계좌",
                  value: "123456789123",
                  copy: true,
                  onCopy: () => handleCopy("연동 계좌", "123456789123"),
                },
                { label: "계좌잔액", value: "999,998,000,000 원" },
                {
                  label: "지갑주소",
                  value: "0xb02aC559...2Fa04",
                  copy: true,
                  onCopy: () =>
                    handleCopy("지갑 주소", "0xb02aC5592fA04eAc92012eBdF390E9A"),
                },
                {
                  label: "간편주소",
                  value: "390101100011892690",
                  copy: true,
                  onCopy: () => handleCopy("간편 주소", "390101100011892690"),
                },
                { label: "예금토큰", value: "2,136,500 원" },
              ]}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}
