import { request, gql } from 'graphql-request';
// where to query ==> "request"
// what to query ==> "gql"

// we can call these function as ==> Data EndPoint's...

// Server URL ð + API KEY ð stor in graphqlAPI variable...
// graphqlAPI variable, use in every graphQL Query Request...
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_END_POINT;


// 1) â creat a query for ==> Get Posts... (All Posts)
// this function call from ðš../pages.index.jsðš <Component />
export const getPosts = async () => {

  // ð© ==> what do we want to fetch from this query...?
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

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // ð© after fetching data from GraphQL, send it to FrontEnd...
  return result.postsConnection.edges;
};



// 2) â creat a query for ==> Get Recent Posts...
// this function call from ðš../components/PostWidget.jsðš <Component />
export const getRecentPosts = async () => {

  // ð© ==> what do we want to fetch from this query...?
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

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // ð© after fetching data from GraphQL, send it to FrontEnd...
  return result.posts;
};



// 3) â creat a query for ==> Get Similar Posts...
// this function call from ðš../components/PostWidget.jsðš <Component />
// this query endPoint receive parameter's at calling time... 
// & base on that parameter | query at GraphQL 
export const getSimilarPosts = async (slug, categories) => {

  // ð© ==> what do we want to fetch from this query...?
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

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug, categories });

  // ð© after fetching data from GraphQL, send it to FrontEnd...
  return result.posts;
};



// 4) â creat a query for ==> Get Categories...
// this function call from ðš../components/Categories.jsðš <Component />
// this function call from ðš../page/category/[slug].jsðš <Component />
export const getCategories = async () => {

  // ð© ==> what do we want to fetch from this query...?
  const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `;

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query);

  // ð© after fetching data from GraphQL, send it to FrontEnd...
  return result.categories;
};



// 5) â creat a query for ==> Get Categories...
// this function call from ðš../pages/post/[slug].jsðš <Component />
// this query endPoint receive a parameter at calling time... 
// & base on that parameter | query at GraphQL 
export const getPostDetails = async (slug) => {

  // ð© ==> what do we want to fetch from this query...?
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

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug });

  // ð© after fetching data from GraphQL, send it to FrontEnd...
  return result.post;
};



// 6) â creat POST function for ==> Submit Comment | this function send data into GraphQL
// this function call from ðš../components/CommentsForm.jsðš <Component />
export const submitComment = async (obj) => {

  // HTTP request to our own BackEnd api endpoint... 
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  });

  return result.json();
};


// 7) â creat a query for ==> Get Comments...
// this function call from ðš../components/Comments.jsðš <Component />
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

  // ð© ==> from where we want to fetch this query...?
  const result = await request(graphqlAPI, query, { slug });

  // ð© after fetching data from GraphQL, send it to FrontEnd..
  return result.comments;
};



// 8) â creat a query for ==> Category Post...
// this function call from ðš../page/category/[slug].jsðš <Component />
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



// 9) â creat a query for ==> Featured Posts...
// this function call from ðš../sections/FeaturedPosts.jsðš <Component />
export const getFeaturedPosts = async () => {

  const query = gql`
    query GetCategoryPost( ) {
      posts( where: { featuredPost: true } ) {
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


// 10) â creat a query for ==> Adjacent Posts...
// this function call from ðš../sections/AdjacentPosts.jsðš <Component />
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

