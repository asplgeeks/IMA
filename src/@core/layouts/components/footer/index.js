// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0' style={{backgroundColor:'#ffffff', padding:"20px"}}>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
     Copyright © 2021 &nbsp;&nbsp;
      {/* {new Date().getFullYear()}{' '} */}
        <a href='http://star-admin.smspad.in' target='_blank' style={{color:'rgb(221, 33, 44)'}} rel='noopener noreferrer'>
          Star Engineers Pvt. Ltd.
        </a>
        <span className='d-none d-sm-inline-block'>&nbsp;&nbsp; All rights Reserved</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Developed by
        <a href='http://www.accucia.com' target='_blank' style={{color:'rgb(221, 33, 44)'}} rel='noopener noreferrer'>
          Accucia Softwares Pvt. Ltd.
        </a>
      </span>
    </p>
  )
}

export default Footer
