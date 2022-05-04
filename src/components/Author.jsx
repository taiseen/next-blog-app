import { graphCMSImageLoader } from '../services/utils';
import Image from 'next/image';


// this component call from 🟨 ../pages/post/[slug].js 🟨 <Component />
const Author = ({ author }) => {

  const { name, bio, photo } = author;

  return (

    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">

      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          width="100px"
          height="100px"
          alt={name}
          src={photo.url}
          loader={graphCMSImageLoader}
          className="align-middle rounded-full"
        />
      </div>

      <h3 className="text-white mt-4 mb-4 text-xl font-bold"> {name} </h3>
      <p className="text-white text-ls"> {bio} </p>

    </div>
  );
}

export default Author;
