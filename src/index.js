import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-qtfsn8g3.eu.auth0.com

//koH5iWSgp0GXGhx9CeW7qujt0HGSYyIb

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qtfsn8g3.eu.auth0.com"
      clientId="koH5iWSgp0GXGhx9CeW7qujt0HGSYyIb"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
