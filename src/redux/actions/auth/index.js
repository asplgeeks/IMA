// ** UseJWT import to get config
import { useState, useContext, Fragment, useEffect } from 'react'
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
import { data } from 'jquery'
import Avatar from '@components/avatar'
import {useHistory} from 'react-router-dom'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import app from './../../../base'
import { getAuth, signInWithCustomToken } from "firebase/auth"
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'

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
  console.log(data)
  axios.put(`http://65.1.145.79/user/userLogin`, {
    email:data.email_id,
    password:data.password
   }, 
  {
 auth: {
    username: "asuWorks",
    password: "ergbhjwfvbhjkegvfvkgbhjbhjksfdgvsdjfvhnklhnjklhjkSJKHhjkBHJKbhjkhjkkjBHJvHJKBHJK"
  }
}) 
.then(r => {
  console.log(r)
  if (r.data.status === true) {
    console.log("sadasd", r)
    props.history.push('/dashboard')
    
    localStorage.setItem('loginId', r.data)
    localStorage.setItem('token', r.data.token)
    
    // localStorage.setItem('userData', JSON.stringify(data))
  } else {
    toast.error(r.data.message, 
      {position: toast.POSITION.TOP_RIGHT})
  }

//   const Token = r.data.token
//   console.log("loginToken", Token)
//   app.auth().signInWithCustomToken(Token)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user
//       console.log('User login successfully', userCredential)
//     })
//     .catch((error) => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       console.log('User login fail')
//       console.log(errorMessage)
//     })
//   .then(function () {
//    app.auth().currentUser.getIdToken(false).then(function (Token) {
//      sessionStorage.setItem('id_token', Token)
//      console.log(Token)
//    })
// })
// .catch(function (error) {
//    console.log("error", error)
// })

})
.catch(err => {
// alert("Number not exist")
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
    app.auth().signOut().then(() => {
    //  alert("signout successfull")
    }).catch((error) => {
      // An error happened.
    })
    dispatch({ type: 'LOGOUT'
    //  [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null 
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
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