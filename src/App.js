import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./frontend/Admin";
import Login from "./frontend/Login";
import Create from "./frontend/Create";
import Read from "./frontend/Read";
import Update from "./frontend/Update";
import AdminView from "./frontend/AdminView";
import Welcome from "./frontend/Welcome";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full bg-blue-600 py-4">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome to DataStack
        </h1>
        <h3 className="text-lg text-center text-white mt-2">
          An RBAC Application
        </h3>
      </header>
      <main className="w-full max-w-6xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create" element={<Create />} />
            <Route path="/read/:name" element={<Read />} />
            <Route path="/edit/:name" element={<Update />} />
            <Route path="/admin-view" element={<AdminView />} />
            <Route path="/welcome/:username" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
