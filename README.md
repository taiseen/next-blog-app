30 - Apr - 2022

## Blog App | [Live Link](www)

# Next Js + Tailwind CSS + [GraphQL CMS](https://app.graphcms.com)

For creating `Model's` & their corresponding `Data Field's` go to https://app.graphcms.com

## 4 Different DB Model's & their data fields
|No| DB Models  | Schema or Data fields into Model          |
|--|------------|-------------------------------------------|
| 1| `category`   | 1. name <br/> 2. slug                     |
| 2| `comment`    | 1. name <br/> 2. email <br/> 3. comment   |
| 3| `author`     | 1. name <br/> 2. bio <br/> 3. photo       |
| 4| `post`       | 1. title <br/> 2. slug <br/> 3. excerpt <br/> 4. content <br/> 5. featured post <br/> 6. featured image <br/> 7. author - `OneToMany` <br/> 8. categories - `ManyToMany` |


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

# Learning Context From This Project:
|No| Context learn by doing this project...                    | 
|--|-----------------------------------------------------------|
| 1| Dynamic Routing                                           | 
| 2| File Base Routing                                         | 
| 3| Folder Structure                                          | 
| 4| Layout Architecture                                       | 
| 5| Tailwind CSS + SASS                                       | 
| 7| Data fetching from `GraphQL`                              | 
| 8| `GraphQL Query` writing pattern                           | 
| 9| `GraphQL Query` with function (parameter) writing pattern | 
|10| TailwindCSS class applying - based on `if/else` condition | 
|10| get`Static`Paths() ==> `SSG` ( statically `pre-render all the paths` )     | 
|10| get`Static`Props() ==> `SSG` ( `pre-render` fetching data at `build time` )| 
|10| get`ServerSide`Props() ==> `SSR` ( fetching data at `each user request` )  |


Learning by inspired from[.](https://youtu.be/HYv55DhgTuA)
