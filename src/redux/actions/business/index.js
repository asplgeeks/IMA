import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../axiosConfig'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_BusinessTrip = (data, props) => {
    axiosConfig.post(`/api/business/add_business_trip_request`, {
        location:data.location,
        business_trip_type:data.business_trip_type,
        from_place:data.from_place,
        to_place:data.to_place,
        from_date:data.from_date,
        to_date:data.to_date,
        departure_date:data.departure_date,
        departure_time:data.departure_time,
        return_date:data.return_date,
        return_time:data.return_time,
        mode_of_transport:data.mode_of_transport,
        rental_car_required:data.rental_car_required,
        planned_food:data.planned_food,
        advance_required:data.advance_required,
        purpose:data.purpose,
        advance_amount:data.advance_amount
    
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

  export const update_BusinessTrip = (data, props) => {
    axiosConfig.put(`http://172.105.49.15:3030/api/business/update_business_trip_request/${props && props.preloadValue && props.preloadValue.detail._id}`, {
        location:data.location,
        business_trip_type:data.business_trip_type,
        from_place:data.from_place,
        to_place:data.to_place,
        from_date:data.from_date,
        to_date:data.to_date,
        departure_date:data.departure_date,
        departure_time:data.departure_time,
        return_date:data.return_date,
        return_time:data.return_time,
        mode_of_transport:data.mode_of_transport,
        rental_car_required:data.rental_car_required,
        planned_food:data.planned_food,
        advance_required:data.advance_required,
        purpose:data.purpose,
        advance_amount:data.advance_amount
   
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