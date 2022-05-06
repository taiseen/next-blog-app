import { useState, useEffect } from 'react';
import { submitComment } from '../services';


// this component call from 🟨 ../pages/post/[slug].js 🟨 <Component />
const CommentsForm = ({ slug }) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      comment: '',
      storeData: false
    }
  );


  useEffect(() => {

    setLocalStorage(window.localStorage);

    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name')
        || window.localStorage.getItem('email'),
    };

    setFormData(initialFormData);
  }, []);



  // only handle user input values...
  // & store into useState variable...
  const onInputChange = (e) => {

    const { target } = e;

    if (target.type === 'checkbox') {
      setFormData(prevState => (
        {
          ...prevState,
          // only for getting checkBox ✅✅✅ value
          [target.name]: target.checked,
        }
      ));
    } else {
      setFormData(prevState => (
        {
          ...prevState,
          // for all normal input 🟨🟨🟨 values
          [target.name]: target.value,
        }
      ));
    }
  };



  // when user 👆 click the "Post Comment" Button
  // these step's are execute...
  const handlePostSubmission = () => {

    setError(false);
    // data destructure from useState variable...
    const { name, email, comment, storeData } = formData;

    if (!name || !email || !comment) {
      setError(true); // show to user an ERROR message by JSX...
      return; // ❌ stop this function ❌ execution from here... ❌
    }

    // creating comment object...
    const commentObj = { name, email, comment, slug, };

    // if user want to save 💾 the data into localStorage...
    // if user click at checkBox ✅ for --> stor data... into localStorage...
    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    // set data at GraphQL server...
    // from this EndPoint... 🟨 at ../service/index.js 🟨 File
    submitComment(commentObj).then(res => {
      if (res.createComment) {

        // if user ❗not click click at checkBox ✅ for --> stor data...
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';

        setFormData(prevState => (
          {
            ...prevState,
            ...formData,
          }
        ));

        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">

      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>

      {/* UI For Textarea 🟨🟨🟨 */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>

      {/* UI For Name + Email 🟨🟨🟨 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>

      {/* UI For Check Box ✅✅✅  */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            value="true"
            id="storeData"
            type="checkbox"
            name="storeData"
            onChange={onInputChange}
            checked={formData.storeData}
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2">
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>

      {
        error &&
        <p className="text-xs text-red-500">
          All fields are mandatory
        </p>
      }

      {/* UI For Button 🟨🟨🟨 */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          Post Comment
        </button>

        {
          showSuccessMessage &&
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        }
      </div>

    </div>
  );
};

export default CommentsForm;