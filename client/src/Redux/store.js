import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./Slices/AuthSlice.js"
import CourseSliceReducer from "./Slices/CourseSlice.js";
import razorpaySliceReducer from "./Slices/PaymentSlice.js";

const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        course : CourseSliceReducer,
        razorpay : razorpaySliceReducer
    },
    devTools : true
})

export default store;


//configureStore takes two property reducers and second devtools. now we will add store in main.jsx by provider and then make slices