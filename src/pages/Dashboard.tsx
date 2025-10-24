import Header from '@/components/Header';
import KPI from '@/components/KPI';
import { Card, CardTitle } from '@/components/Card';
import { InfoList } from '@/components/InfoList';

export default function Dashboard() {
  return (
    <div className="mobile-wrap light">
      <Header />

      <main className="m-container">
        {/* 대시보드 */}
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
              { label: '사업자', value: 'amart' },
              { label: '사업자ID', value: 'amart' },
              { label: '상태', value: '사용중' },
              { label: '대표자', value: 'amart' },
              { label: '사업자번호', value: '123-12-51213' },
              { label: '연락처', value: '01012345678' },
            ]}
          />
        </Card>

        {/* 계좌&지갑 */}
        <Card>
          <CardTitle>계좌&지갑</CardTitle>
          <InfoList
            rows={[
              { label: '연동계좌', value: '123456789123', copy: true },
              { label: '계좌잔액', value: '999,998,000,000 원' },
              { label: '지갑주소', value: '0xb02acC559...2Fad', copy: true },
              { label: '입금주소', value: '390110100011892690', copy: true },
              { label: '예금근로', value: '2,136,500 원' },
            ]}
          />
        </Card>
      </main>
    </div>
  );
}
