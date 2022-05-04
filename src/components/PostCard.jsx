import { graphCMSImageLoader } from '../services/utils';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';


// this component call from 🟨index.js🟨 <Component />
const PostCard = ({ post }) => {

  // just print all of the "key's" from post.node object{}
  // console.log(Object.keys(post.node));

  const { author, createdAt, title, slug, excerpt, featuredImage, categories } = post.node;
  const { name, photo } = author;
  const { url } = featuredImage;


  return (
    <div className='p-0 lg:p-8 pb-12 mb-8 bg-white shadow-lg rounded-lg'>

      {/* 🟢 A Holder Div only for Image... */}
      <div className='relative pb-80 mb-6 shadow-md overflow-hidden'>
        <img
          src={url}
          alt={title}
          className="absolute h-80 w-full object-cover object-top 
          shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      {/* 🟢 For ==> opening details about this post... */}
      <h1 className="mb-8 text-center text-3xl font-semibold cursor-pointe 
      transition duration-600 hover:text-pink-600">
        {
          // Link for going to at ==> 🟨../pages/post/[slug].js🟨 <Component />
          // for details viewing about this post...
        }
        <Link href={`/post/${slug}`}>
          {title}
        </Link>
      </h1>

      {/* 🟢 For ==> User Name + Image */}
      <div className="block w-full mb-8 text-center lg:flex items-center justify-center">
        <div className="w-full lg:w-auto mb-4 lg:mb-0 mr-8 flex items-center justify-center">
          <Image
            unoptimized
            width="30px"
            height="30px"
            alt={name}
            src={photo.url}
            loader={graphCMSImageLoader}
            className="align-middle rounded-full"
          />
          <p className="inline ml-2 align-middle text-gray-700 font-medium text-lg">
            {name}
          </p>
        </div>


        {/* 🟢 For ==> Calender Icon + Date */}
        <div className="font-medium text-gray-700">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="inline h-6 w-6 mr-2 text-pink-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(createdAt).format('MMM DD, YYYY')}
          </span>
        </div>

      </div>

      {/* 🟢 For ==> snippet of post text */}
      <p className="px-4 lg:px-20 mb-8 text-center text-lg text-gray-700 font-normal">
        {excerpt}...
      </p>

      {/* 🟢 For ==> continue button */}
      <div className="text-center">
        {
          // Link for going to at ==> 🟨../pages/post/[slug].js🟨 <Component />
          // for details viewing about this post...
        }
        <Link href={`/post/${slug}`} passHref>
          <span className="inline-block px-8 py-3 bg-pink-600 text-white text-lg font-medium rounded-full  cursor-pointer transition duration-500 ease transform hover:-translate-y-1">
            Continue Reading
          </span>
        </Link>
      </div>

    </div>
  )
}

export default PostCard