// ** Third Party Components
import {React, useState, Fragment, useEffect} from 'react'

import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash, Search} from 'react-feather'
import * as Icon from 'react-feather'

import { Button, ListGroup, ListGroupItem, Badge, Media, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText} from 'reactstrap'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Avatar from '@components/avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'


import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
import { IconButton } from "@material-ui/core"
import CancelRoundedIcon from "@material-ui/icons/CancelRounded"

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Models from './../../components/Model'
import {
  addNewtreads
} from './store/actions'

import Adnew from './../../../Images/addnew.svg'
const Sidebar = props => {
  // ** Props
  const { store, sidebarOpen, toggleCompose, dispatch, getMails, resetSelectedMail, setSidebarOpen, gettreads } = props
  const [open, setOpen] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [formValue, setFormValue] = useState({})
  const [value, setValue] = useState("")

  const [modal, setModal] = useState(null)
  const [sentPop, setSentPop] = useState(false)
  const { mails, selectedMails, treadDetail } = store
console.log(props)
  const handleClick = () => {
    // setOpen(!open)
    setOpen(!open)
  }
useEffect(() => {
  dispatch(gettreads())
}, [])
  // ** Vars
  const params = useParams()

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = folder => {
    dispatch(getMails({ ...store.params, folder }))
    dispatch(resetSelectedMail())
  }

  const handleLabel = label => {
    dispatch(getMails({ ...store.params, label }))
    dispatch(resetSelectedMail())
  }

  const handleComposeClick = () => {
    toggleCompose()
    setSidebarOpen(false)
  }

  // ** Functions To Active List Item
  const handleActiveItem = value => {
    if ((params.folder && params.folder === value) || (params.label && params.label === value)) {
      return true
    } else {
      return false
    }
  }

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  const toggleSentModal = id => {
    setSentPop(false)
  }


// form input
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormValue(values => ({...values, [name]: value}))
  }
// onsubmit
  const handleSubmit = (event) => {
    event.preventDefault()
    // setSentPop(true)
    dispatch(addNewtreads(formValue, {setSentPop, toggleModal}))
    // alert(formValue.title)
  }
//---------------------------
const renderModal = (
    <div className={'theme-{item.modalColor}'} key={3}>
      <Modal
        isOpen={modal === 3}
        toggle={() => toggleModal(3)}
        className='modal-dialog-centered'
        modalClassName="modal-success"
        key={3}
      >
        {/* <ModalHeader toggle={() => toggleModal(3)}></ModalHeader> */}
        <ModalBody className="thread-model">
          <h5>Request New Thread!</h5>
          <p>In case you feel there is a thread/forum missing. 
            You can always request to admin to create a new one. 
            However, the creation is at the discretion of the admin.
          </p>
          <form onSubmit={handleSubmit}>
          <Row>
      <Col md={12} sm={12}>
     <FormControl variant="standard" >
        <InputLabel htmlFor="input-with-icon-adornment">
        Thread Title
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder="Add Title"
          name="title"
          value={formValue.title || ''}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <Icon.Edit2 />
            </InputAdornment>
          }
        />
      </FormControl>
      </Col>
      <Col md={12} sm={12}>

      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
        Why should it be added as a new thread?
        </InputLabel>
        <Input
          id="TEST"
          placeholder="Add Description"
          name='thread'
          value={formValue.thread || ''}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <Icon.FileText />
            </InputAdornment>
          }
        />
      </FormControl>
      </Col>
      <Col md={12} sm={12}>
        <div className='button_send_request'>
             <Button.Ripple color='success' type='submit' >
        <span className='align-middle ms-25'>SEND REQUEST</span>
        <Icon.ArrowRightCircle  size={20} />
      </Button.Ripple>
      </div>
      </Col>

      </Row>
      </form>
        </ModalBody>
        <ModalFooter className="thread-model-footer">
          <Button color="modal-success" onClick={() => toggleModal(3)}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
  
  return (
    <div className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      {/* render model  */}
      <div>{renderModal}</div>
      <div>
        <Models
      modal = {sentPop} 
      toggleModal={() => toggleSentModal()}
      style={{borderRadius:'30px'}}
      />
      </div>
      <div className='sidebar'>
        <div className='sidebar-content email-app-sidebar'>
          <div className='email-app-menu'>

      <div className='form-group-compose text-center bottom_border '>
         <Row>
           <Col lg={12}>
          { search === false ?  <span className='broadcom_align'>
          <ListItem  component="div" tag={Link}  onClick={handleClick}>
            <ListItemText  inset primary="All Categories" />
            {open ? <span className='dropdown_icon'><ExpandLess /> </span> : <span className='dropdown_icon'> <ExpandMore /> </span>}
          </ListItem>
         
          <div className='sidebar_search'>
          <span className='align-middle dropdown_icon'   onClick={() => [setSearchVisible(!search),  setOpen(false)] }>  <SearchIcon /> </span>
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
                  endAdornment: value && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => [setSearchVisible(!search), setValue("")] }
                  >
                    <CancelRoundedIcon />
                  </IconButton>
                )
              }}
            /> }

 <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          </Col> 
          </Row>
            </div>
            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
              {treadDetail && treadDetail.data && treadDetail.data.map((detail, index) => {
                return (
              <ListGroup tag='div' className='list-group-messages'>
                <ListGroupItem
                 tag={Link}
                  to='/apps/email/inbox'
                  onClick={() => handleFolder('inbox')}
                  action
                  active={!Object.keys(params).length || handleActiveItem('inbox')}
                >
                  <h5>Thread Name HR 2022 Trends</h5>
                  <span className='broadcom_align'>
                    <Breadcrumbs separator="|" aria-label="breadcrumb">
<<<<<<< HEAD
                      <Link underline="hover" key="1" color="inherit" href="/" >{detail.new_topic_count} New Topics</Link>
                      <Link   key="2"  href="/getting-started/installation/">{detail.total_topic_count} Topics</Link>
                      <Link  key="2" color="inherit" href="/getting-started/installation/">{detail.members} Members</Link>
                  </Breadcrumbs>
                    <span className='align-middle'>{store.emailsMeta.draft ? (
                      <Badge className='float-right bg-danger' color='white' pill >
                        {/* {store.emailsMeta.draft} */}
                        {detail.unread_comments}</Badge>) : null}</span>
=======
                      <Link underline="hover" key="1" color="inherit" href="/" > 21 New Topic</Link>
                      <Link   key="2"  href="/getting-started/installation/"> 23 topics </Link>
                      <Link  key="2" color="inherit" href="/getting-started/installation/"> 5 Members </Link>
                  </Breadcrumbs>
                    <span className=''>{store.emailsMeta.draft ? (
                      <Badge  color='white' pill >
                        23 </Badge>) : null}</span>
>>>>>>> bd6b9e8e055b5ecfb8d3b1ecfd8d92d0dacc4aea
                    </span>
                </ListGroupItem>
              </ListGroup>
                )
              })}
            </PerfectScrollbar>
            <div className='light-gray-bg create-thread'>
            <Media onClick={() => toggleModal(3)}>
           {/* <Avatar className='mt5' img={Adnew} imgHeight='40' imgWidth='40' /> */}
           <div className="mt5 img">
           <img  src={Adnew} alt="avatarImg" height="30" width="30" />
           </div>
           <div className='media_text'>
           <h6 className='new_thread mt5'>Request New Thread!</h6>
           <small className='text-muted'>If you feel a thread/forum is missing.</small>    
          </div>
         </Media>
       
            </div>
          </div>
          {/* <XCircle /> */}
         
        </div>
      </div>
    </div>
  )
}

export default Sidebar
