import React from 'react'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'

function Navbar() {
  return (
    <nav className='min-h-12 min-w-screen justify-between'>
        <div>
            <Button>
                Hi
            </Button>
        </div>
        <div className='flex items-center justify-center'>
            <UserButton />
        </div>
    </nav>
  )
}

export default Navbar