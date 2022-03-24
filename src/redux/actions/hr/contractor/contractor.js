import axios from 'axios'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../../axiosConfig'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const created_by_ID = localStorage.getItem('loginId')

export const add_Contractor = (data, props) => {
    axiosConfig.post(`/web/add_contractor`, {
        organizations_id:data.organizations_id,
        contractors_name:data.contractors_name,
        pan:data.pan,
        pan_url:data.pan_url,
        gst:data.gst,
        gst_url:data.gst_url,
        type:data.type,
        address:data.address,
        cancelled_check_url:data.cancelled_check_url,
        bank_name:data.bank_name,
        account_name:data.account_name,
        ifsc_code:data.ifsc_code,
        micr:data.micr,
        branch:data.branch,
        contract_start_date:data.contract_start_date,
        contract_end_date:data.contract_end_date,
        contract_type:data.contract_type,
        compliances:data.compliances,
        pf_registration_number:data.pf_registration_number,
        pf_registration_number_url:data.pf_registration_number_url,
        esi_registration_number:data.esi_registration_number,
        esi_registration_number_url:data.esi_registration_number_url,
        profession_tax_registration_no:data.profession_tax_registration_no,
        profession_tax_registration_no_url:data.profession_tax_registration_no_url,
        mlwf_registration_no:data.mlwf_registration_no,
        agreement_copy_url:data.agreement_copy_url,
        total_number_of_labourer:data.total_number_of_labourer,
        form_5_url:data.form_5_url,
        labour_rc_url:data.labour_rc_url,
        labour_license_url:data.labour_license_url
      
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

  export const update_Contractor = (data, props) => {
    axiosConfig.put(`/web/update_contractor/${props && props.preloadValue && props.preloadValue.detail._id}`, {
        organizations_id:data.organizations_id,
        contractors_name:data.contractors_name,
        pan:data.pan,
        pan_url:data.pan_url,
        gst:data.gst,
        gst_url:data.gst_url,
        type:data.type,
        address:data.address,
        cancelled_check_url:data.cancelled_check_url,
        bank_name:data.bank_name,
        account_name:data.account_name,
        ifsc_code:data.ifsc_code,
        micr:data.micr,
        branch:data.branch,
        contract_start_date:data.contract_start_date,
        contract_end_date:data.contract_end_date,
        contract_type:data.contract_type,
        compliances:data.compliances,
        pf_registration_number:data.pf_registration_number,
        pf_registration_number_url:data.pf_registration_number_url,
        esi_registration_number:data.esi_registration_number,
        esi_registration_number_url:data.esi_registration_number_url,
        profession_tax_registration_no:data.profession_tax_registration_no,
        profession_tax_registration_no_url:data.profession_tax_registration_no_url,
        mlwf_registration_no:data.mlwf_registration_no,
        agreement_copy_url:data.agreement_copy_url,
        total_number_of_labourer:data.total_number_of_labourer,
        form_5_url:data.form_5_url,
        labour_rc_url:data.labour_rc_url,
        labour_license_url:data.labour_license_url
      
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