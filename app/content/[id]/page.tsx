import React from 'react'

type Props = {
  params : { id: string }
}

export async function generateStaticParams() {
  const res = await fetch(`https://www.melivecode.com/api/attractions/static_paths`)
  const posts = await res.json()
  return posts;
}

async function getPost(params : { id: string }) {
  const res = await fetch(`https://www.melivecode.com/api/attractions/${params.id}`)
  const post = await res.json()
  return post
}

async function page({params : { id }} : Props) {
  const post = await getPost({id});
  return (
    <>
    <section className="text-gray-700 body-font">
    <div className="container mx-auto flex px-12 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{post.attraction.name}
          <br className="hidden lg:inline-block" />Travel
        </h1>
        <p className="mb-8 leading-relaxed">{post.attraction.detail}</p>
        <div className="flex justify-center">
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
          <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Button</button>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img 
              src={post.attraction.coverimage}
              alt={post.attraction.name}
              className="object-cover object-center rounded"
            />
      </div>
    </div>
  </section>

    </>
  )
}

export default page