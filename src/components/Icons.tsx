import React from 'react';

export const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
  </svg>
);

// export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
//     <path d="M12 3a6 6 0 0 0-6 6v3.8l-1.4 2.4a1 1 0 0 0 .9 1.5h13a1 1 0 0 0 .9-1.5L18 12.8V9a6 6 0 0 0-6-6Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
//     <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.5"/>
//   </svg>
// );

export const IconLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}>
    <path
      d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.43"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.33-1.33"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const IconCopy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 0 1024 1024"
  >
    <path
      fill="#000000"
      d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
    />
    <path
      fill="#000000"
      d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
    />
  </svg>
);
