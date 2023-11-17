
"use client"

import { useState,useEffect } from "react";
import React from 'react'
import ContentCard from '@/components/ContentCard'
import { useGlobalContext } from "@/app/context/store";

interface Props {
    id: string
    name: string
    coverimage: string
    detail: string
    latitude: number
    longitude: number
}

  
  function page() {

    const [post, setPost] = useState([])
    const {search,setSearch} = useGlobalContext();

    useEffect(() => {
        const getPost = async () => {
            if(search === ''){
                const res = await fetch(`https://www.melivecode.com/api/attractions`)
                const post = await res.json()
                setPost(post)
            }else{
                const res = await fetch(`https://www.melivecode.com/api/attractions?search=${search}`)
                const post = await res.json()
                setPost(post)
            }
        }
        getPost();
    },[search])

    return (
        <>
            <section className="trending-section">
                <h2 className="section-text">Travel Contents</h2>

                <div className="flex flex-wrap gap-x-8 gap-y-16">
                    {post.length === 0 && <h1 className="text-2xl text-center">No Data</h1>}
                    {post?.map((data : Props) => (
                        <ContentCard key={data.id} content={data} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default page