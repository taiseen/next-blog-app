import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import React from 'react';


// this component display at the TOP scrolling bar article 
// this component call from 🟨 ../sections/FeaturedPosts.js 🟨 <Component />
const FeaturedPostCard = ({ post }) => (

    <div className="relative h-72">

        <div style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
            className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" />

        <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />


        <div className="absolute w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">

            <p className="text-white mb-4 text-shadow font-semibold text-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>

            <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
                {post.title}
            </p>

            <div className="flex items-center justify-center absolute w-full bottom-5">
                <Image
                    unoptimized
                    width="30px"
                    height="30px"
                    alt={post?.author?.name}
                    src={post?.author?.photo?.url}
                    className="align-middle drop-shadow-lg rounded-full"
                />
                <p className="inline align-middle text-white text-shadow ml-2 font-medium">
                    {post?.author?.name}
                </p>
            </div>
        </div>

        {
            // Link for going to at ==> 🟨../pages/post/[slug].js🟨 <Component />
            // for details viewing about this post...
        }
        <Link href={`/post/${post.slug}`} passHref>
            <span className="cursor-pointer absolute w-full h-full" />
        </Link>

    </div>
);

export default FeaturedPostCard;