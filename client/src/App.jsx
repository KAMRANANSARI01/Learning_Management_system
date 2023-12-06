
import './App.css'
import { Route , Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import AboutPage from "./Pages/AboutPage.jsx"
import NotFound from './Pages/NotFound.jsx'
import SignUp from './Pages/signUp.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App;
