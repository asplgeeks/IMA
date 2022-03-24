import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../axiosConfig'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_Purchase_Request = (data, props) => {
    axiosConfig.post(`/purchase/add_purchase_master`, {
        location:data.location,
        purchase_type:data.purchase_type,
        currency:data.currency,
        vendor_name:data.vendor_name,
        department:data.department,
        purchase_request_date:data.purchase_request_date,
        validity_date:data.validity_date,
        required_date:data.required_date,
        remark:data.remark,
        attachment_file:data.attachment_file,
        purchase_item_details:data.purchase_item_details
    })
    .then(response => {
      console.log(response)
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

  export const update_Purchase_Request = (data, props) => {
    axiosConfig.put(`/purchase/update_purchase_master/${props && props.preloadValue && props.preloadValue.detail._id}`, {
      location:data.location,
      purchase_type:data.purchase_type,
      currency:data.currency,
      vendor_name:data.vendor_name,
      department:data.department,
      purchase_request_date:data.purchase_request_date,
      validity_date:data.validity_date,
      required_date:data.required_date,
      remark:data.remark,
      attachment_file:data.attachment_file,
      purchase_item_details:data.purchase_item_details
  })
    .then(response => {
      console.log(response)
      toast.success(response.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            // props.onMasterSave()
    }).catch(function(e) {
        console.log(e)
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