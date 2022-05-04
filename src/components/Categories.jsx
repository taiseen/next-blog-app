import { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';


// this component call from 🟨index.js🟨 <Component />
const Categories = () => {

  const [categories, setCategories] = useState([]);

  // fetch data from GraphQL inside this useEffect
  // & store this data into useState local [array] variable
  // for populate data into this <Component /> at JSX (ui)
  useEffect(() => {
    getCategories().
      then(newCategories => {
        setCategories(newCategories);
      });
  }, []);


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">

      <h3 className="text-xl mb-4 font-semibold border-b pb-4">
        Categories
      </h3>

      { // loop over categories[array]
        categories.map((category, index) => (

          // Link for going to at ==> 🟨../pages/category/[slug].js🟨 <Component />
          // for details viewing about this post...
          <Link
            passHref
            key={index}
            href={`/category/${category.slug}`}
          >
            <span className={`block pb-3 mb-3 cursor-pointer hover:text-red-400 duration-200
            ${(index === categories.length - 1)
                ? 'border-b-0'
                : 'border-b'
              }`
            }>
              {category.name}
            </span>
          </Link>
        ))
      }
    </div>
  );
};

export default Categories;
