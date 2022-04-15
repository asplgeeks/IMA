// ** React Imports
import { Fragment, useState  } from 'react'
import { useHistory, Link } from "react-router-dom"

import classnames from 'classnames'
// ** Mail Components Imports
import MailCard from './MailCard'
import MailDetails from './MailDetails'
import ComposePopUp from './ComposePopup'
import * as Icon from 'react-feather'
import Models from './../../components/Model'
import { Controller, useForm } from 'react-hook-form'
// ** Utils
import { formatDateToMonthShort } from '@utils'

import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import { IconButton } from "@material-ui/core"

import Input from '@material-ui/core/Input'

import CancelRoundedIcon from "@material-ui/icons/CancelRounded"

import axiosConfig from './../../../axiosConfig'
import {addTopic, getTopics} from './store/actions'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  UncontrolledTooltip,
  Button,
  Row,
  Col,
  Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { Menu, ArrowLeftCircle, Folder, Tag, Mail, Trash, Edit2, Info } from 'react-feather'


import Search from "../../../Images/Search.svg"
import Refresh from "../../../Images/refresh.svg"
import Back_arrow from "../../../Images/backarrow.svg"
import Plus from "../../../Images/add.svg"
import Delete from "../../../Images/delete.svg"

import Adnewgreen from './../../../Images/addnewgreen.svg'
import Thread from './../../../Images/thread.svg'
import Path from './../../../Images/path.svg'
import pdf_image from './../../../Images/pdf_logo.png'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

const Mails = props => {
  // ** Props
  const {
    query,
    store,
    setQuery,
    dispatch,
    selectMail,
    composeOpen,
    updateMails,
    paginateMail,
    selectAllMail,
    toggleCompose,
    setSidebarOpen,
    updateMailLabel,
    resetSelectedMail,
    selectCurrentMail,
    setReloadthread,
    reloadthread
  } = props

  const { mails, selectedMails, params, currentMail } = store
  const [paramsData, setParamsData] = useState(params)
  // ** States
  // mails
  // console.log("sdadadas", params && params.folder)
  const { register, errors, handleSubmit, control } = useForm()

  const [openMail, setOpenMail] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [threadDetails, setThreadDetails] = useState(mails)
  const [searchField, setSearchField] = useState("")
  const [mailId, setMailId] = useState()

  const [blocking_state, setBlocking] = useState(false)

  const [modal, setModal] = useState(false)
  const [uploadedImage, setUploadedImage] = useState([])
  const filteredPersons = mails && mails.data && mails.data.filter(
    person => {
      return (
        person
        .commentor_designation
        .toLowerCase()
        .includes(searchField.toLowerCase())
      )
    }
  )
  // console.log("searchable items", filteredPersons)
  // ** Variables
  const labelColors = {
    personal: 'success',
    company: 'primary',
    important: 'warning',
    private: 'danger'
  }

  // ** Handles Update Functions
  const handleMailClick = id => {
    // console.log(id)
    setMailId(id)
    dispatch(selectCurrentMail(id))
    setOpenMail(true)
  }

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e, folder, ids = selectedMails) => {
    e.preventDefault()
    dispatch(updateMails(ids, { folder }))
    dispatch(resetSelectedMail())
  }

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label, ids = selectedMails) => {
    e.preventDefault()
    dispatch(updateMailLabel(ids, label))
    dispatch(resetSelectedMail())
  }

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr, bool) => {
    // dispatch(updateMails(arr, { isRead: bool })).then(() => dispatch(resetSelectedMail()))
    dispatch(selectAllMail(false))
  }

  // ** Handles Move to Trash
  const handleMailToTrash = ids => {
    dispatch(updateMails(ids, { folder: 'trash' }))
    dispatch(resetSelectedMail())
  }
  /*eslint-enable */

  // ** Renders Mail
  const renderMails = () => {
    // if (mails && mails.length) {
      // console.log(mails)
      return filteredPersons.map((mail, index) => {
        // console.log(mail)
        return (
          <MailCard
            mail={mail}
            key={index}
            mailId={mailId}
            dispatch={dispatch}
            selectMail={selectMail}
            updateMails={updateMails}
            labelColors={labelColors}
            selectedMails={selectedMails}
            handleMailClick={handleMailClick}
            handleMailReadUpdate={handleMailReadUpdate}
            formatDateToMonthShort={formatDateToMonthShort}
          />
        )
      })
    // }
  }

  const toggleModal = status => {
    // console.log("status1", status)
    if (modal !== status) {
      setModal(status)
    } else {
      setModal(false)
    }
  }


//--------------handel submit----------------------------//
const onSubmit = (data) => {
  setBlocking(true)
  dispatch(addTopic(data.comment, uploadedImage, params && params.folder, props)).then(info => { 
    if (info === "success") {
      setModal(false)
      setReloadthread(!reloadthread)
      setUploadedImage([])
      dispatch(getTopics({...store.params}))
      // dispatch(gettreads({...store.params}))
      setBlocking(false)
    }
   })
   .catch(err => {
    // console.log("err", err) 
    setBlocking(false)
   })
  }

  const uploadImage = (event) => {
    setBlocking(true)
    const bodyFormData = new FormData()
    const name = event.target.name
    const value = event.target.files
    bodyFormData.append('file', value[0])
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
  }
  
  const fileList = event.target.files
    axiosConfig.post('/admin/uploadFile', bodyFormData, config).then(r => [setBlocking(false), setUploadedImage([...uploadedImage, r.data.data])])
  }
//-----------------------delete image----------------------------------//
  const deleteImage = (i) => {
    const clearImage = uploadedImage && uploadedImage.filter((image, index) => {
      return uploadedImage.indexOf(image) !== i
    })
    setUploadedImage(clearImage)
  }
 
  const renderModal = (
    <div className={'theme-{item.modalColor}'} >
      <Modal
        isOpen={modal === true}
        toggle={() => toggleModal(true)}
        className='modal-dialog-centered'
        modalClassName="modal-success" >     
         <BlockUi tag="div" blocking={blocking_state}>

        <ModalBody className="comment_model">
          <img className='img' src={Adnewgreen} />
          <h5>Add New Topic</h5>

     <form  onSubmit={handleSubmit(onSubmit)}>
      <Row>
      <Col md={12} sm={12}>
     <FormControl variant="standard" >
        <InputLabel htmlFor="input-with-icon-adornment">
        Topic Title
        </InputLabel>
       <Controller
       control={control}
       name="comment"
       as={
        <Input
          id="comment"
          placeholder="Add Topic"
          className={classnames({ 'is-invalid': errors['comment'] })}
          multiline
          ref={register("comment", {required:true, validate: value => value !== undefined })}
          rows={2}
          startAdornment={
          <InputAdornment position="start">
          <img src={Thread}></img>
          </InputAdornment>
          }
        />
       }
       />
          {errors.comment && <p style={{color:"red"}}>Please enter topic</p>}  
      </FormControl>
      </Col>
      <Col md={12} sm={12}>
      <FormControl variant="standard">
      <div className='files'>
                    <Label className='mb-0 btn lable-btn' for='attach-email-item'>
                      <Icon.PlusCircle  className='cursor-pointer'  size={20} /> FILE
                      </Label>
                      <Label>
                      <input type='file'
                       name='attach_email_item' 
                       accept="image/*, application/pdf"
                      //  value={formValue.attach_email_item || []}
                       onChange={uploadImage}
                       id='attach-email-item'
                      hidden />
                    </Label>
                  </div>
      </FormControl> 
      </Col>
      <Col md={12} sm={12}>
      <FormControl variant="standard">
        <div> 
          {uploadedImage && uploadedImage.map((image, index) => {
              return (<div className='image_box'>
                <Icon.XCircle  size={20} style={{float:"right"}} onClick={() => deleteImage(index)}/>
                  <img src={ image.mimetype === "application/pdf" ? pdf_image : image.location} />
                  </div>)
              })}
          </div>
        </FormControl> 
      </Col>
      <Col md={12} sm={12}>
        <div className='button_send_request'>
             <Button.Ripple color='success' type='submit' >
        <span className='align-middle ms-25'>SUBMIT</span>
        <Icon.ArrowRightCircle  size={20} />
      </Button.Ripple>
      </div>
      </Col>
      </Row>
      </form>
        </ModalBody>
        <ModalFooter className="comment_model-footer">
          <Button color="modal-success" onClick={() => [toggleModal(false), setUploadedImage([])]}>
            CANCEL
          </Button>
        </ModalFooter>
        </BlockUi>

      </Modal>
    </div>
  )

  return (
    <Fragment>
            <div>{renderModal}</div>
            <div>
        <Models
      // modal = {sentPop} 
      toggleModal={() => toggleSentModal()}
      style={{borderRadius:'30px'}}
      />
      </div>

     {/* <Row> */}
     
       {/* <Col xs='12' sm='12' lg='12' xl={openMail === true ? '4' : '12'} style={{padding:"0px"}}> */}
      <div className='email-app-list '>
        <div className='app-fixed-search d-flex align-items-center topic_navbar'>
          <Link to='/apps'>
          <div className='sidebar-toggle d-block d-lg-none ml-1' onClick={() => setSidebarOpen(true)}>
           <span  style={{padding: "4px 1px"}}  ><img className='back_arrow' src={Back_arrow}/> </span>
          </div>
          </Link>
          <div className='align-content-center menu justify-content-between w-100 details_navbar'>
          <span className='title'> TOPIC </span> 
          { search === false ? <span className='broadcom_align float-right'>
          <div className='sidebar_search'>
          {/* <span className='align-middle dropdown_icon mr20'   ><Icon.RotateCw  style={{padding:"4px"}} /> </span>
          <span className='align-middle dropdown_icon mr20'  ><Icon.Plus /> </span>
          <span className='align-middle dropdown_icon '   onClick={() => [setSearchVisible(!search)] }>  <SearchIcon /> </span> */}
          <span className='align-middle  mr20'   ><img className='img' src={Refresh}  onClick={() => dispatch(getTopics({ ...store.params }))}/></span>
          {params && params.folder !== "" ? <span className='align-middle  mr20' onClick={() => toggleModal(true)}  ><img className='img' src={Plus}  /> </span> : " " }
          <span className='align-middle ' onClick={() => [setSearchVisible(!search)] }> <img className='img' src={Search}  /> </span>
          </div>
          </span> : <TextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
          InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment:(
                  <IconButton
                    className='delete_btn'
                    aria-label="toggle password visibility"
                    onClick={() => [setSearchVisible(!search), setSearchField("")] }
                  >
                   <img img className='img' src={Delete} />
                  </IconButton>
                )
              }}
            /> }

          </div>
        </div>


        <PerfectScrollbar className='email-user-list' options={{ wheelPropagation: false }}>
        <div className='app-action light-gray-bg'>
          <div className='action-left' style={{width:"100%"}}>
          <p className='text-truncate mb-0 topic_title'>{(params && params.folder && params.folder.display_name) || (paramsData && paramsData.folder && paramsData.folder.display_name)} </p>
          </div>
            <div className='action-right'>
            <Info size={20} id='positionLeft' style={{color:"#EE3224"}}/>
            </div>
            <UncontrolledTooltip placement='left' target='positionLeft'>
            {params && params.folder && params.folder.display_name}
            </UncontrolledTooltip>
        </div>

          {mails && mails.data && mails.data.length ? (
            <ul className='email-media-list'>{renderMails()}</ul>
          ) : (
            <div className='no-results d-block'>
              <h5>No Topic Found</h5>
            </div>
        )} 
        </PerfectScrollbar>
      </div>
      {/* </Col>
      <Col xs='12' xl='8' style={openMail === true ? {padding:"0px"} : {borderLeft:"1px solid", display:"none"}}> */}
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        mail={currentMail}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
        updateMails={updateMails}
        paginateMail={paginateMail}
        resetSelectedMail={resetSelectedMail}
        updateMailLabel={updateMailLabel}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      />
            {/* </Col>
      </Row> */}
      {/* <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} /> */}
{/* 
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        mail={store.currentMail}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
        updateMails={updateMails}
        paginateMail={paginateMail}
        updateMailLabel={updateMailLabel}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      /> */}
    </Fragment>
  )
}

export default Mails
