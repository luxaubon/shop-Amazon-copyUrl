"use client"

import { useSession,signOut } from "next-auth/react";
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import FromModal from "@/components/FromModal";

function Navbar() {

  const { data: session } = useSession();
  const [isOpenDropMenu, setIsOpenDropMenu] = useState<boolean>(false);
  const transClass = isOpenDropMenu ? "flex" : "hidden";
  const toggle = () => {
    setIsOpenDropMenu(old => !old);
    setTimeout(() => {
      setIsOpenDropMenu(false);
    }, 5000);
  }
  
  return (
    <>
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            Price<span className='text-primary'>Wise</span>
           
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {session ?  <>
              <div className="relative">
                <button className="hover:text-blue-400" onClick={toggle} >Welcome {session?.user?.email}</button>
                <div className={`absolute top-8 z-30 w-[90px] min-h-[30px] flex flex-col py-4 bg-zinc-400 rounded-md ${transClass}`}>
                    <p
                        className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-2 rounded-md"
                        onClick={() => signOut()}
                    >Logout</p>
                </div>
            </div>

            </> : (
            <>
              <Image src='/assets/icons/search.svg' alt='search' width={28} height={28} className="object-contain" />
              <Image src='/assets/icons/black-heart.svg' alt='heart' width={28} height={28} className="object-contain" />
              
              <FromModal ActionType='image' />
             
            </>
            )
          }

        </div>
      </nav>
    </header>

      
    </>
  )
}

export default Navbar