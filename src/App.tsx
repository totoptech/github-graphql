import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RepositoryPage from "./pages/RepositoryPage";
import { client } from "./apollo";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:user" element={<UserPage />} />
          <Route path="/:user/:repo" element={<RepositoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
