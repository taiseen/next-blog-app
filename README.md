30 - Apr - 2022

## Blog App | [Live Link](https://blogs-demo.vercel.app)

# Next Js + Tailwind CSS + [GraphQL CMS](https://app.graphcms.com)

For creating `Model's` & their corresponding `Data Field's` go to https://app.graphcms.com

## 4 Different DB Model's & their data fields
|No| DB Models  | Schema or Data fields into Model         |
|--|------------|------------------------------------------|
| 1| `category` | 1. name <br/> 2. slug                    |
| 2| `comment`  | 1. name <br/> 2. email <br/> 3. comment  |
| 3| `author`   | 1. name <br/> 2. bio <br/> 3. photo      |
| 4| `post`     | 1. title <br/> 2. slug <br/> 3. excerpt <br/> 4. content <br/> 5. featured post <br/> 6. featured image <br/> 7. author - `OneToMany` <br/> 8. category - `ManyToMany` <br/> 9. comment - `ManyToOne` |


<br/>

# Yarn | Needful Dependencies
|No| Package Installs               | Usage of                                                      |
|--|--------------------------------|---------------------------------------------------------------|
| 1| yarn add `sass`                | A pure JavaScript implementation of Sass                      |
| 2| yarn add `moment`              | Parse, validate, manipulate, & display dates                  |
| 3| yarn add `graphql`             | A Query Language & Runtime which can target any service       |
| 4| yarn add `graphql-request`     | Minimal GraphQL client supporting Node & browsers for scripts |
| 5| yarn add `tailwindcss`         | A utility-first CSS framework for building custom UI          |
| 6| yarn add `autoprefixer`        | Parse CSS & add vendor prefixes to CSS rules                  |
| 7| yarn add `postcss`             | Tool for transforming styles with JS plugins                  |
| 8| yarn add `html-react-parser`   | HTML to React parser.                                         |
| 9| yarn add `react-multi-carousel`| Production-ready, fully customizable React carousel component |

<br/>

# Learning context by building this project:
|No| Context learn by doing this project...                    | 
|--|-----------------------------------------------------------|
| 1| Dynamic Routing                                           | 
| 2| File Base Routing                                         | 
| 3| Folder Structure                                          | 
| 4| Layout Architecture                                       | 
| 5| Tailwind CSS + SASS                                       | 
| 7| Data fetching from `GraphQL`                              | 
| 8| `GraphQL Query` writing pattern                           | 
| 9| `GraphQL Query` with function ( `parameter` ) writing pattern  | 
|10| TailwindCSS class applying - based on `if/else` condition      | 
|11| get`Static`Paths() ==> `SSG` ( statically `pre-render all the paths` )         | 
|12| get`Static`Props() ==> `SSG` ( `pre-render` fetching data at `build time` )    | 
|13| 1 `<Component/>` call from 2 different place - `without` props + `with` props  | 


<br/>

## GraphQL Query Called by `<Component/>`'s...
|No| `<Component/>` List   | Location                     |  GraphQL Query Function   |
|--|-----------------------|------------------------------|---------------------------|
| 1| index.js              | getStatic`Props()`           | getPosts( )               | 
| 2| /post/`[slug]`.js     | getStatic Props({`params`})  | getPostDetails(`slug`)    |
| 3| /post/`[slug]`.js     | getStatic`Paths()`           | getPosts( )               | 
| 4| /category/`[slug]`.js | getStatic Props({`params`})  | getCategoryPost(`slug`)   | 
| 5| /category/`[slug]`.js | getStatic`Paths()`           | getCategories( )          | 
| 6| Header                | `useEffect`                  | getCategories( )          | 
| 7| Categories            | `useEffect`                  | getCategories( )          | 
| 8| AdjacentPosts         | `useEffect`                  | getAdjacentPosts(`createdAt`, `slug`) | 
| 9| FeaturedPosts         | `useEffect`                  | getFeaturedPosts( )       | 
|10| Comments              | `useEffect`                  | getComments(`slug`)       | 
|11| PostWidget            | `useEffect`                  | getSimilarPosts(`slug`, `categories`) + getRecentPosts( ) |

<br/>

Background Resource : https://www.svgbackgrounds.com


# Blog App | Demo 
<img src='https://i.ibb.co/g7DGgmc/Blog-App.jpg' />

Learning by inspired from[.](https://youtu.be/HYv55DhgTuA)