"use client"

import { useSession,signOut } from "next-auth/react";
import Image from 'next/image'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";

import FromModal from "@/components/FromModal";
import SearchModal from "@/components/SearchModal";

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
  
  const [nav, setNav] = useState(false);
  const links = [
    {id: 1,link:'/',name: "Home",},
    {id: 2,link:'/content',name: "Travel Contents",},
    // {id: 3,link:'#',name: "portfolio",},
    // {id: 4,link:'#',name: "experience",},
    {id: 5,link:'/contact',name: "contact",},
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100;
      setIsScrolled(scrollTop > scrollThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <>
  

    <div className={`flex justify-between items-center w-full h-20 px-4 text-black bg-white ${isScrolled ? 'fixed' : ''} nav z-50`}>
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
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
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link,name }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-[16px] hover:text-[#ff0366] hover:font-bold duration-200 link-underline"
          > 
            <Link href={link}>{name}</Link>
          </li>
        ))}
         <li className=" px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 link-underline" >||</li>
        {session ?  <>
              <div className="relative">
                <button className="nav-links px-4 cursor-pointer capitalize font-medium text-[16px] hover:text-[#ff0366] hover:font-bold duration-200 link-underline" onClick={toggle} >Welcome {session?.user?.email}</button>
                <div className={`absolute top-8 z-30 w-[90px] min-h-[30px] flex flex-col py-4 text-gray-500 bg-zinc-200 rounded-md ${transClass}`}>
                    <p
                        className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-2 rounded-md"
                        onClick={() => signOut()}
                    >Logout</p>
                </div>
            </div>
            </> : (
            <>
              <li className=" px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 link-underline" >
                <SearchModal />
              </li>
              {/* <Image src='/assets/icons/black-heart.svg' alt='heart' width={28} height={28} className="object-contain" /> */}
              <li className=" px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 link-underline" >
                <FromModal ActionType='image' />
              </li>
             
            </>
            )
          }

      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link,name }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
      
    </>
  )
}

export default Navbar