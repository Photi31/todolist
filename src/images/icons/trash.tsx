import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={16} fill="none" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.3 3.4c1.3-.2 2.7-.2 4-.2 2.3 0 4.5 0 6.7.3a.5.5 0 0 1 0 1 67.3 67.3 0 0 0-10.6-.1H1a.5.5 0 0 1 0-1h1.3Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m5.3 2.5-.1.9a.5.5 0 0 1-1-.2l.1-.8c0-.4.1-.8.4-1C5 1 5.5.7 6.1.7H8c.6 0 1 .2 1.4.5.3.3.3.8.4 1l.1 1a.5.5 0 1 1-1 .1l-.1-.9c0-.3-.1-.4-.2-.5 0 0-.1-.2-.6-.2H6c-.5 0-.6.1-.6.2l-.2.5ZM11.6 5.6c.3 0 .5.3.5.5l-.5 6.7v.8l-.4.8c-.4.6-1 .8-2 .8H4.8c-1 0-1.7-.2-2.1-.8-.2-.2-.3-.5-.3-.8l-.1-.7L1.9 6a.5.5 0 1 1 1 0l.5 6.7v.6l.2.4c.1.2.4.4 1.3.4H9c1 0 1.2-.2 1.3-.4l.2-.4v-.6l.5-6.7c0-.3.2-.5.5-.5Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.4 11c0-.3.2-.5.5-.5H8a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM4.8 8.3c0-.2.3-.5.5-.5h3.4a.5.5 0 0 1 0 1H5.3a.5.5 0 0 1-.5-.5Z"
      clipRule="evenodd"
    />
  </svg>
)

export const Trash = memo(SvgComponent)
