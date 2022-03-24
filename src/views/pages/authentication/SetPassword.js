import React, { useRef } from "react"
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { useSkin } from '@hooks/useSkin'
import classnames from 'classnames'
import { CreatePassword } from '@store/actions/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import InputPassword from '@components/input-password-toggle'
import { Card, CardBody, Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'


const ResetPassword = (props) => {
    const [skin, setSkin] = useSkin()
    const dispatch = useDispatch()
    const { register, errors, handleSubmit, watch } = useForm({})
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
source = require(`@src/assets/images/pages/${illustration}`).default
const password = useRef({})
password.current = watch("password", "")
const onSubmit = data => {
    console.log(data)
    dispatch(CreatePassword(data, props))
// history.push('/forgot-password')
  }
console.log(props)
  return (
    <div className='auth-wrapper auth-v2 '>
      <Row className='auth-inner mb-0'>
      <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
      <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                  New Password
                </Label>
                <InputPassword 
                // className='input-group-merge'
                name="password"
                    //  className={classnames({ 'is-invalid': errors['login_password'] })}
                     innerRef={register({
                        required: "You must specify a password",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters"
                        }
                      })}
                id='new-password' 
                autoFocus />
                      {errors.password && <p style={{color : "red"}}>{errors.password.message}</p>}

              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword
                //  className='input-group-merge'
                 name="password_repeat"
                //  className={classnames({ 'is-invalid': errors['login_password'] })}
                innerRef={register({
                    validate: value => value === password.current || "The passwords does not match"
                  })}
                  id='confirm-password' />
                        {errors.password_repeat && <p style={{color : "red"}}>{errors.password_repeat.message}</p>}

              </FormGroup>
              <Button.Ripple color='primary' type="submit" block>
                Set New Password
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <Link to='/pages/login-v1'>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p> */}
          </CardBody>
        </Card>
        </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword