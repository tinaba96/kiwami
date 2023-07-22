import Footer from "./Footer"
import Navbar from "./Navbar"
import { Provider } from 'react-redux'
import store from '../pages/features/store';

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
    <div className="content">
      <Navbar />
      { children }
      <Footer />
    </div>
    </Provider>
  );
}
 
export default Layout;