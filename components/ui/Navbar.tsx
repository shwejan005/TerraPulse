import { silkScreen } from '@/app/layout';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Sprout } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';


function Navbar() {
  return (
    <div className='border-b'>
      <div className='flex min-w-screen h-14 items-center px-4 container mx-auto'>
            <Link href='/' className='flex items-center gap-3 text-4xl text-green-700 mr-6 hover:opacity-90 transition-opacity'>
              <Sprout />  
                <h1 className={`${silkScreen.className} bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent`}>TERRAPULSE</h1>
            </Link>
        <SignedIn>
          <div className='flex items-center space-x-5 ml-auto'>
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar;