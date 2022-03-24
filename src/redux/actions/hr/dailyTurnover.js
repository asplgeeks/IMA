import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../axiosConfig'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_DailyTurnOver = (data, props) => {
    axiosConfig.post(`/api/add_daily_turnover`, {
        location_name:data.location_name,
        invoice_date:data.invoice_date,
        taxable_value:data.taxable_value
    })
    .then(response => {
      console.log(response)
      toast.success(response.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 3000 })
            props.onAdd()
            props.onMasterSave()
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

  export const update_DailyTurnOver  = (data, props) => {
    axiosConfig.put(`/api/update_daily_turnover/${props && props.preloadValue && props.preloadValue.detail._id}`, {
        location_name:data.location_name,
        invoice_date:data.invoice_date,
        taxable_value:data.taxable_value
    })
    .then(response => {
      console.log(response)
      toast.success(response.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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