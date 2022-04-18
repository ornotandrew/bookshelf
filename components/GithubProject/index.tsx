import A from '@/components/A'
import Image from 'next/image'
import githubLogo from '@/public/github.svg'
import styles from './index.module.css'

export function GithubProject({ user, repo }: { user: string; repo: string }) {
  const slug = `${user}/${repo}`
  return (
    <A href={`https://github.com/${slug}`} className={styles.A}>
      <Image src={githubLogo} width={16} height={16} alt='GitHub' />
      {slug}
    </A>
  )
}

export default GithubProject
