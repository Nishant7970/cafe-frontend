
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import Admin from './components/Admin';
import Home from './components/Home';
import OrderPage from './components/OrderPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order/:productId" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App
