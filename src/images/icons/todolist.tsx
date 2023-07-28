import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width={64} height={64} {...props}>
    <g
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1,
      }}
    >
      <path
        d="M73.4 90H16.6C14 90 12 88 12 85.3V18c0-2.6 2-4.7 4.6-4.7h10.7a1 1 0 0 1 0 2H16.6A2.7 2.7 0 0 0 14 18v67.3c0 1.5 1.1 2.7 2.6 2.7h56.8c1.5 0 2.6-1.2 2.6-2.7V18c0-1.5-1.1-2.7-2.6-2.7H62.7a1 1 0 1 1 0-2h10.7c2.6 0 4.6 2.1 4.6 4.7v67.3c0 2.6-2 4.7-4.6 4.7z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: '#000',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.4 1.4)"
      />
      <path
        d="M62.7 20H27.3a1 1 0 0 1-1-1v-5.6c0-3.6 3-6.5 6.5-6.5h3.6a8.7 8.7 0 0 1 17.2 0h3.6c3.6 0 6.5 3 6.5 6.5V19c0 .5-.5 1-1 1zm-34.4-2h33.4v-4.6c0-2.5-2-4.5-4.5-4.5h-4.5a1 1 0 0 1-1-.9 6.7 6.7 0 0 0-13.4 0c0 .5-.5 1-1 1h-4.5c-2.5 0-4.5 2-4.5 4.4V18zM27.2 39.6a1 1 0 0 1-.8-.5l-3.2-5a1 1 0 0 1 1.7-1l2.5 3.9 6.4-7.1a1 1 0 0 1 1.5 1.3l-7.3 8a1 1 0 0 1-.8.4zM27.2 59.1a1 1 0 0 1-.8-.4l-3.2-5a1 1 0 0 1 1.7-1l2.5 3.8 6.4-7.1a1 1 0 0 1 1.5 1.3L28 58.8a1 1 0 0 1-.8.3zM27.2 78.7a1 1 0 0 1-.8-.5l-3.2-5a1 1 0 0 1 1.7-1l2.5 3.8 6.4-7a1 1 0 0 1 1.5 1.3l-7.3 8a1 1 0 0 1-.8.4zM66 36H42.2a1 1 0 0 1 0-2H66a1 1 0 1 1 0 2zM66 55.5H42.2a1 1 0 1 1 0-2H66a1 1 0 1 1 0 2zM66 75H42.2a1 1 0 1 1 0-2H66a1 1 0 1 1 0 2z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: '#000',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.4 1.4)"
      />
    </g>
  </svg>
)

export const Todolist = memo(SvgComponent)
