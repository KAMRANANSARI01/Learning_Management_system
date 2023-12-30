
import './App.css'
import { Route , Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import AboutPage from "./Pages/AboutPage.jsx"
import NotFound from './Pages/NotFound.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App;
