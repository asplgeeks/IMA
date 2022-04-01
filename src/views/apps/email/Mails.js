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
import { Menu, ArrowLeftCircle, Folder, Tag, Mail, Trash, Edit2, Info } from 'react-feather'


import Search from "../../../Images/Search.svg"
import Refresh from "../../../Images/refresh.svg"
import Back_arrow from "../../../Images/backarrow.svg"
import Plus from "../../../Images/add.svg"
import Delete from "../../../Images/delete.svg"

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
console.log(params)
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
    console.log(id)
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
      return mails && mails.data && mails.data.map((mail, index) => {
        console.log(mail)
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
    // }
  }

  return (
    <Fragment>
     <Row>
       <Col xs='12' sm='12' lg='12' xl={openMail === true ? '6' : '12'}>
      <div className='email-app-list'>
        <div className='app-fixed-search d-flex align-items-center'>
          <div className='sidebar-toggle d-block d-lg-none ml-1' onClick={() => setSidebarOpen(true)}>
           <span className='dropdown_icon' style={{padding: "4px 1px"}}  ><img className='back_arrow' src={Back_arrow}  /> </span>

          </div>
          <div className='align-content-center menu justify-content-between w-100 details_navbar'>
          <span className='title'> TOPIC </span> 
          { search === false ? <span className='broadcom_align float-right'>
          <div className='sidebar_search'>
          {/* <span className='align-middle dropdown_icon mr20'   ><Icon.RotateCw  style={{padding:"4px"}} /> </span>
          <span className='align-middle dropdown_icon mr20'  ><Icon.Plus /> </span>
          <span className='align-middle dropdown_icon '   onClick={() => [setSearchVisible(!search)] }>  <SearchIcon /> </span> */}
          <span className='align-middle  mr20'   ><img className='img' src={Refresh}  /></span>
          <span className='align-middle  mr20'  ><img className='img' src={Plus}  /> </span>
          <span className='align-middle ' onClick={() => [setSearchVisible(!search)] }> <img className='img' src={Search}  /> </span>
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
                    className='delete_btn'
                    aria-label="toggle password visibility"
                    onClick={() => [setSearchVisible(!search), setValue("")] }
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
            <Info size={18} />
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
      </Col>
      <Col xs='6' style={{borderLeft:"1px solid"}}>
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
      </Col>
      </Row>
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
