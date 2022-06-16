import A from '@/components/A'
import Link from 'next/link'
import styles from './index.module.css'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'Currently reading' },
  { href: '/books', label: 'Finished books' },
  { href: '/stats', label: 'Stats' },
]

export const Nav = () => {
  const router = useRouter()
  return (
    <nav className={styles.Nav}>
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            {href === router.pathname ? (
              <span className={styles.CurrentPage}>{label}</span>
            ) : (
              <Link href={href} passHref>
                <A openInNewTab={false}>{label}</A>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
