import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <section className="card">{children}</section>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="card-title">{children}</h2>;
}
