import React from 'react';
import logo from './logo.svg';
import './App.css';
import MiniDrawer from './components/Drawer/Drawer';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/authantication/Login';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
function App() {
  return (
    <div className="App">
   
    
    <RouterProvider router={router} />
   
    </div>
  );
}

export default App;
