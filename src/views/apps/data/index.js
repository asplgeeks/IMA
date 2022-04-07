// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'


// ** Styles
import '@styles/react/apps/app-email.scss'

const Data = (props) => {
  
  // ** Store Variables
  const dispatch = useDispatch()
// 
  // ** Vars
  const params = useParams()

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    // params.folder 
    // :fuid/:user_id
    // console.log("fuid", params.fuid, "user_", params.user_id)
    if (params.fuid && params.user_id) {
        // console.log("asdad", props) 
        localStorage.setItem("fbUserId", JSON.stringify(params.fuid))
        localStorage.setItem("user_id", JSON.stringify(params.user_id))
        props.history.push('/login')
    }
    // dispatch(getTopics({ q: query || '', folder: params.folder || 'inbox', label: params.label || '' }))
  }, [])

  return "Welcome"
}

export default Data
