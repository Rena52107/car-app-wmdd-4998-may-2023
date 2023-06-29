import "antd/dist/reset.css";
import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
