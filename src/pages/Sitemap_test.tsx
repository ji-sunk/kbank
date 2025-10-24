import { Link } from 'react-router-dom';
import { LinkIcon } from '@/components/Icons';

const groups = [
  { title: '메인', items: [ { name: '대시보드', path: '/' } ] },
  { title: '계정 · 지갑', items: [ { name: '지갑/계좌 현황(예시)', path: '/' } ] },
];

export default function Sitemap() {
  return (
    <div className="mobile-wrap light">
      <header className="m-header">
        <Link to="/" className="icon-btn" aria-label="뒤로">←</Link>
        <h1 className="m-title">퍼블리싱 사이트맵</h1>
        <span />
      </header>

      <main className="m-container">
        <div className="sitemap">
          {groups.map((g, i) => (
            <section className="site-group" key={i}>
              <h3 className="site-title">{g.title}</h3>
              <ul className="site-list">
                {g.items.map((it, idx) => (
                  <li key={idx}>
                    <Link to={it.path} className="site-link">
                      <LinkIcon /> <span>{it.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
