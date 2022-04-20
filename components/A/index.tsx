import { forwardRef, RefAttributes } from 'react'
import styles from './index.module.css'

interface Props {
  href?: string
  openInNewTab?: boolean
  className?: string
  onClick?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
  children?: React.ReactNode
}

const A: React.FC<Props & RefAttributes<HTMLAnchorElement>> =
  forwardRef<HTMLAnchorElement>(
    (
      { href, openInNewTab = true, className = '', onClick, children }: Props,
      ref
    ) => (
      <a
        ref={ref}
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        rel='noreferrer'
        onClick={onClick}
        className={[className, styles.A].join(' ')}
      >
        {children}
      </a>
    )
  )

A.displayName = 'A'

export default A
