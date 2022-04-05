// import { useState, useContext, Fragment, useEffect } from 'react'
// import classnames from 'classnames'
// import Avatar from '@components/avatar'
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'
// import { useDispatch } from 'react-redux'
// import { useForm } from 'react-hook-form'
// import { toast, Slide } from 'react-toastify'
// import { handleLogin } from '@store/actions/auth'
// import { AbilityContext } from '@src/utility/context/Can'
// import { Link, useHistory } from 'react-router-dom'
// import InputPasswordToggle from '@components/input-password-toggle'
// import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
// import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
// import {
//   Alert,
//   Row,
//   Col,
//   CardTitle,
//   CardText,
//   Form,
//   Input,
//   FormGroup,
//   Label,
//   CustomInput,
//   Button,
//   UncontrolledTooltip
// } from 'reactstrap'
// import axios from 'axios'
// import '@styles/base/pages/page-auth.scss'
// import 'react-toastify/dist/ReactToastify.css'
// import app from '../../../base'
// import { getAuth, signInWithCustomToken } from "firebase/auth"
// // import { AuthContext } from '../../../Auth'
// const loginAuthID = localStorage.getItem('loginId')

// const ToastContent = ({ name, role }) => (
//   <Fragment>
//     <div className='toastify-header'>
//       <div className='title-wrapper'>
//         <Avatar size='sm' color='warning' icon={<Coffee size={12} />} />
//         <h6 className='toast-title font-weight-bold' style={{color:"#ffffff"}}> {name}</h6>
//       </div>
//     </div>
//     {/* <div className='toastify-body'>
//       <span>You have successfully logged in as an {role}. Now you can start to explore. Enjoy!</span>
//     </div> */}
//   </Fragment>
// )

// const Login = props => {
//   const [skin, setSkin] = useSkin()
//   const ability = useContext(AbilityContext)
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const [phone, setPhone] = useState('')
//   const [password, setPassword] = useState('')
//   const [mobileexist, setExistMobile] = useState()
// const [logindata, setLoginData] = useState()
//   const { register, errors, handleSubmit } = useForm()
//   const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
//     source = require(`@src/assets/images/pages/${illustration}`).default

// console.log(phone)
// console.log(mobileexist)

// if (mobileexist && mobileexist.data && mobileexist.data.data && mobileexist.data.data.password === null) {
//   const sendotp = 'http://172.105.49.15:3030/api/user/send_otp'
//   axios.post(sendotp, {
//     mobile_number: phone.toString()
//   })
//   .then(r => {
//     console.log(r)
//     toast(
//       <ToastContent name={r.data.message} role={''} />,
//         { transition: Slide, hideProgressBar: true, autoClose: 2000 }
//     )
//     props.history.push({pathname:'/login-otp',
//   state:{
//     id : mobileexist.data.data._id,
//     mobile : phone
//   }
// })
//     // setExistMobile(r)
//   })
//  } 
// const handlePhone = (e) => {
//   setPhone(e.target.value)
//   e.preventDefault()
// }

//   const checkmobiurl = 'http://172.105.49.15:3030/api/user/check_mobile_number_exist'
//   useEffect(() => {
//     axios.post(checkmobiurl, {
//       mobile_number: phone.toString()
//     })
//     .then(r => {
//       console.log(r)
//       setExistMobile(r)
//     })
//   }, [phone])

//     // localStorage.setItem('loginId', mobileexist && mobileexist.data && mobileexist.data._id)

// const authIdToken = ""
//   const onSubmit = (data) => {
//     setLoginData(data)
//     if (mobileexist && mobileexist.data && mobileexist.data.data && mobileexist.data.data.password !== null) {
//     dispatch(handleLogin(data, props))
//     }
//     data = {role : "admin"}
//     history.push(getHomeRouteForLoggedInUser(data.role))
//     // dispatch(handleLogin(data, props))
//     // if (isObjEmpty(errors)) {
//     //   useJwt
//     //     .login({ phone, password })
//     //     .then(res => {
//     //       const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
//     //       // dispatch(handleLogin(data))
//     //       ability.update(res.data.userData.ability)
//     //       // toast.success(
//     //       //   <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
//     //       //   { transition: Slide, hideProgressBar: true, autoClose: 2000 }
//     //       // )
//     //     })
//     //     .catch(err => {
//     //       console.log(err.message)
//     //       toast.error(
//     //         <ToastContent name={"Incorrect user number or password"} role={''} />,
//     //           { transition: Slide, hideProgressBar: true, autoClose: 2000 }
//     //       )
//     //     })
//     // }
//   }

//   return (
//     <div className='auth-wrapper auth-v2'>
//       <Row className='auth-inner m-0'>
//         <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
//         </Link>
//         <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
//           <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
//             <img className='img-fluid' src={source} alt='Login V2' />
//           </div>
//         </Col>
//         <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
//           <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
//             <h1 style={{textShadow:"2px 1px", color:"rgb(230,46,45)", fontSize:"35px", fontWeight:300}}> Star Engineers</h1>
//             <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
          
//             <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
//               <FormGroup>
//                 <Label className='form-label' for='login-phone'>
//                 Mobile Number
//                 </Label>
//                 <Input
//                   autoFocus
//                   type='text'
//                   value={phone}
//                   id='login_phone'
//                   name='login_phone'
//                   placeholder='Enter Mobile Number'
//                   maxLength="10"
//                   onChange={e => handlePhone(e)}
//                   // className={classnames({ 'is-invalid': errors['login_phone'] })}
//                   innerRef={register({ 
//                     required: true,
//                     pattern:{value:/[1-9]{1}[0-9]{9}/,
//                     message:"please enter your 10 digit mobile number"}
//                  })}
//                 />
//                  {/* {errors.login_phone && <p style={{color:"red"}}>{errors.login_phone.message}</p>} */}
//                  {errors.login_phone && errors.login_phone.type === 'required' && <p style={{color:"red"}}>Mobile Number is require</p>}
//                  {/* {  phone ? mobileexist && mobileexist.data && mobileexist.data.data === null ? <p style={{color:"red"}}>Mobile Number Not Exist</p> : "" : ""} */}
//               </FormGroup> 

//               { mobileexist && mobileexist.data && mobileexist.data.data && mobileexist.data.data.password !== null ? <FormGroup>
//                 <div className='d-flex justify-content-between'>
//                   <Label className='form-label' for='login-password'>
//                     Password
//                   </Label>
                 
//                 </div>
//                 <InputPasswordToggle
//                   value={password}
//                   id='login_password'
//                   name='login_password'
//                   className='input-group-merge'
//                   onChange={e => setPassword(e.target.value)}
//                   // className={classnames({ 'is-invalid': errors['login_password'] })}
//                   innerRef={register({ 
//                     required: true,
//                     message:"please enter your valid password"
//                   })}
//                 />
//                   {errors.login_password && <p style={{color:"red"}}>{errors.login_password.message}</p>}
//               </FormGroup> : " "
//               }
             
//               <Button.Ripple type='submit' color='primary' block>
//                 Sign in
//               </Button.Ripple>
//             </Form>
//             <p className='text-right mt-2'>
       
//               <Link to='/forgot-password'>
//                 <span>Forgot Password ?</span>
//               </Link>
//             </p>
          
//           </Col>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default Login

import { useState, useContext, Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import logo  from '../../../Images/logo.svg'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { useDispatch } from 'react-redux'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'

const LoginV1 = props => {
  const { register, errors, handleSubmit } = useForm()
    const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)
    // setLoginData(data)
    // if (mobileexist && mobileexist.data && mobileexist.data.data && mobileexist.data.data.password !== null) {
    dispatch(handleLogin(data, props))
    // }

    // data = {role : "admin"}
    // history.push(getHomeRouteForLoggedInUser(data.role))

  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0' >
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={logo}  height="40px" ></img>
            {/* {logo} */}
              {/* <h2 className='brand-text text-primary ml-1'>Vuexy</h2> */}
            </Link>
            {/* <CardTitle tag='h4' className='mb-1'>
              Welcome to Vuexy! 👋
            </CardTitle> */}
            {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}

            <Form className='auth-login-form mt-2'  onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='email-id'> Email </Label>
                <Input
                  autoFocus
                  type='text'
                  id='email_id'
                  name='email_id'
                  placeholder='Enter register email-id'
                  innerRef={register({ 
                    required: true,
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email'
                  }
                 })} />
                  {errors.email_id && <p style={{color:"red"}}>{errors.email_id.message}</p>}  

                 {/* {errors.email_id && errors.email_id.type === 'required' && <p style={{color:"red"}}>Please Enter email-id</p>} */}
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  // className={classnames({ 'is-invalid': errors['login_password'] })}
                  innerRef={register({ 
                    required: true,
                    message:"please enter your valid password"
                  })}
                />
                  {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}  
                </FormGroup>
              <FormGroup className="d-flex">
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='' /><label >By continuing you agree to <Link to='/pages' style={{color:"#ed1d25" }}>
                <span>Terms & Conditions</span> </Link></label>
              </FormGroup>
              <Button.Ripple    type='submit' className="sign_in_btn" block>
                Sign in
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginV1
