// ** React Imports
import { Fragment, useState } from 'react'

// ** Mail Components Imports
import MailCard from './MailCard'
import MailDetails from './MailDetails'
import ComposePopUp from './ComposePopup'
import * as Icon from 'react-feather'

// ** Utils
import { formatDateToMonthShort } from '@utils'

import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
// import PlusIcon from "@material-ui/icons/Plus"

import { IconButton } from "@material-ui/core"
import CancelRoundedIcon from "@material-ui/icons/CancelRounded"

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col
} from 'reactstrap'
import { Menu, Search, ArrowLeftCircle, Folder, Tag, Mail, Trash, Edit2, Info } from 'react-feather'

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

  const { mails, selectedMails } = store

  // ** States
  const [openMail, setOpenMail] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [value, setValue] = useState("")

  // ** Variables
  const labelColors = {
    personal: 'success',
    company: 'primary',
    important: 'warning',
    private: 'danger'
  }

  // ** Handles Update Functions
  const handleMailClick = id => {
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
    dispatch(updateMails(arr, { isRead: bool })).then(() => dispatch(resetSelectedMail()))
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
    if (mails.length) {
      return mails.map((mail, index) => {
        return (
          <MailCard
            mail={mail}
            key={index}
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
    }
  }

  return (
    <Fragment>
<<<<<<< HEAD
     <Row>
       <Col xs='12' sm='12' lg='12' xl={openMail === true ? '6' : '12'}>
      <div className='email-app-list'>
=======
     
      <div className='email-app-list topic_navbar'>
>>>>>>> bd6b9e8e055b5ecfb8d3b1ecfd8d92d0dacc4aea
        <div className='app-fixed-search d-flex align-items-center'>
          <div className='sidebar-toggle d-block d-lg-none ml-1' onClick={() => setSidebarOpen(true)}>
           <span className='dropdown_icon' style={{padding: "4px 1px"}}  ><Icon.ArrowLeft /> </span>

          </div>
          <div className='align-content-center menu justify-content-between w-100'>
          <span className='title'> TOPIC </span> 
          { search === false ? <span className='broadcom_align float-right'>
          <div className='sidebar_search'>
          <span className='align-middle dropdown_icon mr20'   ><Icon.RotateCw  style={{padding:"4px"}} /> </span>
          <span className='align-middle dropdown_icon mr20'  ><Icon.Plus /> </span>
          <span className='align-middle dropdown_icon '   onClick={() => [setSearchVisible(!search)] }>  <SearchIcon /> </span>
          </div>
          </span> : <TextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment:(
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => [setSearchVisible(!search), setValue("")] }
                  >
                    <Icon.XCircle />
                  </IconButton>
                )
              }}
            /> }

          </div>
        </div>


        <PerfectScrollbar className='email-user-list' options={{ wheelPropagation: false }}>
        <div className='app-action light-gray-bg'>
          <div className='action-left' style={{width:"100%"}}>
          <p className='text-truncate mb-0 topic_title'>Tread name display for longer text eclips....</p>
          </div>
            <div className='action-right'>
            <Info size={18} />
            </div>
        </div>

          {mails.length ? (
            <ul className='email-media-list'>{renderMails()}</ul>
          ) : (
            <div className='no-results d-block'>
              <h5>No Items Found</h5>
            </div>
        )} 
        </PerfectScrollbar>
      </div>
      </Col>
      <Col xs='6' style={{borderLeft:"1px solid"}}>
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
      />
      <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} />
      </Col>
      </Row>
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
      />
    </Fragment>
  )
}

export default Mails
