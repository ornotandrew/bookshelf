import styles from './index.module.css'

export const A = ({
  href,
  className = '',
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <a href={href} target='_blank' rel='noreferrer' className={[className, styles.A].join(' ')}>
      {children}
    </a>
  )
}

export default A
