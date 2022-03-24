import { useState, useContext, Fragment, useEffect } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { SendOtp } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { withRouter } from 'react-router'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import OtpInput from "react-otp-input"
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    {/* <div className='toastify-body'>
      <span>You have successfully logged in as an {role}. Now you can start to explore. Enjoy!</span>
    </div> */}
  </Fragment>
)

const OtpOnLogin = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [phone, setPhone] = useState(props && props.location && props.location.state && props.location.state.login_phone)
  const [count, setCount] = useState(50)
  const [otp, setOtp] = useState('')
  const [existmobile, setExistMobile] = useState('')
console.log(props)
  const { register, errors, handleSubmit } = useForm()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    let intervalId
// console.log(props)
// console.log(props.location.state.login_phone)
    const resend = () => {
      clearInterval(intervalId)
      setCount(50)
    // history.push('/otp')
    axios.post(`http://172.105.49.15:3030/api/user/send_otp`, {
    mobile_number:props.location.state.mobile
    // password:data.password
})
.then(r => { 
  console.log(r)
  // setExistMobile(r)
  })
    }
  
// useEffect(() => {
// axios.post(`http://172.105.49.15:3030/api/user/check_mobile_number_exist`, {
//     mobile_number:phone
//     // password:data.password
// })
// .then(r => { 
//   console.log(r)
//   setExistMobile(r)
//    if (r.data !== null) {
//     axios.post(`http://172.105.49.15:3030/api/user/send_otp`, {
//       mobile_number:phone
//       // password:data.password
//   })
//   .then(r => {
//     console.log(r)
//   })
// //   props.history.push('/otp')
//   toast.success(
//     <ToastContent name={ 'We will send you a OTP to verify user'} role={ 'admin'} />,
//     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
//   )

//   } else {
//     // alert("Mobile number not exist")
//   }
//   })
// }, [phone])
useEffect(() => {
  intervalId = setInterval(() => setCount(counter => counter - 1), 1000)
}, [setCount])
// console.log(count, intervalId)
if (count === -1) {
  // resend()
  setCount(0)
}
  const onSubmit = data => {
    console.log(data)
    dispatch(SendOtp(data, props))
// history.push('/forgot-password')
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
      <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardText className='mb-2'>We will send you a OTP to verify user.</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
         {/* {count === 0 ?  <FormGroup>
                  <Label className='form-label' for='login-email'>
                   Mobile Number
                  </Label>
                  <Input
                  autoFocus
                  type='phone'
                  value={phone}
                  id='login_phone'
                  name='login_phone'
                  placeholder='Your Phone'
                  onChange={e => setPhone(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login_phone'] })}
                  innerRef={register({ 
                    required: true,
                     validate: value => value !== '',
                     pattern:{value:/^\d{10}$/,
                                message:"please enter your 10 digit phone number"}
                               })}
                />
                </FormGroup> : " "}   */}
                <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    OTP
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <Input
                  value={otp}
                  id='login_otp'
                  name='login_otp'
                  maxLength={6}
                  className='input-group-merge'
                  placeholder="Enter Your OTP"
                  onChange={e => setOtp(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login_otp'] })}
                  innerRef={register({ 
                    required: true,
                          pattern:{value:/^\d{6}$/,
                                message:"please enter your 6 digit otp"},
                                 validate: value => value !== '' })}
                />
                        {/* <OtpInput
             value={otp}
             onChange={otp => setOtp(otp)}
             name='login_otp'
             inputStyle={{
               width:"62px",
               hight:"62px"

             }}
             name="login_otp"
             className={classnames({ 'is-invalid': errors['login_otp'] })}
             innerRef={register({ 
               required: true,
                     pattern:{value:/^\d{6}$/,
                           message:"please enter your 6 digit otp"},
                            validate: value => value !== '' })}
          numInputs={6}
          separator={<span>-</span>}
        /> */}
              </FormGroup>
            
              {count === 0 ? <div style={{display:"flex"}}>
             <h5> Didn't receive the otp ?</h5><h4 onClick={resend} style={{color:"red"}}>Resend OTP</h4>
             </div> : <Button.Ripple type='submit' color='primary' block>
               Send OTP
              </Button.Ripple>}
            </Form>
            <h5 className='text-right mt-2'>00:{count}</h5>
            <p >
              {/* <span className='mr-25'>New on our platform?</span> */}
              {/* <Link to='/register'> */}
              {/* <Link to='/forgot-password'>
                <span>Forgot Password ?</span>
              </Link> */}
            
            </p>

          </Col>
        </Col>

      </Row>
    </div>
  )
}

export default withRouter(OtpOnLogin)