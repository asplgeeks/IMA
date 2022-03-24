// import axiosConfig from 'axiosConfig'
import { toast, Zoom, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import defaultImage from './../../../Images/defaultImage.jpg'
import axiosConfig from '../../../axiosConfig'
const moment = require('moment')
// import { browserHistory } from 'react-router'

// const loginAuthID = sessionStorage.getItem('id_token')
const createdbyID = localStorage.getItem('loginId')
console.log(createdbyID)
export const handleMaster = (data, props) => {

    axiosConfig.post(`/api/user/add_user`, {
        name:data.name,
        mobile_number:data.mobile_number,
        email_id:data.email_id,
        status:data.status,
        date_of_birth:data.date_of_birth,
        date_of_joining:data.date_of_joining,
        employee_id:data.employee_id,
        department_id:data.department_id,
        designation_id:data.designation_id,
        reporting_manager_id:data.reporting_manager_id,
        photo:data.photo,
        adhar_no:data.adhar_no,
        pan_no:data.pan_no,
        bank_account_no:data.bank_account_no,
        bank_name:data.bank_name,
        ifsc_code:data.ifsc_code,
        created_by:createdbyID,
        type:data.type,
        orgnization_id:
          data.organization_id.map((values, index) => {
          return values.value
    })
    })
    .then(r => {
      console.log(r)
      if (r.data.status === false) {
        toast.error(r.data.message, 
          { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
      } else {
        toast.success(r.data.message, 
          { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
          props.onAdd()
          props.onMasterSave()
      }
        
    }).catch(function(e) {
      toast.error(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
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

  export const handleMasterUpdate = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/user/update_user/${props.preloadValue.detail._id}`, {
      name:data.name,
      mobile_number:data.mobile_number,
      email_id:data.email_id,
      password:data.password,
      status:data.status,
      date_of_birth:data.date_of_birth,
      date_of_joining:data.date_of_joining,
      employee_id:data.employee_id,
      department_id:data.department_id,
      designation_id:data.designation_id,
      reporting_manager_id:data.reporting_manager_id,
      photo:data.photo,
      adhar_no:data.adhar_no,
      pan_no:data.pan_no,
      bank_account_no:data.bank_account_no,
      bank_name:data.bank_name,
      ifsc_code:data.ifsc_code,
      created_by:createdbyID,
      type:data.type,
      orgnization_id:data.organization_id.map((values, index) => {
        return values.value
  })
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
      props.onAdd()
      props.onMasterSave()
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

  export const addCountryMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_country`, {
      country_name:data.country_name,
      country_code:data.country_code,
      created_by:createdbyID
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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
  export const updateCountryMaster = (data, props) => {

    console.log(data, props && props.preloadValue.detail._id)

    console.log(createdbyID)
    axiosConfig.put(`/api/master/update_country/${props && props.preloadValue.detail._id}`, {
      country_name:data.country_name,
      country_code:data.country_code,
      created_by:createdbyID
    })
    .then(r => { 
      console.log(r)
      toast.success(r.data.message, { transition: Zoom, hideProgressBar: true, autoClose: 2000 })


            props.onAdd()
            props.onMasterSave()

  }
    )
    return dispatch => {
      dispatch(
          { 
              type: 'MASTER_REGISTER', 
              data
            }
          )
    }
  }


  export const addStateMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_state`, {
      state_name:data.state_name,
      state_code:data.state_code,
      country_id:data.state_id,
      created_by:createdbyID
    })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateStateMaster = (data, props) => {
    console.log(data)

    axiosConfig.put(`/api/master/update_state/${props && props.preloadValue.detail._id}`, {
      state_name:data.state_name,
      state_code:data.state_code,
      country_id:data.state_id,
      created_by:createdbyID
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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
  
  export const addDesignatonMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_designation`, {
      designation_name:data.designation_name,
      created_by:createdbyID
    })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateDesignatonMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_designation/${props && props.preloadValue.detail._id}`, {
      designation_name:data.designation_name,
      created_by:createdbyID
    })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addDepartmentMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_department`, {
      department_name:data.department_name,
      location:data.location,
      created_by:createdbyID
    })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateDepartmentMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_department/${props && props.preloadValue.detail._id}`, {
      department_name:data.department_name,
      location:data.location,
      created_by:createdbyID
    })
    .then(r => {
      // console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addOrganizationMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_organization`, {
      location_code:data.location_code,
      location_name:data.location_name,
      location_shortcode:data.location_shortcode,
      pan_no:data.pan_no,
      gst_no:data.gst_no,
      incorp_no:data.incorp_no,
      plant_head:data.plant_head,
      email: data.email,
      telephone_no:data.telephone_no,
      website: data.website,
      address:data.address,
      district:data.district,
      city:data.city,
      country:data.country,
      state:data.state,
      zip_code:data.zip_code,
      purchase_email_id:data.purchase_email_id,
      created_by:createdbyID
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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


  export const updateOrganizationMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_organization/${props && props.preloadValue.detail._id}`, {
      location_code:data.location_code,
      location_name:data.location_name,
      location_shortcode:data.location_shortcode,
      pan_no:data.pan_no,
      gst_no:data.gst_no,
      incorp_no:data.incorp_no,
      plant_head:data.plant_head,
      email: data.email,
      telephone_no:data.telephone_no,
      website: data.website,
      address:data.address,
      district:data.district,
      city:data.city,
      country:data.country_id._id,
      state:data.state_id._id,
      zip_code:data.zip_code,
      purchase_email_id:data.purchase_email_id
      // created_by:createdbyID
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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


  export const addDailyUpdate = (data, props) => {
    console.log(moment(data.date).format("YYYY-MM-DD"))
    axiosConfig.post(`/api/master/add_daily_update`, {
      type:data.type,
      text:data.text,
      image:data.image || defaultImage,
      from_date:moment(data.from_date).format("YYYY-MM-DD"),
      to_date:moment(data.to_date).format("YYYY-MM-DD"),
      created_by:createdbyID
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateDailyUpdate = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_daily_updates/${props && props.preloadValue.detail._id}`, {
      type:data.type,
      text:data.text,
      image:data.image || defaultImage,
      from_date:moment(data.from_date).format("YYYY-MM-DD"),
      to_date:moment(data.to_date).format("YYYY-MM-DD"),
      created_by:createdbyID
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  
  export const addRssFeedMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_rss_feed`, {
      feed_name:data.feed_name,
      feed_logo:data.feed_logo,
      feed_url:data.feed_url,
      priority:data.priority,
      status:data.status,
      created_by:createdbyID
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateRssFeedMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_rss_feed/${props && props.preloadValue.detail._id}`, {
      feed_name:data.feed_name,
      feed_logo:data.feed_logo,
      feed_url:data.feed_url,
      priority:data.priority,
      status:data.status,
      created_by:createdbyID
    })
    .then(r => {
      // console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addFinanceYearMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_financial_year`, {
      financial_year:data.financial_year,
      financial_year_start_date:data.financial_year_start_date,
      financial_year_end_date:data.financial_year_end_date
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateFinanceYearMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_financial_year/${props && props.preloadValue.detail._id}`, {
      financial_year:data.financial_year,
      financial_year_start_date:data.financial_year_start_date,
      financial_year_end_date:data.financial_year_end_date
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addCustomGroupMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_customer_group`, {
      Customer_group_name:data.Customer_group_name
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateCustomGroupMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_customer_group/${props && props.preloadValue.detail._id}`, {
      Customer_group_name:data.Customer_group_name
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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


  export const addCustomMaster = (data, props) => {
    
    console.log(data)
    axiosConfig.post(`/api/master/add_customer_master`, {
      customer_code:data.customer_code,
      customer_name:data.customer_name,
      customer_group:data.customer_group,
      contact_person:data.contact_person,
      pan_no:data.pan_no,
      gst_no:data.gst_no,
      address:data.address,
      city:data.city,
      state_id:data.state_id,
      country_id:data.country_id,
      zip_code:data.zip_code,
      email_id:data.email_id,
      contact_no:data.contact_no  
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updateCustomMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_customer_group/${props && props.preloadValue.detail._id}`, {
      customer_code:data.customer_code,
      customer_name:data.customer_name,
      customer_group:data.customer_group,
      contact_person:data.contact_person,
      pan_no:data.pan_no,
      gst_no:data.gst_no,
      address:data.address,
      city:data.city,
      state_id:data.state_id,
      country_id:data.country_id,
      zip_code:data.zip_code,
      email_id:data.email_id,
      contact_no:data.contact_no  
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addMaterialCategory = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_material_category`, {
      material_category_name:data.material_category_name,
      material_group_code:data.material_group_code,
      status:data.status
    })
    .then(r => {
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateMaterialCategory = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_material_category/${props && props.preloadValue.detail._id}`, {
      material_category_name:data.material_category_name,
      material_group_code:data.material_group_code,
      status:data.status
    })
    .then(r => {
      // console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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


  export const addMaterialSubCategory = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_material_sub_category`, {
      material_sub_category_name:data.Material_sub_category_name,
      material_sub_group_code:data.Material_sub_group_code,
      material_category_id:data.Material_Category_id,
      status:1
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const updateMaterialSubCategory = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_material_sub_category/${props && props.preloadValue.detail._id}`, {
      material_sub_category_name:data.Material_sub_group_code,
      material_sub_group_code:data.material_group_code,
      material_category_id:data.Material_Category_id,
      status:1
    })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addItemMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_material_master`, {
      material_code:data.material_code,
      material_description:data.material_description,
      material_category:data.material_category,
      material_sub_category:data.material_sub_category,
      tax_category:data.tax_category,
      opening_quantity:data.opening_quantity,
      min_stock_level:data.min_stock_level,
      max_stock_level:data.max_stock_level,
      hsn_code:data.hsn_code,
      primary_uom:data.primary_uom,
      mangaged_type:data.mangaged_type,
      material_rate:data.material_rate,
      material_rate_tax:data.material_rate_tax  
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updateItemMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_material_master/${props && props.preloadValue.detail._id}`, {
      material_code:data.material_code,
      material_description:data.material_description,
      material_category:data.material_category,
      material_sub_category:data.material_sub_category,
      tax_category:data.tax_category,
      opening_quantity:data.opening_quantity,
      min_stock_level:data.min_stock_level,
      max_stock_level:data.max_stock_level,
      hsn_code:data.hsn_code,
      primary_uom:data.primary_uom,
      mangaged_type:data.mangaged_type,
      material_rate:data.material_rate,
      material_rate_tax:data.material_rate_tax   
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addCurrencyMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_Currency_Master`, {
      currency_code:data.currency_code,
      currency_description:data.currency_description,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updateCurrencyMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_Currency_Master/${props && props.preloadValue.detail._id}`, {
      currency_code:data.currency_code,
      currency_description:data.currency_description,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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


  export const addPaymentMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_payment_master`, {
      Payment_type:data.Payment_type,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updatePaymentMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_payment_master/${props && props.preloadValue.detail._id}`, {
      Payment_type:data.Payment_type,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addBudgetHead = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_budget_head`, {
      budget_head_description:data.budget_head_description
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      {position: toast.POSITION.TOP_RIGHT, width:"180px"})
            props.onAdd()
      // window.history.go('')
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

  export const updateBudgetHead = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_budget_head/${props && props.preloadValue.detail._id}`, {
      budget_head_description:data.budget_head_description
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
  
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

  export const addUnitMeasurment = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_Unit_of_Measurement`, {
      uom_code:data.uom_code,
      uom_description:data.uom_description
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updateUnitMeasurment = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_Unit_of_Measurement/${props && props.preloadValue.detail._id}`, {
      uom_code:data.uom_code,
      uom_description:data.uom_description
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
         
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


  export const addCostCenter = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_cost_center`, {
      cost_center_name:data.cost_center_name,
      department_id:data.department_id
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      {position: toast.POSITION.TOP_RIGHT, width:"180px"})
            props.onAdd()
      // window.history.go('')
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

  export const updateCostCenter = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_cost_center/${props && props.preloadValue.detail._id}`, {
      cost_center_name:data.cost_center_name,
      department_id:data.department_id
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
         
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

  export const addFunctionMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_Function_Master`, {
      Function_name:data.Function_name,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
      // window.history.go('')
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

  export const updateFunctionMaster = (data, props) => {
    console.log(data)
    axiosConfig.put(`/api/master/update_Function_Master/${props && props.preloadValue.detail._id}`, {
      Function_name:data.Function_name,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
      { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
         
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


  export const addStatusMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_status`, {
      enter_status:data.enter_status,
      status:data.status
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateStatusMaster = (data, props) => {
    console.log(data)

    axiosConfig.put(`/api/master/update_status/${props && props.preloadValue.detail._id}`, {
      enter_status:data.enter_status,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addLabourMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_labour`, {
      labour_type:data.labour_type
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateLabourMaster = (data, props) => {
    console.log(data)

    axiosConfig.put(`/api/master/update_labour/${props && props.preloadValue.detail._id}`, {
      labour_type:data.labour_type
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addEmployeeMaster = (data, props) => {
    console.log(data)
    axiosConfig.post(`/api/master/add_employee`, {
      employee_type:data.employee_type
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateEmployeeMaster = (data, props) => {
    console.log(data)

    axiosConfig.put(`/api/master/update_employee/${props && props.preloadValue.detail._id}`, {
      employee_type:data.employee_type
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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


  export const addGuestMaster = (data, props) => {

    axiosConfig.post(`/api/master/add_guest_users`, {
      name:data.name,
      email:data.email,
      address:data.address,
      mobile_no:data.mobile_no,
      status:data.status
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateGuestMaster = (data, props) => {

    axiosConfig.put(`/api/master/update_guest_users/${props && props.preloadValue.detail._id}`, {
      name:data.name,
      email:data.email,
      address:data.address,
      mobile_no:data.mobile_no,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addAssociationMaster = (data, props) => {

    axiosConfig.post(`/api/master/add_association`, {
      association_type:data.association_type
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateAssociationMaster = (data, props) => {

    axiosConfig.put(`/api/master/update_association/${props && props.preloadValue.detail._id}`, {
      association_type:data.association_type
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addMeetingRequestMaster = (data, props) => {

    axiosConfig.post(`/api/master/add_minutes_meeting`, {
      title:data.title,
      subject:data.subject
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateMeetingRequestMaster = (data, props) => {

    axiosConfig.put(`/api/master/update_minutes_meeting/${props && props.preloadValue.detail._id}`, {
      title:data.title,
      subject:data.subject
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addDocumentMaster = (data, props) => {

    axiosConfig.post(`/api/master/add_document_master`, {
      document_name:data.document_name,
      status:data.status
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateDocumentMaster = (data, props) => {

    axiosConfig.put(`/api/master/update_document_master/${props && props.preloadValue.detail._id}`, {
      document_name:data.document_name,
      status:data.status
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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

  export const addDocumentTypetMaster = (data, props) => {

    axiosConfig.post(`/api/master/add_document_type_master`, {
      document_type_name:data.document_type_name,
      document_name:data.document_name,
      days:data.days,
      use_specific_document_type:data.use_specific_document_type
  })
    .then(r => {
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
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

  export const updateDocumentTypetMaster = (data, props) => {

    axiosConfig.put(`/api/master/update_document_master/${props && props.preloadValue.detail._id}`, {
      document_type_name:data.document_type_name,
      document_name:data.document_name,
      days:data.days,
      use_specific_document_type:data.use_specific_document_type
  })
    .then(r => {
      console.log(r)
      toast.success(r.data.message, 
        { transition: Zoom, hideProgressBar: true, autoClose: 2000 })
            props.onAdd()
            props.onMasterSave()
  
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