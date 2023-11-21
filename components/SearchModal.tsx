import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,useCallback } from 'react'
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Image from 'next/image'
import { useGlobalContext } from "@/app/context/store";

  interface Props {
    ActionType: string
  }
  
function SearchModal() {
    
    const {search,setSearch} = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [text, setText] = useState('');

    const handleText = () => {
         setIsLoading(true);
         setText('')
         setSearch(text);
         setIsLoading(false);
    }
  return (
    <>
        <Image src='/assets/icons/search.svg' alt='search' width={28} height={28} className="object-contain" onClick={openModal} />

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
                          <div className="p-3">
                            {/* <CiSearch /> */}
                          </div>
                          <Image src="/assets/icons/x-close.svg" alt="close" width={24} height={24} className="cursor-pointer" onClick={closeModal} />
                        </div>
                      </div>

                        <form className="flex flex-col mt-5" >
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Search Product Name
                          </label>
                          <div className="dialog-input_container">
                            <MdOutlineProductionQuantityLimits />
                            <input 
                              type="text"
                              placeholder="Product Name"
                              className='dialog-input'
                              onChange={(e) => setText(e.target.value)}
                            />
                          </div>
                          
                          <button 
                            type='button'
                            className="dialog-btn"
                            onClick={handleText}
                          >
                            {isLoading ? 'Please Wait...' : 'Search'}
                          </button>
                        </form>
                     
                </div>
                </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        
    </>
  )
}

export default SearchModal