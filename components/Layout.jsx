import Header from './Header';

// this component use from 🟨_app.js🟨 <Component />
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
