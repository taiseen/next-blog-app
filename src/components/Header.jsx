import { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';


// this component call from 🟨Layout.js🟨 <Component />
const Header = () => {

    const [categories, setCategories] = useState([]);

    // fetch data from GraphQL inside this useEffect
    // & store this data into useState local [array] variable
    // for populate data into this <Component /> at JSX (ui)
    useEffect(() => {
        getCategories().then(newCategories => setCategories(newCategories));
    }, []);


    return (
        <div className="container mx-auto px-10 mb-8">

            <div className="inline-block py-8 w-full border-b border-blue-400">

                <div className="block md:float-left">
                    <Link href="/" passHref>
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Blog by GraphCMS
                        </span>
                    </Link>
                </div>

                {/* only from medium device ==> display this div || in small device its hide */}
                {/* create a phantom container by ==> contents */}
                <div className="hidden md:float-right md:contents">
                    {
                        // pint all category at UI that fetch from GraphQL...
                        categories.map((category, index) => (
                            <Link
                                passHref
                                key={index}
                                href={`/category/${category.slug}`}
                            >
                                <span className="mt-2 ml-4 align-middle font-semibold text-white cursor-pointer md:float-right">
                                    {category.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;