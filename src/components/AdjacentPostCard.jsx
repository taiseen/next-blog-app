import Link from 'next/link';
import moment from 'moment';


const AdjacentPostCard = ({ post, position }) => (

    <>
        <div
            style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
            className="absolute inline-block w-full h-72 bg-center bg-no-repeat bg-cover shadow-md rounded-lg"
        />

        <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />

        <div className="absolute w-full h-full p-4 rounded-lg 
        flex flex-col items-center justify-center">
            <p className="text-white text-shadow font-semibold text-xs">
                {
                    moment(post.createdAt).format('MMM DD, YYYY')
                }
            </p>
            <p className="text-white text-shadow font-semibold text-2xl text-center">
                {post.title}
            </p>
        </div>

        <Link href={`/post/${post.slug}`} passHref>
            <span className="absolute w-full h-full z-10 cursor-pointer" />
        </Link>


        {
            position === 'LEFT' && (

                <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 left-4 rounded-full">

                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-full text-white"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </div>
            )
        }


        {
            position === 'RIGHT' && (

                <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 right-4 rounded-full">

                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-full text-white"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            )
        }
    </>
);

export default AdjacentPostCard;
