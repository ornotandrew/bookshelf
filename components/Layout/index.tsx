import { Nav } from '@/components/Nav'
import styles from './index.module.css'

export const Layout = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
      
      <div className={[styles.Container, className].join(' ')}>
<Nav />
        {children}</div>
  )
}

export default Layout
