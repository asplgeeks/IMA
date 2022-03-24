// ** Third Party Components
import {React, useState, Fragment} from 'react'

import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash } from 'react-feather'
import * as Icon from 'react-feather'

import { Button, ListGroup, ListGroupItem, Badge, NavItem, NavLink, Col, Row} from 'reactstrap'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

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

const Sidebar = props => {
  // ** Props
  const { store, sidebarOpen, toggleCompose, dispatch, getMails, resetSelectedMail, setSidebarOpen } = props
  const [open, setOpen] = useState(false)
  const [search, setSearchVisible] = useState(false)

  const [value, setValue] = useState("")

  //  state = {
  //   open: true
  // }

  const handleClick = () => {
    // setOpen(!open)
    setOpen(!open)
  }

//-------------------search toggle ----------------------//

// const OnSearchClick = () => {
//   // setOpen(!open)
//   setSearchVisible(!search)
// }

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

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
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
                      <Link underline="hover" key="1" color="inherit" href="/" > 21 New Topic</Link>
                      <Link   key="2"  href="/getting-started/installation/"> 23 topics </Link>
                      <Link  key="2" color="inherit" href="/getting-started/installation/"> 5 Members </Link>
                  </Breadcrumbs>
                    <span className='align-middle'>{store.emailsMeta.draft ? (
                      <Badge className='float-right bg-danger' color='white' pill >
                        {/* {store.emailsMeta.draft} */}
                        23 </Badge>) : null}</span>
                    </span>
                </ListGroupItem>

                <ListGroupItem
                 tag={Link}
                  to='/apps/email/inbox'
                  onClick={() => handleFolder('inbox')}
                  action
                >
                  <h5>Thread Name HR 2022 Trends</h5>
                  <span className='broadcom_align'>
                    <Breadcrumbs separator="|" aria-label="breadcrumb">
                      <Link underline="hover" key="1" color="inherit" href="/" > 21 New Topic</Link>
                      <Link   key="2"  href="/getting-started/installation/"> 23 topics </Link>
                      <Link  key="2" color="inherit" href="/getting-started/installation/"> 5 Members </Link>
                  </Breadcrumbs>
                    <span className='align-middle'>{store.emailsMeta.draft ? (
                      <Badge className='float-right bg-danger' color='white' pill >
                        {/* {store.emailsMeta.draft} */}
                        23 </Badge>) : null}</span>
                    </span>
                </ListGroupItem>
                <ListGroupItem
                 tag={Link}
                  to='/apps/email/inbox'
                  onClick={() => handleFolder('inbox')}
                  action
                >
                  <h5>Thread Name HR 2022 Trends</h5>
                  <span className='broadcom_align'>
                    <Breadcrumbs separator="|" aria-label="breadcrumb">
                      <Link underline="hover" key="1" color="inherit" href="/" > 21 New Topic</Link>
                      <Link   key="2"  href="/getting-started/installation/"> 23 topics </Link>
                      <Link  key="2" color="inherit" href="/getting-started/installation/"> 5 Members </Link>
                  </Breadcrumbs>
                    <span className='align-middle'>{store.emailsMeta.draft ? (
                      <Badge className='float-right bg-danger' color='white' pill >
                        {/* {store.emailsMeta.draft} */}
                        23 </Badge>) : null}</span>
                    </span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
