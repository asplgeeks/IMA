import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const moment = require('moment')
import axiosConfig from '../../../../axiosConfig'
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_EmployeRegistration = (data, props) => {
  console.log("data", data)
    axiosConfig.post(`/web/add_employee_registration`, {
    contractor_id:data.contractor_id,
    labourer:data.labourer,
    name:data.name,
    gender:data.gender,
    address:data.address,
    pan:data.pan,
    pan_url:data.pan_url,
    aadhar:data.aadhar,
    aadhar_url:data.aadhar_url,
    educational_certificates_url:data.educational_certificates_url,
    date_of_birthday:data.date_of_birthday,
    date_of_joining:data.date_of_joining,
    bank_name:data.bank_name,
    account_name:data.account_name,
    ifsc_code:data.ifsc_code,
    micr:data.micr,
    branch:data.branch,
    category:data.category,
    sub_category:data.sub_category,
    esic_no:data.esic_no,
    pf_no:data.pf_no,
    uan_no:data.uan_no,
    basic_rate:data.basic_rate,
    hra_rate:data.hra_rate,
    conveyance_rate:data.conveyance_rate,
    da_rate:data.da_rate,
    medical_allowance:data.medical_allowance,
    leave_with_wages:data.leave_with_wages,
    other_allowance:data.other_allowance,
    bonus:data.bonus,
    transport_allowance:data.transport_allowance,
    canteen:data.canteen,
    bus:data.bus
})
    .then(response => {
      // console.log(response)
      toast.success(response.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 3000 })
            props.onAdd()
            // props.onMasterSave()
    }).catch(function(error) {
        // console.log(error)
      toast.error("Something Went Wrong..!", { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
    })

    return dispatch => {
      dispatch(
          { 
              type: 'MASTER_REGISTER', 
              data
            }
          )
    }
  }

  export const update_EmployeRegistration = (data, props) => {
    console.log(data.educational_certificates_url)
    axiosConfig.put(`/web/update_employee_registration/${props && props.preloadValue.detail._id}`, {
    contractor_id:data.contractor_id,
    labourer:data.labourer,
    name:data.name,
    gender:data.gender,
    address:data.address,
    pan:data.pan,
    pan_url:data.pan_url,
    aadhar:data.aadhar,
    aadhar_url:data.aadhar_url,
    educational_certificates_url:data.educational_certificates_url,
    date_of_birthday:data.date_of_birthday,
    date_of_joining:data.date_of_joining,
    bank_name:data.bank_name,
    account_name:data.account_name,
    ifsc_code:data.ifsc_code,
    micr:data.micr,
    branch:data.branch,
    category:data.category,
    sub_category:data.sub_category,
    esic_no:data.esic_no,
    pf_no:data.pf_no,
    uan_no:data.uan_no,
    basic_rate:data.basic_rate,
    hra_rate:data.hra_rate,
    conveyance_rate:data.conveyance_rate,
    da_rate:data.da_rate,
    medical_allowance:data.medical_allowance,
    leave_with_wages:data.leave_with_wages,
    other_allowance:data.other_allowance,
    bonus:data.bonus,
    transport_allowance:data.transport_allowance,
    canteen:data.canteen,
    bus:data.bus
})
    .then(response => {
      // console.log(response)
      toast.success(response.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 3000 })
            props.onAdd()
            // props.onMasterSave()
    }).catch(function(error) {
        // console.log(error)
      toast.error("Something Went Wrong..!", { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
    })

    return dispatch => {
      dispatch(
          { 
              type: 'MASTER_REGISTER', 
              data
            }
          )
    }
  }