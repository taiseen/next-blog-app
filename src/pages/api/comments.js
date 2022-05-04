/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
import { GraphQLClient, gql } from 'graphql-request';


// Server URL 🔗 + API KEY 🔑 stor in graphqlAPI variable...
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_END_POINT;


// export a default function for API route to work
export default async function comments(req, res) {

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

  // mutation ==> update || add some new data in graphQL
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {

      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  // 🟩 ==> from where we want to send this query...?
  const result = await graphQLClient.request(query, req.body);
  //  {
  //   name: req.body.name,
  //   email: req.body.email,
  //   comment: req.body.comment,
  //   slug: req.body.slug,
  // });

  // 🟩 after sending data into GraphQL, send it to FrontEnd...
  return res.status(200).send(result);
}
