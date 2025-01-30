"use client"

import { silkScreen } from '@/app/layout';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Sprout } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';  // Import usePathname hook

function Navbar() {
  const pathname = usePathname();  // Get the current pathname

  return (
    <div className='border-b'>
      <div className='flex min-w-screen h-14 items-center px-4 container mx-auto'>
        <Link href='/' className='flex items-center gap-3 text-4xl text-green-700 mr-6 hover:opacity-90 transition-opacity'>
          <Sprout />  
          <h1 className={`${silkScreen.className} bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent`}>
            TERRAPULSE
          </h1>
        </Link>

        <SignedIn>
          <div className='flex items-center space-x-5 ml-auto'>
            <div className='ml-auto flex space-x-4 text-green-500 '>
              <Link href='/fields' className='hover:text-green-600'>Fields</Link>
              <Link href='/weather' className='hover:text-green-600'>Weather</Link>
              <Link href='/marketplace' className='hover:text-green-600'>Marketplace</Link>
            </div>
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar;