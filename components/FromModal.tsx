"use client"

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,useCallback } from 'react'
import { FaBahai,FaRegAddressCard } from 'react-icons/fa';
import { BsBookmark } from "react-icons/bs";

interface Props {
  ActionType: string
}

function FromModal( {ActionType} : Props) {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repassword,setRepassword] = useState('');
    
    const [activeForm, setActiveForm] = useState('login');
    const toggleForm = (formName : string ) => {
        setActiveForm(formName);
    };

    const login = useCallback(async () => {
        try {
          const testData = await signIn('credentials', {
                  email,
                  password,
                  //callbackUrl: '/'
          });
        } catch (error) {
          console.log(error);
        }
    }, [email, password]);

    const handregister = useCallback( async () => {
    
        if(!email || !username || !password){
            alert('please fill all field');
            return;
        }
        if(password != repassword){
            alert('password not match');
            return;
        }
        try{
            setIsLoading(true);
            const dataRegister = {
                email,
                username,
                password
            }
            const user = await axios.post('/api/register',dataRegister)
            setIsLoading(false);
            login();
        }catch(err){
            console.log(err)
        }
    }, [email,password]);


  return (
    <> 

    {ActionType == 'image' ? (
        <Image src='/assets/icons/user.svg' alt='user' width={28} height={28} 
           className="object-contain"
           onClick={openModal} />
    ) : ActionType  === 'BsBookmark' ? (
            <BsBookmark onClick={openModal}/>
    ) : null}
    

    <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="dialog-container" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" /> 
            </Transition.Child>
              <span 
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              />
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="dialog-content">
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <div className="p-3 border border-gray-200 rounded-10">
                            {/* <FaUserCircle /> */}
                          </div>
                          <Image src="/assets/icons/x-close.svg" alt="close" width={24} height={24} className="cursor-pointer" onClick={closeModal} />
                        </div>
                      </div>

                      {activeForm === 'login' && (
                        <form className="flex flex-col mt-5">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Login to Favorite
                          </label>
                          <div className="dialog-input_container">
                            <FaRegAddressCard />
                            <input 
                              type="text"
                              // id="username"
                              placeholder="Username"
                              className='dialog-input'
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="dialog-input_container">
                            <FaBahai />
                            <input 
                              type="text"
                              // id="password"
                              placeholder="Password"
                              className='dialog-input'
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="dialog-input_container flex items-center justify-between">
                              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                onClick={() => toggleForm('register')}
                              >Register</a>
                              
                              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                          </div>

                          <button type="button"
                            className="dialog-btn"
                            onClick={login}
                          >
                            {isLoading ? 'Loading Please Wait...' : 'Login'}
                          </button>
                        </form>
                      )}

                    {activeForm === 'register' && (
                      <form className="flex flex-col mt-5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Register to Favorite
                        </label>
                        <div className="dialog-input_container">
                          <FaRegAddressCard />
                          <input 
                            type="text"
                            // id="username"
                            placeholder="Email"
                            className='dialog-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="dialog-input_container">
                          <FaRegAddressCard />
                          <input 
                            type="text"
                            // id="username"
                            placeholder="Username"
                            className='dialog-input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="dialog-input_container">
                          <FaBahai />
                          <input 
                            type="text"
                            // id="password"
                            placeholder="Password"
                            className='dialog-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="dialog-input_container">
                          <FaBahai />
                          <input 
                            type="text"
                            // id="recheck-password"
                            placeholder="recheck-password"
                            className='dialog-input'
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                          />
                        </div>

                        <div className="dialog-input_container flex items-center justify-between">
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                              onClick={() => toggleForm('login')}
                            >Back</a>
                        </div>

                        <button type="button"
                          className="dialog-btn"
                          onClick={handregister}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading Please Wait...' : 'Login'}
                        </button>
                      </form>
                    )}
                      
                </div>
                </Transition.Child>
            </div>
          </Dialog>
        </Transition>
     </>
  )
}

export default FromModal