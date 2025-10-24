
import React, { useState } from 'react'

interface Section { title: string; items: string[] }
export default function Accordion({ sections }: { sections: Section[] }){
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      {sections.map((sec, i)=>{
        const isOpen = open===i
        return (
          <section key={i} className="acc-section" aria-expanded={isOpen}>
            <div className="acc-header">
              <span>{sec.title}</span>
              <button aria-label={isOpen? '접기':'펼치기'} onClick={()=> setOpen(isOpen? null : i)}>{isOpen ? '▾' : '▸'}</button>
            </div>
            <div className={`acc-list ${isOpen ? 'open':''}`}>
              {sec.items.map((it, idx)=>(
                <div key={idx} className="acc-item">{it}</div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
