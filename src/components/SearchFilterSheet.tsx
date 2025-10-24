
import React, { useState } from 'react'

const chips1 = ['전체','전환입금','예금전환','결제','환불']
const chips2 = ['오늘','일주일','1개월','월별','직접 입력']
const chips3 = ['최신순','오래된순']

function Chip({label, active, onClick}:{label:string; active:boolean; onClick:()=>void}){
  return <button type="button" className={`chip ${active?'on':''}`} onClick={onClick}>{label}</button>
}

export default function SearchFilterSheet({ open, onClose }:{open:boolean; onClose:()=>void}){
  const [t1, setT1] = useState(0)
  const [t2, setT2] = useState(4)
  const [t3, setT3] = useState(0)
  const [start, setStart] = useState('2025-10-01')
  const [end, setEnd] = useState('2025-10-12')

  const onReset = ()=>{
    setT1(0); setT2(4); setT3(0);
    setStart(''); setEnd('');
  }

  return (
    <div className={`sheet ${open?'open':''}`} role="dialog" aria-modal>
      <div className="sheet-header">
        <div className="sheet-title">검색조건 설정</div>
        <button aria-label="닫기" onClick={onClose}>✕</button>
      </div>
      <div className="sheet-body">
        <section>
          <h4>거래유형</h4>
          <div className="chip-row">
            {chips1.map((c,i)=>(<Chip key={c} label={c} active={t1===i} onClick={()=>setT1(i)}/>))}
          </div>
        </section>

        <section>
          <h4>기간</h4>
          <div className="chip-row">
            {chips2.map((c,i)=>(<Chip key={c} label={c} active={t2===i} onClick={()=>setT2(i)}/>))}
          </div>
          <div className="field-row" aria-label="기간 입력">
            <div className="field">
              <input type="date" value={start} onChange={e=>setStart(e.target.value)} />
            </div>
            <span>~</span>
            <div className="field">
              <input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
            </div>
          </div>
        </section>

        <section>
          <h4>정렬</h4>
          <div className="chip-row">
            {chips3.map((c,i)=>(<Chip key={c} label={c} active={t3===i} onClick={()=>setT3(i)}/>))}
          </div>
        </section>
      </div>
      <div className="sheet-footer">
        <button className="btn" onClick={onReset}>초기화</button>
        <button className="btn btn--primary" onClick={onClose}>14건의 내역 보기</button>
      </div>
    </div>
  )
}
