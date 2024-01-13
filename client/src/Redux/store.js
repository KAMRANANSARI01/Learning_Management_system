import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./Slices/AuthSlice.js"
import CourseSliceReducer from "./Slices/CourseSlice.js";
import razorpaySliceReducer from "./Slices/PaymentSlice.js";
import lectureSliceReducer from "./Slices/LectureSlice.js";
import statSliceReducer from "./Slices/StatSlice.js";

const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        course : CourseSliceReducer,
        razorpay : razorpaySliceReducer,
        lecture : lectureSliceReducer,
        stat : statSliceReducer
    },
    devTools : true
})

export default store;


//configureStore takes two property reducers and second devtools. now we will add store in main.jsx by provider and then make slices