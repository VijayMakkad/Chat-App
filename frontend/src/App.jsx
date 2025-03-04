import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react"

const App = () => {
  const{authUser,checkAuth,isCheckingAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)

  if(isCheckingAuth && !authUser)return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="w-10 h-10 animate-spin"/>
    </div>
  )

  return (
    <div>

        <Navbar/>
        <Routes>
          <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/settings" element={<SettingPage/>}/>
          <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>

    </div>
  );
};

export default App;
