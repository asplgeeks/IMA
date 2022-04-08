// ** React Imports
import { Fragment, useState } from 'react'

// ** Mail Components Imports
import MailCard from './MailCard'
import MailDetails from './MailDetails'
import ComposePopUp from './ComposePopup'
import * as Icon from 'react-feather'
import Models from './../../components/Model'

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

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
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
    selectCurrentMail
  } = props

  const { mails, selectedMails, params, currentMail } = store
  // ** States
  const [openMail, setOpenMail] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [threadDetails, setThreadDetails] = useState(mails)
  const [searchField, setSearchField] = useState("")
const [mailId, setMailId] = useState()
const [modal, setModal] = useState(false)

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
    console.log(id)
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
      console.log(mails)
      return filteredPersons.map((mail, index) => {
        console.log(mail)
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
    console.log("status1", status)
    if (modal !== status) {
      setModal(status)
    } else {
      setModal(false)
    }
  }

  const renderModal = (
    <div className={'theme-{item.modalColor}'} >
      <Modal
        isOpen={modal === true}
        toggle={() => toggleModal(true)}
        className='modal-dialog-centered'
        modalClassName="modal-success" >
        <ModalBody className="comment_model">
          <img className='img' src={Adnewgreen} />
          <h5>Add New Comment</h5>
          <form >
          {/* onSubmit={handleSubmit} */}
          <Row>
      <Col md={12} sm={12}>
     <FormControl variant="standard" >
        <InputLabel htmlFor="input-with-icon-adornment">
        Comment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder="Add Comment"
          name="title"
          multiline
         rows={2}
          // value={formValue.title || ''}
          // onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <img src={Thread}></img>
            </InputAdornment>
          }
        />
      </FormControl>
      </Col>
      <FormControl variant="standard">
      <div className='files'>
                    <Label className='mb-0 btn lable-btn' for='attach-email-item'>
                      <Icon.PlusCircle  className='cursor-pointer'  size={20} /> FILE
                      </Label>
                      <Label>
                      <input type='file'
                       name='attach_email_item' 
                       accept="image/*"
                      //  value={formValue.attach_email_item || []}
                      //  onChange={uploadImage}
                       id='attach-email-item'
                      hidden />
                    </Label>
                  </div>
      </FormControl>
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
        <ModalFooter className="thread-model-footer">
          <Button color="modal-success" onClick={() => toggleModal(false)}>
            CANCEL
          </Button>
        </ModalFooter>
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

     {/* <Row>
     
       <Col xs='12' sm='12' lg='12' xl={openMail === true ? '6' : '12'}> */}
      <div className='email-app-list'>
        <div className='app-fixed-search d-flex align-items-center topic_navbar'>
          <div className='sidebar-toggle d-block d-lg-none ml-1' onClick={() => setSidebarOpen(true)}>
           <span  style={{padding: "4px 1px"}}  ><img className='back_arrow' src={Back_arrow}  /> </span>

          </div>
          <div className='align-content-center menu justify-content-between w-100 details_navbar'>
          <span className='title'> TOPIC </span> 
          { search === false ? <span className='broadcom_align float-right'>
          <div className='sidebar_search'>
          {/* <span className='align-middle dropdown_icon mr20'   ><Icon.RotateCw  style={{padding:"4px"}} /> </span>
          <span className='align-middle dropdown_icon mr20'  ><Icon.Plus /> </span>
          <span className='align-middle dropdown_icon '   onClick={() => [setSearchVisible(!search)] }>  <SearchIcon /> </span> */}
          <span className='align-middle  mr20'   ><img className='img' src={Refresh}  /></span>
          <span className='align-middle  mr20' onClick={() => toggleModal(true)}  ><img className='img' src={Plus}  /> </span>
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
          <p className='text-truncate mb-0 topic_title'>{params && params.folder && params.folder.display_name}</p>
          </div>
            <div className='action-right'>
            <Info size={18} style={{color:"#EE3224"}}/>
            </div>
        </div>

          {mails && mails.data && mails.data.length ? (
            <ul className='email-media-list'>{renderMails()}</ul>
          ) : (
            <div className='no-results d-block'>
              <h5>No Items Found</h5>
            </div>
        )} 
        </PerfectScrollbar>
      </div>
      {/* </Col> */}
      {/* <Col xs='6' style={openMail === true ? {} : {borderLeft:"1px solid", display:"none"}}> */}
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        mail={currentMail}
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
      />
      <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} />
      {/* </Col>
      </Row> */}
      {/* <MailDetails
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
