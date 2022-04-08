
// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { formatDate } from '@utils'

import * as Icon from 'react-feather'
import SearchIcon from "@material-ui/icons/Search"
//-------------------
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { IconButton } from "@material-ui/core"
import CancelRoundedIcon from "@material-ui/icons/CancelRounded"
import Reply from "../../../Images/reply.svg"
import PDF from "../../../Images/pdf.svg"

import Search from "../../../Images/Search.svg"
import Refresh from "../../../Images/refresh.svg"
import Back_arrow from "../../../Images/backarrow.svg"
import Delete from "../../../Images/delete.svg"

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
// ** Custom Components
import Avatar from '@components/avatar'
import {
  addCommentSubComment
} from './store/actions'
// ** Third Party Components
import classnames from 'classnames'
import {
  Row,
  Col,
  Badge,
  Card,
  Table,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  input,
  Label,
  Carousel,
  CarouselIndicators,
  CarouselCaption,
  CarouselItem,
  CarouselControl 
} from 'reactstrap'
import {
  Paperclip,
  MoreVertical,
  CornerUpLeft,
  CornerUpRight,
  Trash2 } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axiosConfig from './../../../axiosConfig'
const moment = require('moment')
const MailDetails = props => {
  // ** Props
  const {
    mail,
    openMail,
    dispatch,
    labelColors,
    setOpenMail,
    updateMails,
    paginateMail,
    handleMailToTrash,
    handleFolderUpdate,
    handleLabelsUpdate,
    handleMailReadUpdate,
    formatDateToMonthShort,
    resetSelectedMail
  } = props
  console.log(mail)
  // ** States
  const [showReplies, setShowReplies] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [value, setValue] = useState("")
  const [formValue, setFormValue] = useState({})
const [uploadedImage, setUploadedImage] = useState([])
 const items = [
    {
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
      src: 'https://picsum.photos/id/123/1200/600'
    }, {
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
      src: 'https://picsum.photos/id/456/1200/600'
    },
    {
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
      src: 'https://picsum.photos/id/678/1200/600'
    }
  ]

  const slides = items && items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} height="320px" />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    )
  })
  // ** Renders Labels
  const renderLabels = arr => {
    if (arr && arr.length) {
      return arr.map(label => (
        <Badge key={label} color={`light-${labelColors[label]}`} className='mr-50 text-capitalize' pill>
          {label}
        </Badge>
      ))
    }
  }

  // ** Renders Attachments
  const renderAttachments = arr => {
    return arr.map((item, index) => {
      return (
        <a
          key={item.fileName}
          href='/'
          onClick={e => e.preventDefault()}
          className={classnames({
            'mb-50': index + 1 !== arr.length
          })}
        >
          <img src={item.thumbnail} alt={item.fileName} width='16' className='mr-50' />
          <span className='text-muted font-weight-bolder align-text-top'>{item.fileName}</span>
          <span className='text-muted font-small-2 ml-25'>{`(${item.size})`}</span>
        </a>
      )
    })
  }

  // ** Renders Messages
  const renderMessage = obj => {
    return (
      <Card>
        <CardHeader className='email-detail-head'>
          <div className='user-details d-flex justify-content-between align-items-center flex-wrap'>
            <Avatar img={obj.from.avatar} className='mr-75' imgHeight='48' imgWidth='48' />
            <div className='mail-items'>
              <h5 className='mb-0'>{obj.from.name}</h5>
              <UncontrolledDropdown className='email-info-dropup'>
                <DropdownToggle className='font-small-3 text-muted cursor-pointer' tag='span' caret>
                  {obj.from.email}
                </DropdownToggle>
                <DropdownMenu>
                  <Table className='font-small-3' size='sm' borderless>
                    <tbody>
                      <tr>
                        <td className='text-right text-muted align-top'>From:</td>
                        <td>{obj.from.email}</td>
                      </tr>
                      <tr>
                        <td className='text-right text-muted align-top'>To:</td>
                        <td>{obj.to[0].email}</td>
                      </tr>
                      <tr>
                        <td className='text-right text-muted align-top'>Date:</td>
                        <td>
                          {formatDateToMonthShort(obj.time)}, {formatDateToMonthShort(obj.time, false)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className='mail-meta-item d-flex align-items-center'>
            <small className='mail-date-time text-muted'>{formatDate(obj.time)}</small>
            <UncontrolledDropdown className='ml-50'>
              <DropdownToggle className='cursor-pointer' tag='span'>
                <MoreVertical size={14} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='d-flex align-items-center w-100'>
                  <CornerUpLeft className='mr-50' size={14} />
                  Reply
                </DropdownItem>
                <DropdownItem className='d-flex align-items-center w-100'>
                  <CornerUpRight className='mr-50' size={14} />
                  Forward
                </DropdownItem>
                <DropdownItem className='d-flex align-items-center w-100'>
                  <Trash2 className='mr-50' size={14} />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardHeader>
        <CardBody className='mail-message-wrapper pt-2'>
          <div className='mail-message' dangerouslySetInnerHTML={{ __html: obj.message }}></div>
        </CardBody>
        {obj.attachments && obj.attachments.length ? (
          <CardFooter>
            <div className='mail-attachments'>
              <div className='d-flex align-items-center mb-1'>
                <Paperclip size={16} />
                <h5 className='font-weight-bolder text-body mb-0 ml-50'>{obj.attachments.length} Attachment</h5>
              </div>
              <div className='d-flex flex-column'>{renderAttachments(obj.attachments)}</div>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    )
  }

  // ** Handle show replies, go back, folder & read click functions
  const handleShowReplies = e => {
    e.preventDefault()
    setShowReplies(true)
  }

  const handleGoBack = () => {
    setOpenMail(false)
  }

  const handleFolderClick = (e, folder, id) => {
    handleFolderUpdate(e, folder, [id])
    handleGoBack()
  }

  const handleReadClick = () => {
    handleMailReadUpdate([mail.id], false)
    handleGoBack()
  }


  // form input
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormValue(values => ({...values, [name]: value}))
  }

  const uploadImage = (event) => {
    const bodyFormData = new FormData()
    const name = event.target.name
    const value = event.target.files
    console.log(event.target.files)
    bodyFormData.append('file', value[0])
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  
  const fileList = event.target.files
  console.log(fileList)
    axiosConfig.post('/admin/uploadFile', bodyFormData, config).then(r => setUploadedImage([...uploadedImage, r.data.data]))
    // uploadedImage.push
    // setFormValue(values => ({...values, [name]: [r.data && r.data.location]}))
  }
  console.log(mail && mail)
  // onsubmit
  const handleSubmit = (event) => {
    event.preventDefault()
    // setSentPop(true)
    dispatch(addCommentSubComment(formValue, uploadedImage, mail && mail.data, props))
    // alert(formValue.title)
  }

  return (
    <div
    // className='wrap-border side-navbar square-border d-none d-lg-block border_bottom_none border_top_none'
      className={classnames('email-app-details', {
        show: openMail
      })}
    >

      {mail !== null && mail !== undefined ? (
        <Fragment>
     <div className='email-user-list' options={{ wheelPropagation: false }}>
       <div className='app-fixed-search d-flex align-items-center details_navbar'>
          <div className='sidebar-toggle d-block ml-1' onClick={handleGoBack} >
           <span className='' style={{padding: "5px 1px"}}  ><img className='img' src={Back_arrow}  /> </span>
          </div>
          <div className='align-content-center justify-content-between w-100'>
        
          { search === false ?  <span className='broadcom_align float-right'>
          <div className='sidebar_search'>
          <span className='align-middle mr20'   ><img className='img' src={Refresh}  /> </span>
          {/* <span className='align-middle dropdown_icon mr20'  ><Icon.Plus /> </span> */}
          <span className='align-middle  '   onClick={() => [setSearchVisible(!search)] }>  <img className='img' src={Search} /> </span>
          {/* <span className='align-middle dropdown_icon '   onClick={() => [setSearchVisible(!search)] }>  <SearchIcon /> </span> */}

          
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
                  <IconButton className='delete_btn'
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
        <PerfectScrollbar className='email-user-list' options={{ wheelPropagation: true }}>
          {/* <div style={{overflowY:"scroll", scrollbarWidth:"none"}}> */}
            <Row className="topic_details">
              <Col sm='12'>
                <div className='email-label'>
                  <p>"The pharmaceutical industry mainly influences drug regulation"</p>
                </div>
          <div style={{
            display: 'block', maxWidth: 600, padding: 30
        }}> Images slider
          <Carousel
          activeIndex={2}
          next={function noRefCheck () {}}
          previous={function noRefCheck () {}}
    >
      <CarouselIndicators items={items} activeIndex={0} onClickHandler={function noRefCheck () {}} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={function noRefCheck () {}} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={function noRefCheck () {}} />
    </Carousel>
          </div>
              <div className='pdf_view'>
             <span className='pdf_text'>
               <span className='view'>
               <span className='pdf-img'><img src={PDF} /><span className='size'>5 MB</span></span>
            <span className='pdf-title'> Full name of the PDF file uploaded with.pdf</span>
             </span>
             </span>
              </div>

              <Media> 
            <div className='avatar'>
            <img  src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" height='25' width='25' />

            </div>
              <div>
              <span className='user_name'>{mail && mail.data && mail.data.comment_by}</span>
              <span className='text-muted '> {mail && mail.data && mail.data.commentor_designation} </span>
              </div>
            </Media>
            <Media body  className='text-muted' style={{fontSize: "16px"}} >
              <div>
            <small className='text-muted'> {moment(mail && mail.data && mail.data.created_datetime).format("DD MMMM  YYYY")}
                </small>
                <span className='text-muted ml-50 mr-25'>|</span>
                <small className='text-muted'>{mail && mail.data && mail.data.comment_count} Comments </small>
                </div>
                <div>
                <small className='text-muted'><img src={Reply} />Comment </small>
                </div>
              </Media>
              </Col>
                    
            </Row>
            <Row className="comment_details">
            <Col sm='12'>

            <Media> 
            <div className='avatar'>
            <img  src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" height='50' width='50' />

            </div>
              <div>
              <span className='user_name'>{mail && mail.data && mail.data.comment_by}</span>
              <span className='text-muted '> {mail && mail.data && mail.data.commentor_designation} </span>
              </div>
            </Media>
            <p>
            {mail && mail.data && mail.data.comment}
            </p>
             </Col>
            </Row>

        
            <Row className="comment">
            <Col sm='12'>
            <Media body  className='text-muted' style={{fontSize: "16px"}} >
            <small className='text-muted'> {moment(mail && mail.data && mail.data.created_datetime).format("DD MMMM  YYYY")}</small>
            <small className='text-muted'><Icon.XCircle  size={20} />Cancel </small>
              </Media>
              </Col>
             
           <form onSubmit={handleSubmit}>
            <Col sm='12'>
            <div className='comment_box'>
            <FormControl variant="standard">
            <Input
              id="TEST"
              name="comment"
              placeholder="Add Reply"
              floatingLabelText="MultiLine and FloatingLabel"
              multiline
              rows={3}
              value={formValue.comment || ''}
              onChange={handleChange}
              // startAdornment={
              //   <InputAdornment position="start">
              //     <Icon.Edit2  />
              //   </InputAdornment>
              // }
            />
          </FormControl>
          {uploadedImage && uploadedImage.map((image, index) => {
            return (<div className='image_box'>
              <img src={image.location} alt='image'  width='70' height='50' style={{padding:"10px"}}/>
              <Icon.XCircle  size={20} style={{float:"right"}}/>
              </div>)
          })}
          
          <div className='comment_buttons'>
              <div className='comment_attachment'>
                    <Label className='mb-0 btn' for='attach-email-item'>
                      <Icon.PlusCircle  className='cursor-pointer'  size={20} /> FILE
                      <input type='file'
                       name='attach_email_item' 
                       accept="image/*"
                      //  value={formValue.attach_email_item || []}
                       onChange={uploadImage}
                       id='attach-email-item'
                      hidden />
                    </Label>
                  </div>
                  <div className='btn_send_request'>
                <Button.Ripple type='submit' >
                  <span className='align-middle ms-25'>POST REPLY</span>
                  <Icon.ArrowRightCircle  size={20} />
                </Button.Ripple>
              </div>
          </div>
          </div>
             </Col>
             </form>
            </Row>
            {/* </div> */}
            </PerfectScrollbar>
            </div>
        </Fragment>
      ) : null}

    </div>
  )
}

export default MailDetails
