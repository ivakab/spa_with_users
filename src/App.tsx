import { Route, BrowserRouter, Routes } from "react-router-dom";
import { UserListPage } from "./pages/UserListPage/UserListPage";
import { UserDetailsPage } from "./pages/UserDetailsPage/UserDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
