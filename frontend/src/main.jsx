import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import { Provider } from 'react-redux'
import Store from './store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter>
    <ScrollToTop/>
      <App />
    </BrowserRouter>
  </Provider>,
)
