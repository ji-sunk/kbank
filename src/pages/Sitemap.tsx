export default function Sitemap() {
	const sections = [
		{
			title: '공통 레이아웃',
			links: [
				{ name: '메인 대시보드', url: '/dashboard', note: '프로젝트 요약 현황' },
				{ name: '로그인 페이지', url: '/login', note: '회원 로그인 화면' },
			],
		},
		{
			title: '프로젝트 관리',
			links: [
				{ name: '프로젝트 목록', url: '/project/list', note: '프로젝트 전체 보기' },
				{ name: '프로젝트 상세', url: '/project/detail', note: '세부 정보 확인' },
			],
		},
		{
			title: '설정 및 계정',
			links: [
				{ name: '내 정보 관리', url: '/mypage', note: '-' },
				{ name: '시스템 설정', url: '/settings', note: '관리자 전용' },
			],
		},
	];

	return (
    <div className="sitemap-page">
      <h1 className="sitemap-title">퍼블리싱 사이트맵</h1>

      {sections.map((section, idx) => (
        <div key={idx} className="sitemap-section">
          <h2 className="sitemap-section-title">{section.title}</h2>
          <table className="sitemap-table">
            <thead>
              <tr>
                <th>페이지</th>
                <th>링크</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {section.links.map((link, i) => (
                <tr key={i}>
                  <td>{link.name}</td>
                  <td>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.url}
                    </a>
                  </td>
                  <td>{link.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <style jsx>{`
        .sitemap-page {
          padding: 40px;
          background-color: #f8f9fb;
          min-height: 100vh;
          color: #222;
          font-family: "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo",
            sans-serif;
        }

        .sitemap-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 32px;
          color: #111;
        }

        .sitemap-section {
          margin-bottom: 48px;
        }

        .sitemap-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
          border-left: 4px solid #ff164f;
          padding-left: 8px;
        }

        .sitemap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .sitemap-table th {
          background-color: #f3f4f6;
          color: #555;
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .sitemap-table td {
          padding: 12px;
          border-bottom: 1px solid #eaeaea;
          color: #333;
        }

        .sitemap-table tbody tr:nth-child(even) {
          background-color: #fafafa;
        }

        .sitemap-table tbody tr:hover {
          background-color: #f1f1f1;
        }

        .sitemap-table a {
          color: #ff164f;
          text-decoration: none;
          font-weight: 500;
        }

        .sitemap-table a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
