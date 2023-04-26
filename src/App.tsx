import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <Route path="/home" element={<HomePage />} />
          <Route path="/github/:user" element={<UserPage />} />
          <Route path="/github/:user/:repo" element={<RepositoryPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
