
import React from 'react'
import Accordion from './Accordion'

export default function LeftDrawer({ open, onClose }:{open:boolean; onClose:()=>void}){
  const sections = [
    { title: '사업자관리', items: ['계정관리','사업자조회','사용자조회','인증서관리']},
    { title: '전자지갑관리', items: ['전자지갑관리','지갑정보']},
    { title: '매출관리', items: ['매출관리','현금영수증 조회']},
    { title: '커뮤니티', items: ['공지사항','FAQ','1:1문의']},
  ]
  return (
    <aside className={`drawer ${open? 'open':''}`} role="dialog" aria-label="왼쪽 메뉴">
      <div className="drawer-header">
        <strong>amart 님</strong>
        <span style={{marginLeft:'auto',fontSize:12,color:'#666'}}>최근 접속 2025.10.15 13:21:33</span>
        <button className="drawer-close" onClick={onClose} aria-label="닫기">✕</button>
      </div>
      <div className="drawer-body">
        <Accordion sections={sections}/>
      </div>
      <div className="drawer-footer">고객센터: 1111-1111 • 평일 09:00~18:00</div>
    </aside>
  )
}
