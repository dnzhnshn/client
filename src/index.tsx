import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <StoreProvider>
      <App />
    </StoreProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
