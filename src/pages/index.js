import { Categories, PostCard, PostWidget } from '../components'
import { FeaturedPosts } from '../sections';
import { getPosts } from '../services';
import Head from 'next/head'


// data fetch/come from ==> getStaticProps()
// & pass into this <Component/> as a props ==> { posts }
export default function Home({ posts }) {

  return (

    <div className='container mx-auto px-10 mb-8'>

      <Head>
        <title>Blog App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/blog.ico" />
      </Head>


      {/* 🟨🟨🟨 UI For ==> scrolling post at the top... */}
      <FeaturedPosts />


      {/* 🟨🟨🟨 UI For ==> main holder... */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* 🟨🟨🟨 UI For ==> all new post... */}
        <div className="col-span-1 lg:col-span-8">
          {
            posts?.map((post, i) =>
              // Child <Component /> call by looping... 🔄
              <PostCard post={post} key={i} />
            )
          }
        </div>


        {/* 🟨🟨🟨 UI For ==> side panel for category post's... */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>

      </div>
      
    </div>

  )
}

// ✅ SSG ==> Fetch data at build time 
export async function getStaticProps() {

  // get data from server |OR| default value ==> [empty array]
  // get data from this EndPoint... 🟨 at ../service/index.js 🟨 File
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
