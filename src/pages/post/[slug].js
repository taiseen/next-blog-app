import {
    PostDetail, Categories, PostWidget, Author,
    Comments, CommentsForm, Loader
} from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { AdjacentPosts } from '../../sections';
import { useRouter } from 'next/router';
import Head from 'next/head'


// data fetch/come from ==> getStaticProps({ params })
// & pass into this <Component/> as a props ==> { post }
// this <Component/> call by 🟨 Browser URL /post/PARAMETER... 🟨 
const PostDetails = ({ post }) => {

    const router = useRouter();
    // const { title, author, slug, createdAt, categories } = post;

    if (router.isFallback) {
        return <Loader />;
    }


    return (
        <>

            <Head>
                <title>{post?.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/blog.ico" />
            </Head>

            <div className="container mx-auto px-10 mb-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author author={post?.author} />
                        <AdjacentPosts slug={post?.slug} createdAt={post?.createdAt} />
                        <CommentsForm slug={post?.slug} />
                        <Comments slug={post?.slug} />
                    </div>

                    {/* 🟢 UI ==> For Sidebar */}
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget
                                slug={post?.slug}
                                categories={post?.categories.map(category => category.slug)}
                            />
                            <Categories />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
export default PostDetails;



// SSG ==> Fetch data at build time
// params ==> is URL slug, that we can access here as an argument...
// slug ==> is a unique URL for a specific resource...
export async function getStaticProps({ params }) {

    // get data from this EndPoint... 🟨 at ../service/index.js 🟨 File
    const data = await getPostDetails(params.slug);

    return {
        props: {
            post: data,
        },
    };
}



// When we have Dynamic URL to access then we also need ==> getStaticPaths() 
// For specify Dynamic Routes to Pre-Render Pages based on data.
// The HTML is generated at build time and will be reused on each request.
// Next-Js has to research for all of the Dynamic Paths...
// so that it can Dynamically Render them...
export async function getStaticPaths() {

    // get data from this EndPoint... [ at ../service/index.js File ]
    const posts = await getPosts();

    return {
        // 2 Level Destructuring... 
        // (post) ====> ({ node }) ====> ({ node: { slug } })
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        // paths <==== all of the possible paths are set into it...
        fallback: true,
    };
}
