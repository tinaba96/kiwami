import '../styles/globals.css'
import Layout from '../comps/Layout'
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './features/store';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

axios.defaults.baseURL = 'http://localhost:3333'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}

export default MyApp
