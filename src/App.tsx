
import React, { useState, useEffect } from 'react'
import LeftDrawer from './components/LeftDrawer'
import SearchFilterSheet from './components/SearchFilterSheet'

export default function App(){
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  // lock scroll when overlays open
  useEffect(()=>{
    const hasOverlay = drawerOpen || sheetOpen
    document.body.style.overflow = hasOverlay ? 'hidden' : ''
    return ()=>{ document.body.style.overflow = '' }
  },[drawerOpen, sheetOpen])

  return (
    <div className="app">
      <header className="topbar">
        <button className="hamburger" aria-label="메뉴 열기" onClick={()=> setDrawerOpen(true)}><span></span></button>
        <strong>모바일 데모</strong>
        <div style={{marginLeft:'auto'}}>
          <button onClick={()=> setSheetOpen(true)} style={{border:'1px solid #ddd',padding:'8px 12px',borderRadius:8, background:'#fff'}}>검색조건</button>
        </div>
      </header>

      <main className="content">
        <div className="card">
          <h3 style={{marginTop:0}}>샘플 카드</h3>
          <p>햄버거 메뉴를 눌러 <strong>레프트 아코디언 메뉴</strong>를 열어보세요.</p>
          <p>오른쪽 버튼으로 <strong>검색조건 바텀시트</strong>를 띄울 수 있습니다.</p>
        </div>
      </main>

      {/* Overlays */}
      <div className={`overlay ${drawerOpen || sheetOpen ? 'open':''}`} onClick={()=>{ setDrawerOpen(false); setSheetOpen(false) }} />
      <LeftDrawer open={drawerOpen} onClose={()=> setDrawerOpen(false) } />
      <SearchFilterSheet open={sheetOpen} onClose={()=> setSheetOpen(false)} />
    </div>
  )
}
