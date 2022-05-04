const Loader = () => (

    <div className="text-center">

        <button
            disabled=""
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
        >
            <svg
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            >
                <circle
                    r="10"
                    cx="12"
                    cy="12"
                    strokeWidth="4"
                    stroke="currentColor"
                    className="opacity-25" />

                <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>

            Loading...
        </button>
    </div>
);

export default Loader;