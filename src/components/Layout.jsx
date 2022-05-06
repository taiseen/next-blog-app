import Header from './Header';

// this component use from 🟨_app.js🟨 <Component />
const Layout = ({ children }) => (

  <>

    {/* This Header <Component /> is always persist in the UI */}
    <Header />
  
    {children}
  
  </>
);

export default Layout;
