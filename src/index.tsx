import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloProvider } from "@apollo/client/react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const client = new ApolloClient({
    uri: "http://localhost:5001/graphql",
    credentials: "include",
    cache: new InMemoryCache({
        resultCaching: false,
    }),
});

root.render(
    <React.StrictMode>
        <Provider store={configureStore()}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <ErrorBoundary>{[<App key="App" />]}</ErrorBoundary>
                </ApolloProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
