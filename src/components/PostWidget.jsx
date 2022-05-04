import { getSimilarPosts, getRecentPosts } from '../services';
import { graphCMSImageLoader } from '../services/utils';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';


// this component call from 🟨index.js🟨 <Component />
const PostWidget = ({ categories, slug }) => {

  const [relatedPosts, setRelatedPosts] = useState([]);


  // fetch data from GraphQL inside this useEffect
  // by the help of if() condition...
  useEffect(() => {
    if (slug) {
      // for already Opening post, to display | related other posts...
      // is it a similar post??? know it by "category"
      getSimilarPosts(slug, categories).then(posts => setRelatedPosts(posts));
    } else {
      // we are on the Home page... so...
      // for Home page display | recent posts...
      getRecentPosts().then(posts => setRelatedPosts(posts));
    }
  }, [slug]);
  // when "slug" change re-run this <Component /> again


  return (
    <div className="p-4 pb-12 mb-8 bg-white shadow-lg rounded-lg">

      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>

      {
        relatedPosts.map((post, index) => {

          const { title, featuredImage, slug, createdAt } = post;



          return (

            // Link for going to at ==> 🟨../pages/post/[slug].js🟨 <Component />
            // for details viewing about this post...
            <Link
              passHref
              key={index}
              href={`/post/${slug}`}
            >
              <div className="w-full mb-4 px-4 pt-2 flex items-center cursor-pointer rounded-md
              hover:bg-gray-200 duration-400" >

                {/* 🟨 For Image */}
                <div className="w-16 flex-none">
                  <Image
                    unoptimized
                    alt={title}
                    width="60px"
                    height="60px"
                    src={featuredImage.url}
                    loader={graphCMSImageLoader}
                    className="align-middle rounded-full"
                  />
                </div>

                {/* 🟨 For Date + Post Link */}
                <div className="flex-grow ml-4">

                  <p className="text-gray-500 font-xs">
                    {moment(createdAt).format('MMM DD, YYYY')}
                  </p>

                  <p className="text-md"> {title} </p>
                </div>

              </div>
            </Link>
          )
        })
      }
    </div >
  );
};

export default PostWidget;
