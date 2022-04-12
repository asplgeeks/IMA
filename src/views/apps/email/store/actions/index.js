import axios from 'axios'
import axiosConfig from './../../../../../axiosConfig'
import Swal from 'sweetalert2'

const UserId = localStorage.getItem('user_id')
console.log(UserId)
// Get Category List for thread 
export const CategoryList = () => {
  return dispatch => {
    return axiosConfig.post('/admin/listThreadCategories').then(res => {
      console.log(res)
      dispatch({ type: 'GET_LISTOF_CATEGORY', data: res.data })
    })
  }
}
// ** Get tread list 
export const gettreads = (catId) => {
  return dispatch => {
    return axiosConfig.post('/admin/getThreadUnreadCount', {
      userid:UserId,
      status:"",
      page_no:0,
      page_limit:10,
      sort_by:"status",
      search_by:'',
      thread_categoryid:catId
  }).then(res => {
      dispatch({ type: 'GET_TREAD', data: res.data })
    })
  }
}

// add new tread
export const addNewtreads = (formValue, props) => {
  return dispatch => {
    return axiosConfig.post('/admin/addThread', {
      userid:UserId,
      threadcategory_id:"1",
      admin_note:"note",
      display_name:formValue.title,
      display_desc:formValue.thread,
      moderator_ids:""
  }).then(res => {
      console.log(res)
      axiosConfig.post('/admin/addThread', {
    threadid:res.data.data[0].thread_id,
    selection_type:"0",
    selected_ids:UserId
    }).then(r => console.log(r))
      props.setSentPop(true)
      props.toggleModal()
    })
  }
}

// ** GET Mails
export const getTopics = (params) => {
  console.log(params)
  return dispatch => {
    return axiosConfig.post('/admin/getCommentIdList', {
      thread_id:params.folder.thread_id,
      comment_id:""
  }).then(res => {
      console.log(res)
      dispatch({ type: 'GET_MAILS', data: res.data, params })
    })
  }
}


// ** SELECT Current Mail
export const selectCurrentMail = id => dispatch => {
  return axiosConfig.post('/admin/getCommentDetails', { id }).then(res => {
    console.log(res)
    dispatch({ type: 'SELECT_CURRENT_MAIL', mail: res.data })
  })
}

// add comment and subComment 
export const addCommentSubComment = (title, images, detail, props) => {
  console.log(props)
  return dispatch => {
    return axiosConfig.post('/admin/addUpdateThreadComment', {
      comment_id:"",
      thread_id:detail.thread_id,
      comment:title,
      userid:UserId,
      parent_id:detail.id,
      files:JSON.stringify(images)
  }).then(res => {
    if (res.data.success === 1) { 
      Swal.fire({
        title: 'Success!',
        text: 'Topic submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28c76f'
      })
 return "success"
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Something Went Wrong !',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#EE3224'
    })
    return "error"
  }
    })
  }
}

// add comment and subComment 
export const ReplyOnComment = (title, images, detail, props) => {
  console.log(props)
  return dispatch => {
    return axiosConfig.post('/admin/addUpdateThreadComment', {
      comment_id:detail.id,
      thread_id:detail.thread_id,
      comment:title,
      userid:UserId,
      parent_id:detail.id,
      files:JSON.stringify(images)
  }).then(res => {
    if (res.data.success === 1) { 
      Swal.fire({
        title: 'Success!',
        text: 'Topic submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28c76f'
      })
 return "success"
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Something Went Wrong !',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#EE3224'
    })
    return "error"
  }
    })
  }
}

// add comment and subComment 
export const addTopic = (comment_data, images, detail, props) => {
  return dispatch => {
    return axiosConfig.post('/admin/addUpdateThreadComment', {
      thread_id:detail.thread_id,
      comment:comment_data,
      userid:UserId,
      parent_id:0,
      comment_id:0,
      files:JSON.stringify(images)
  }).then(res => {
    if (res.data.success === 1) { 
      Swal.fire({
        title: 'Success!',
        text: 'Topic submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28c76f'
      })
 return "success"
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Something Went Wrong !',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#EE3224'
    })
    return "error"
  }
    })
  }
}

// ** UPDATE Mails
export const updateMails = (emailIds, dataToUpdate) => {
  return (dispatch, getState) => {
    return axios.post('/apps/email/update-emails', { emailIds, dataToUpdate }).then(res => {
      dispatch({ type: 'UPDATE_MAILS', emailIds, dataToUpdate, data: res.data })
      dispatch(getTopics(getState().email.params))
    })
  }
}

// ** Update Mail Label
export const updateMailLabel = (emailIds, label) => {
  return (dispatch, getState) => {
    return axios.post('/apps/email/update-emails-label', { emailIds, label }).then(res => {
      dispatch({ type: 'UPDATE_MAIL_LABEL', data: res.data })
      dispatch(getTopics(getState().email.params))
    })
  }
}

// ** GET Next/Prev mail
export const paginateMail = (dir, emailId) => {
  return dispatch => {
    return axios.get('/apps/email/paginate-email', { params: { dir, emailId } }).then(res => {
      dispatch({ type: 'PAGINATE_MAIL', data: res.data })
    })
  }
}

// ** SELECT Mail
export const selectMail = id => dispatch => dispatch({ type: 'SELECT_MAIL', id })

// ** SELECT All Mails
export const selectAllMail = val => dispatch => dispatch({ type: 'SELECT_ALL_MAIL', val })

// ** RESET Selected Mails
export const resetSelectedMail = () => dispatch => dispatch({ type: 'RESET_SELECT_MAILS' })
