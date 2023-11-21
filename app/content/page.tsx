
"use client"

import { useState,useEffect } from "react";
import React from 'react'
import ContentCard from '@/components/ContentCard'
import { useGlobalContext } from "@/app/context/store";
import useSWR from 'swr';

interface Props {
    id: string
    name: string
    coverimage: string
    detail: string
    latitude: number
    longitude: number
}


    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

  function page() {


    const [post, setPost] = useState([])
    const {search,setSearch} = useGlobalContext();

    const [perpage, setPerpage] = useState<number>(6);
    const [totalpage, setTotalpage] = useState<number>(0);

    const { data, error } = useSWR(`https://www.melivecode.com/api/attractions?page=1&per_page=${perpage}&search=${search}`, fetchData);

    useEffect(() => {
        if (data) {
            setTotalpage(data.total);
            setPost(data.data);
        }
    }, [data,search,perpage]);


    return (
        <>
            <section className="trending-section">
                <h2 className="section-text">Travel Contents</h2>

                <div className="flex flex-wrap gap-x-8 gap-y-16">
                    {post.length === 0 && <h1 className="text-2xl text-center">No Data</h1>}
                    {post?.map((data : Props) => (
                        <ContentCard key={data.id} content={data} />
                    ))}
                    <div className="w-full flex justify-center">
                        {perpage < totalpage && (
                            <>
                            <button className="btn btn-primary" onClick={() => setPerpage(perpage+6)}>Load More</button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page