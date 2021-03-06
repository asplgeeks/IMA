// ** Third Party Components
import {React, useState, Fragment, useEffect} from 'react'

import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash, Search} from 'react-feather'
import * as Icon from 'react-feather'
import { Controller, useForm } from 'react-hook-form'
import { Button, ListGroup, ListGroupItem, Badge, Form, Media, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText} from 'reactstrap'

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
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Models from './../../components/Model'
import {
  addNewtreads,
  CategoryList
} from './store/actions'

import Adnew from './../../../Images/addnew.svg'
import Adnewgreen from './../../../Images/addnewgreen.svg'
import Thread from './../../../Images/thread.svg'
import Path from './../../../Images/path.svg'
import Search_img from "../../../Images/Search.svg"

import Up_arrow from "../../../Images/uparrow.svg"
import Down_arrow from "../../../Images/downarrow.svg"

import Delete from "../../../Images/delete.svg"

const Sidebar = props => {
  // ** Props
  const { register, errors, setValue, handleSubmit, control } = useForm()
  const { store, sidebarOpen, toggleCompose, dispatch, getTopics, resetSelectedMail, setSidebarOpen, gettreads, setReloadthread, reloadthread } = props
  const [open, setOpen] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [formValue, setFormValue] = useState({})
  const [value, setValues] = useState("")

  const [modal, setModal] = useState(null)
  const [sentPop, setSentPop] = useState(false)
  const [activeIndex, setActiveIndex] = useState()
  const [catId, setCateid] = useState('')
  // const [category, setCategory] = useState('')
  const { mails, selectedMails, treadDetail, categoryDetail } = store
// console.log(categoryDetail)

const [searchField, setSearchField] = useState("")

const filteredPersons = treadDetail && treadDetail.data && treadDetail.data.filter(
  person => {
    return (
      person && person
      .display_name && person
      .display_name
      .toLowerCase()
      .includes(value.toLowerCase())
    )
  }
)

const getCategoryId = (catDetail) => {
  setCateid(catDetail.id)
  setOpen(false)
}
  const handleClick = () => {
    // setOpen(!open)
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(CategoryList())
  }, [open])
  
useEffect(() => {
  dispatch(gettreads(catId))
}, [catId, reloadthread])
  // ** Vars
  const params = useParams()

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder, index) => {
    setActiveIndex(index)
    dispatch(getTopics({ ...store.params, folder }))
    dispatch(resetSelectedMail())
  }

  const handleLabel = label => {
    dispatch(getTopics({ ...store.params, label }))
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

  // console.log(errors)
// handleSubmit
  const onSubmit = (data) => {
    // console.log(data)
    // setSentPop(true)
    dispatch(addNewtreads(data, {setSentPop, toggleModal}))
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
          <img className='img' src={Adnewgreen} />
          <h5>Request New Thread!</h5>
          <p>In case you feel there is a thread/forum missing. 
            You can always request to admin to create a new one. 
            However, the creation is at the discretion of the admin.
          </p>
    <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
      <Col md={12} sm={12}>
     <FormControl variant="standard" >
        <InputLabel htmlFor="input-with-icon-adornment">
        Thread Title
        </InputLabel>
        <Controller 
        control={control}
        name="title"
        rules={{
          required:{
              value: true,
              message: "Campo obrigat??rio."
          }
      }}
        as={
        <Input
          id="input-with-icon-adornment"
          placeholder="Add Title"
          className={classnames({ 'is-invalid': errors['title'] })}
         innerRef={register("title", {required:true, validate: value => value !== ""})}
          // value={formValue.title || ''}
          // onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <img src={Thread}></img>
            </InputAdornment>
          }
        />
        }
        />
        {errors.title && <p style={{color:"red"}}>Title is required</p>}
      </FormControl>
      </Col>

      <Col md={12} sm={12}>

      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
        Why should it be added as a new thread?
        </InputLabel>
        <Controller 
        control={control}
        name="thread"
         rules={{
        required:{
            value: true,
            message: "Campo obrigat??rio."
        }
    }}
        as={
        <Input
          id="TEST"
          placeholder="Add Description"
          // name='thread'
          // value={formValue.thread || ''}
          // onChange={handleChange}
          className={classnames({ 'is-invalid': errors['thread'] })}
          ref={register("thread", {required:true, validate: value => value !== ""})}
          startAdornment={
            <InputAdornment position="start">
               <img src={Path}></img>
            </InputAdornment>
          }
          // error={formValue.thread === undefined}
        />
        }
        />
        {console.log(errors)}
         {errors.thread && <p style={{color:"red"}}>Thread is required</p>}
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

      <div className='form-group-compose text-center bottom_border details_navbar'>
         <Row>
           <Col lg={12}>
          { search === false ?  <span className='broadcom_align'>
          <ListItem  component="div" tag={Link}  onClick={handleClick}>
            <ListItemText  inset primary="All Categories" />
            {open ? <span className=''><img img className='img' src={Up_arrow} /> </span> : <span className=''> <img className='img'  src={Down_arrow} /> </span>}
          </ListItem>
         
          <div className='sidebar_search'>
          {/* <span className='align-middle dropdown_icon'   onClick={() => [setSearchVisible(!search),  setOpen(false)] }>  <SearchIcon /> </span> */}
                 <span className='align-middle '   onClick={() => [setSearchVisible(!search),  setOpen(false)] }> <img img className='img' src={Search_img} /> </span> 

          </div>
          </span> : <TextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setValues(e.target.value)}
          value={value}
          InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment:(
                  <IconButton className='delete_btn'
                    aria-label="toggle password visibility"
                    onClick={() => [setSearchVisible(!search), setValues("")] }
                  >
                    <img img className='img' src={Delete} />
                  </IconButton>
                )
              }}
            /> }

 <Collapse in={open} timeout="auto" unmountOnExit>
   {categoryDetail && categoryDetail.data && categoryDetail.data.map((detail, index) => {
           return (<List component="div"  className="category_list" disablePadding>
              <ListItem button className={detail.id === catId ? "class_active" : ""} onClick={() => getCategoryId(detail)}>
                <ListItemIcon>
                  <Icon.ChevronRight />
                </ListItemIcon>
                <ListItemText inset primary={detail.cat_name} />
              </ListItem>
            </List>)
               
   })}
          </Collapse>
          </Col> 
          </Row>
            </div>
            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
             
            {filteredPersons && filteredPersons.length ? (
              filteredPersons.map((detail, index) => {
                return (
              <ListGroup tag='div' className='list-group-messages'>
                <ListGroupItem
                //  tag={Link}
                 id={index}
                  to= '/apps'//{`/apps/email/${index}`} //</ListGroup>"/apps/email/${index}"
                  onClick={() => [handleFolder(detail, index), setSidebarOpen(false)]}
                  // action
                  //onClick={() => setSidebarOpen(true)}
                  active={activeIndex === index}
                >
                  <h5 style={activeIndex === index ? {color:"#EE3224"} : {}}>{detail.display_name}</h5>
                  <span className='broadcom_align'>
                    <Breadcrumbs separator="|" aria-label="breadcrumb">
                     {detail.total_topic_count !== 0 ? <Link underline="hover" key="1" color="inherit" href="/" ><span style={activeIndex === index ? {color:"#EE3224"} : {}}>{detail.new_topic_count} New Topics</span></Link> : ""}
                     {detail.total_topic_count !== 0 ?  <Link   key="2"  href="/getting-started/installation/">{detail.total_topic_count} Topics</Link> : <Link underline="hover" key="1" color="inherit" href="/" >Be the first to start a discussion</Link>}
                      <Link  key="3" color="inherit" href="/getting-started/installation/">{detail.members} Members</Link>
                  </Breadcrumbs>
                    <span className='align-middle'>
                      <Badge className='float-right bg-danger' color='white' pill >
                        {/* {store.emailsMeta.draft} */}
                        {detail.unread_comments}</Badge></span>
                    </span>
                </ListGroupItem>
              </ListGroup>
                )
              })) : (<ListGroup tag='div' className='list-group-messages'>
              <ListGroupItem >
                <h5>No Thread Found !</h5> </ListGroupItem> </ListGroup>) }
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
