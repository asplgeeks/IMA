// ** UseJWT import to get config
import { useState, useContext, Fragment, useEffect } from 'react'
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
import axiosConfig from '../../../axiosConfig'
import Swal from 'sweetalert2'

import { data } from 'jquery'
import Avatar from '@components/avatar'
import {useHistory} from 'react-router-dom'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import app from './../../../base'
import { getAuth, signInWithCustomToken } from "firebase/auth"
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'


// import firebase from "firebase/app";
// import "firebase/auth";

// export const FB_CONFIG = {
//     apiKey: "AIzaSyCwB63I1xIoTJIlyz1VKkqUwQiMI-xC43k",
//     authDomain: "ima-india-dev.firebaseapp.com",
//     projectId: "ima-india-dev",
//     // storageBucket: "ima-india-dev.appspot.com",
//     // messagingSenderId: "1097438200753",
//     appId: "1:1097438200753:web:ae7d84e71819fb0ed63390",
// }

// const firebaseApp = firebase.initializeApp(FB_CONFIG);
// export const firebase_auth = firebaseApp.auth();


// const config = useJwt.jwtConfig
// const loginAuthID = localStorage.getItem('loginId')
// console.log(loginAuthID)
let result

const tosterContent = (props) => {
  console.log(props)
  return (
    <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'> {props}</h6>
      </div>
    </div>
    {/* <div className='toastify-body'>
      <span>You have successfully logged in as an {role}. Now you can start to explore. Enjoy!</span>
    </div> */}
  </Fragment>
  )
}

// export const forIdToken = () => {
// app.auth().currentUser.getIdToken(false).then(function (Token) {
// return Token
// })
// }


// console.log(forIdToken())

const authIdToken = ""

// ** Handle User Login
export const handleLogin = (data, props) => {
  const email = data.email_id
  const password = data.password
  app.auth().signInWithEmailAndPassword(email, password)
  .then((user_info) => {
console.log(user_info)
    localStorage.setItem("fbUserId", JSON.stringify(user_info.user.uid))
    console.log("login data", user_info.user.uid)

    axiosConfig.put(`/user/getIdByEmail`, {
      email: data.email_id 
    }) 
    .then(r => {
  if (r.data.success === 1) {
      localStorage.setItem("user_id", JSON.stringify(r.data.user.id))
      props.history.push('/')

  } else {
      // toast.error(r.data.message, 
      // {position: toast.POSITION.TOP_RIGHT})
      Swal.fire({
        title: 'Error!',
        text: 'There is no user record corresponding to this identifier. The user may have been deleted.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#EE3224'
      })
  }
  })
})
.catch(err => {
// console.log("err", err)
// alert("Number not exist")
Swal.fire({
  title: 'Error!',
  text: 'There is no user record corresponding to this identifier. The user may have been deleted.',
  icon: 'error',
  confirmButtonText: 'Try Again',
  confirmButtonColor: '#EE3224'
})
})
return dispatch => {
  dispatch({
    type: 'LOGIN',
    data
    // config,
    // [config.storageTokenKeyName]: data[config.storageTokenKeyName],
    // [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
  })
  // ** Add to user, accessToken & refreshToken to localStorage

  // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
  // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
}
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    // app.auth().signOut().then(() => {
    // //  alert("signout successfull")
    // }).catch((error) => {
    //   // An error happened.
    // })
    // dispatch({ type: 'LOGOUT'
    // //  [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null 
    // })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('user_id')
    localStorage.removeItem('fbUserId')

    // localStorage.removeItem(config.storageTokenKeyName)
    // localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}

export const handleForgotPassword = (props, data) => {
const getuserid = null
  axios.post(`http://172.105.49.15:3030/api/user/check_mobile_number_exist`, {
    mobile_number:data.login_phone
    // password:data.password
})
.then(r => { 
  console.log(r)
 const getuserid = r.data.data._id
   if (r.data !== null) {
    axios.post(`http://172.105.49.15:3030/api/user/send_otp`, {
      mobile_number:data.login_phone
      // password:data.password
  })
  .then(r => {
    console.log(r)
    console.log(getuserid)
    props.history.push({pathname:'/otp',
    state : {
     mobile : data.login_phone,
     id: getuserid
    }
  })
  toast.success(r.data.message, 
    {position: toast.POSITION.TOP_RIGHT})
  })
 
  // toster("we'll send you instructions to reset your password")

  // toast(
  //   <tosterContent name={"we'll send you instructions to reset your password"} role={''}/>,
  //   { transition: Slide, hideProgressBar: true, autoClose: 2000 }
  // )
 

  } else {
    toast.warning("Mobile number not exist", 
    {position: toast.POSITION.TOP_RIGHT})
  }
  })


  return dispatch => {
    dispatch({ type: 'Create_New', data })
  }
}

export const SendOtp = (data, props) => {
  console.log(data, props)
    axios.post('http://172.105.49.15:3030/api/user/check_otp', {
      otp:data.login_otp

    })
    .then(r => {   
      console.log(r)
      if (r.data.status === false) {
        toast.warning(r.data.message, 
        {position: toast.POSITION.TOP_RIGHT})
      } else {
        toast.success(r.data.message, 
        {position: toast.POSITION.TOP_RIGHT})
      props.history.push({pathname:'/resetpassword',
      state:props.location.state.id
    })
      }
 
  })
    .catch(err => err)

  return dispatch => {
    dispatch({ type: 'Otp', data })
  }
}

export const CreatePassword = (data, props) => {
  console.log(props && props.location && props.location.state)
  axios.post('http://172.105.49.15:3030/api/user/create_password', {
    id:props && props.location && props.location.state,
    password:data.password
  })
  .then(r => {   
    console.log("resetresponce", r)
    toast.success(r.data.message, 
    {position: toast.POSITION.TOP_RIGHT})
  props.history.push('/login')
})
  .catch(err => err)

return dispatch => {
  dispatch({ type: 'Otp', data })
}
}