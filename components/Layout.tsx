import React from 'react'
import Nav from 'components/Nav'

export default function Layout({ children, contentClass = '' }: { children: any; contentClass?: string }) {
  return (
    <div className='w-full h-full flex'>
      <Nav className='w-56' />
      <div className='flex-col overflow-scroll'>
        <section
          className={
            'h-screen p-12  ' + contentClass + (' -mr-56')
          }
        >
          {children}
        </section>
      </div>
    </div>
  )
}
