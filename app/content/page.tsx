
import React from 'react'
import ContentCard from '@/components/ContentCard'

interface Props {
    id: string
    name: string
    coverimage: string
    detail: string
    latitude: number
    longitude: number
}
  async function getPost() {
    const res = await fetch(`https://www.melivecode.com/api/attractions`)
    const post = await res.json()
   
    return post
  }
  
  async function page() {
    const post = await getPost();
    return (
        <>
            <section className="trending-section">
            <h2 className="section-text">Travel Contents</h2>

            <div className="flex flex-wrap gap-x-8 gap-y-16">
                    {post?.map((data : Props) => (
                        <ContentCard key={data.id} content={data} />
                    ))}
            </div>
            </section>
        </>
    )
}

export default page