import axios from 'axios'
import axiosConfig from './../../../../../axiosConfig'
// localStorage.setItem('token', r.data.token)

const Token = localStorage.getItem('token')
// ** Get tread list 
export const gettreads = (searchDetail) => {
  return dispatch => {
    return axiosConfig.post('/admin/getThreadUnreadCount', {
      userid:"40",
      status:"",
      page_no:0,
      page_limit:10,
      sort_by:"status",
      search_by:searchDetail,
      thread_categoryid:"1"
  }).then(res => {
      dispatch({ type: 'GET_TREAD', data: res.data })
    })
  }
}

// add new tread
export const addNewtreads = (formValue, props) => {
  return dispatch => {
    return axiosConfig.post('/admin/addThread', {
      userid:"40",
      threadcategory_id:"1",
      admin_note:"note",
      display_name:formValue.title,
      display_desc:formValue.thread,
      moderator_ids:"40"
  }, 
  {
  headers: {
    Authorization: Token
  }}).then(res => {
      console.log(res)
      axiosConfig.post('/admin/addThread', {
    threadid:res.data.data[0].thread_id,
    selection_type:"0",
    selected_ids:"40"
    }, 
    {
    headers: {
      Authorization: Token
    }}).then(r => console.log(r))
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
  }, 
  {
  headers: {
    Authorization: Token
  }}).then(res => {
      console.log(res)
      dispatch({ type: 'GET_MAILS', data: res.data, params })
    })
  }
}


// ** SELECT Current Mail
export const selectCurrentMail = id => dispatch => {
  return axiosConfig.post('/admin/getCommentDetails', { id }, {
    headers: {
      Authorization: Token
    }}).then(res => {
    console.log(res)
    dispatch({ type: 'SELECT_CURRENT_MAIL', mail: res.data })
  })
}

// add comment and subComment 
export const addCommentSubComment = (title, images, detail, props) => {
  console.log(props)
  return dispatch => {
    return axiosConfig.post('/admin/addUpdateThreadComment', {
      // comment_id:detail.topic_id,
      thread_id:detail.thread_id,
      comment:title.comment,
      userid:detail.userid,
      parent_id:detail.parent_id,
      files:images
  }).then(res => {
    if (res.data.success === 1) {
    console.log(res)
    props.setOpenMail(false)
    props.resetSelectedMail()
  } else {
    console.log(res)
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
