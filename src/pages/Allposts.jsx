import React from 'react'
import { PostCard } from '../components'
import services from '../appwrite/config'
import { useEffect, useState } from 'react'
import { Container } from '../components'


export default function Allposts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
      services.getPosts([]).then((posts)=>{
        if(posts)
        {
            setPosts(posts.documents)
        }
    })
    },[])
   
   
  return (
  <div className=' w-full py-8 '>
  <Container>
  <div className='flex flex-wrap justify-center'>
  {posts.map((post)=>
    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-3/10 xl:w-1/5 '>
       <PostCard {...post}/>
    </div>
    )}
  </div>
  </Container>
  </div>
  )
}
