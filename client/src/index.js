import React from 'react';
import App from 'app/app';
import 'styles/scss/reset.scss';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from 'tests/reportWebVitals';
import AppWrapper from 'components/helpers/appWrapper';
import * as serviceWorkerRegistration from 'tests/serviceWorkerRegistration';
import 'styles/global/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.unregister();