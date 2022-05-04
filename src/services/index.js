import { request, gql } from 'graphql-request';
// where to query ==> "request"
// what to query ==> "gql"

// we can call these function as ==> Data EndPoint's...

// Server URL 🔗 + API KEY 🔑 stor in graphqlAPI variable...
// graphqlAPI variable, use in every graphQL Query Request...
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_END_POINT;


// 1) ✅ creat a query for ==> Get Posts... (All Posts)
// this function call from 🟨../pages.index.js🟨 <Component />
export const getPosts = async () => {

  // 🟩 ==> what do we want to fetch from this query...?
  const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                id
                name
                bio
                photo {
                  url
                }
              }
              createdAt
              title
              slug
              excerpt
              featuredImage {
                url
              }
              categories {
                id
                slug
              }
            }
          }
        }
      }
    `;

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // 🟩 after fetching data from GraphQL, send it to FrontEnd...
  return result.postsConnection.edges;
};



// 2) ✅ creat a query for ==> Get Recent Posts...
// this function call from 🟨../components/PostWidget.js🟨 <Component />
export const getRecentPosts = async () => {

  // 🟩 ==> what do we want to fetch from this query...?
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // 🟩 after fetching data from GraphQL, send it to FrontEnd...
  return result.posts;
};



// 3) ✅ creat a query for ==> Get Similar Posts...
// this function call from 🟨../components/PostWidget.js🟨 <Component />
// this query endPoint receive parameter's at calling time... 
// & base on that parameter | query at GraphQL 
export const getSimilarPosts = async (slug, categories) => {

  // 🟩 ==> what do we want to fetch from this query...?
  const query = gql`
    query GetPostDetails( $slug: String!, $categories: [String!] ) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories} } }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  // slug_not <== dont display current article... 
  // categories_some <== but display these articles...

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug, categories });

  // 🟩 after fetching data from GraphQL, send it to FrontEnd...
  return result.posts;
};



// 4) ✅ creat a query for ==> Get Categories...
// this function call from 🟨../components/Categories.js🟨 <Component />
export const getCategories = async () => {

  // 🟩 ==> what do we want to fetch from this query...?
  const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `;

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // 🟩 after fetching data from GraphQL, send it to FrontEnd...
  return result.categories;
};



// 5) ✅ creat a query for ==> Get Categories...
// this function call from 🟨../pages/post/[slug].js🟨 <Component />
// this query endPoint receive a parameter at calling time... 
// & base on that parameter | query at GraphQL 
export const getPostDetails = async (slug) => {

  // 🟩 ==> what do we want to fetch from this query...?
  const query = gql`
    query GetPostDetails( $slug: String! ) {
      post( where: { slug: $slug } ) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug });

  // 🟩 after fetching data from GraphQL, send it to FrontEnd...
  return result.post;
};



// 6) ✅ creat POST function for ==> Submit Comment
// this function call from 🟨../components/CommentsForm.js🟨 <Component />
export const submitComment = async (obj) => {

  // backEnd api endpoint...
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  });

  return result.json();
};


// 4) ✅ creat a query for ==> Get Comments...
// this function call from 🟨../components/Comments.js🟨 <Component />
export const getComments = async (slug) => {

  const query = gql`
    query GetComments( $slug: String! ) {
      comments( where: { post: { slug: $slug } } ) {
        name
        createdAt
        comment
      }
    }
  `;

  // 🟩 ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug });

  // 🟩 after fetching data from GraphQL, send it to FrontEnd..
  return result.comments;
};





export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};