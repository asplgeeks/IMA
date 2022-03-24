import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../axiosConfig'
import defaultImage from './../../../Images/defaultImage.jpg'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_organization_manpower = (data, props) => {
    axiosConfig.post(`/api/add_manpower`, {
        organization_id:data.organization_id,
        staff_count: data.staff_count,
        staff_present: data.staff_present,
        on_rolls_direct_count: data.on_rolls_direct_count,
        on_rolls_direct_present: data.on_rolls_direct_present,
        on_rolls_indirect_count: data.on_rolls_indirect_count,
        on_rolls_indirect_present: data.on_rolls_indirect_present,
        contract_p_direct_count: data.contract_p_direct_count,
        contract_p_direct_present: data.contract_p_direct_present,
        contract_p_indirect_count: data.contract_p_direct_present,
        contract_p_indirect_present: data.contract_p_indirect_present,
        contract_6m_direct_count: data.contract_6m_direct_count,
        contract_6m_direct_present: data.contract_6m_direct_present,
        contract_6m_indirect_count: data.contract_6m_indirect_count,
        contract_6m_indirect_present: data.contract_6m_indirect_present,
        naps_direct_count: data.naps_direct_count,
        naps_direct_present: data.naps_direct_present,
        naps_indirect_count: data.naps_indirect_count,
        naps_indirect_present: data.naps_indirect_present,
        new_requirement_direct: data.new_requirement_direct,
        new_requirement_indirect:data.new_requirement_indirect,
        reduction_direct:data.reduction_direct,
        reduction_indirect:data.reduction_indirect,
        created_by:created_by_ID,
        date:data.date 
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

  export const update_organization_manpower = (data, props) => {
    axiosConfig.put(`/api/update_manpower/${props && props.preloadValue.detail._id}`, {
        staff_count: data.staff_count,
        staff_present: data.staff_present,
        on_rolls_direct_count: data.on_rolls_direct_count,
        on_rolls_direct_present: data.on_rolls_direct_present,
        on_rolls_indirect_count: data.on_rolls_indirect_count,
        on_rolls_indirect_present: data.on_rolls_indirect_present,
        contract_p_direct_count: data.contract_p_direct_count,
        contract_p_direct_present: data.contract_p_direct_present,
        contract_p_indirect_count: data.contract_p_direct_present,
        contract_p_indirect_present: data.contract_p_indirect_present,
        contract_6m_direct_count: data.contract_6m_direct_count,
        contract_6m_direct_present: data.contract_6m_direct_present,
        contract_6m_indirect_count: data.contract_6m_indirect_count,
        contract_6m_indirect_present: data.contract_6m_indirect_present,
        naps_direct_count: data.naps_direct_count,
        naps_direct_present: data.naps_direct_present,
        naps_indirect_count: data.naps_indirect_count,
        naps_indirect_present: data.naps_indirect_present,
        new_requirement_direct: data.new_requirement_direct,
        new_requirement_indirect:data.new_requirement_indirect,
        reduction_direct:data.reduction_direct,
        reduction_indirect:data.reduction_indirect,
        created_by:created_by_ID
        // date:data.date 
    })
    .then(response => {
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
