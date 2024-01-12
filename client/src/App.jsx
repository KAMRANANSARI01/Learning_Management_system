
import './App.css'
import { Route , Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import AboutPage from "./Pages/AboutPage.jsx"
import NotFound from './Pages/NotFound.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import CourseList from './Pages/Course/CourseList.jsx'
import ContactPage from './Pages/ContactPage.jsx'
import Denied from './Pages/Denied.jsx'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import RequiredAuth from './Component/Auth/RequiredAuth.jsx'
import CreateCourse from './Pages/Course/CreateCourse.jsx'
import UserProfile from './Pages/User/UserProfile.jsx'
import EditProfile from './Pages/User/EditProfile.jsx'
import Checkout from './Pages/Payment/Checkout.jsx'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.jsx'
import CheckoutFail from './Pages/Payment/CheckoutFail.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/course" element={<CourseList/>}></Route>        
        <Route path="/course/description" element={<CourseDescription/>}></Route>        
        <Route path="/contact" element={<ContactPage/>}></Route>        
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/denied" element={<Denied/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* accessable only for admin */}
        <Route element={<RequiredAuth allowedRoles={["ADMIN"]}/>}>
           <Route path='/course/create' element={<CreateCourse/>}/>
        </Route>
        <Route element={<RequiredAuth allowedRoles={["ADMIN","USER"]}/>}>
           <Route path='/user/profile' element={<UserProfile/>}/>
           <Route path='/user/editprofile' element={<EditProfile/>}/>
           <Route path='/checkout' element={<Checkout/>}/>
           <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
           <Route path='/checkout/fail' element={<CheckoutFail/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
