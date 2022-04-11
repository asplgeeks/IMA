
// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { formatDate } from '@utils'
import { useRTL } from '@hooks/useRTL'
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
import { Swiper, SwiperSlide } from 'swiper/react'
// import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import '@styles/react/libs/swiper/swiper.scss'
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from 'swiper'
SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

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
  CardTitle,
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
  const [isRtl, setIsRtl] = useRTL()
  const [showReplies, setShowReplies] = useState(false)
  const [search, setSearchVisible] = useState(false)
  const [value, setValue] = useState("")
  const [formValue, setFormValue] = useState({})
const [uploadedImage, setUploadedImage] = useState([])

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

  const deleteFunction = (i) => {
    const clearImage = uploadedImage && uploadedImage.filter((image, index) => {
      return uploadedImage.indexOf(image) !== i
    })
    setUploadedImage(clearImage)
  }
  // ** Renders Attachments

const params = {
  slidesPerView: 3,
  spaceBetween:20
}

const SwiperMultiSlides = () => {
  return (
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          <SwiperSlide>
            <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/banner-32.b109b076.jpg" alt='swiper 1' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/banner-31.492c95ac.jpg" alt='swiper 2' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/banner-32.b109b076.jpg" alt='swiper 3' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/banner-31.492c95ac.jpg" alt='swiper 4' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/banner-31.492c95ac.jpg" alt='swiper 5' className='img-fluid' />
          </SwiperSlide>
        </Swiper>
  )
}

// ..show the files
const userFiles = mail && mail.data && mail.data.files
const USER_File_TYPE = JSON.parse(userFiles && userFiles)

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
                  <p>{mail && mail.data && mail.data.comment}</p>
                </div>
          {/* <div style={{
            display: 'block', maxWidth: 600, padding: 30
        }}> Images slider */}
                 {SwiperMultiSlides()}
          {/* </div> */}
          {USER_File_TYPE && USER_File_TYPE.type !== "image" ? <div className='pdf_view'>
             <span className='pdf_text'>
               <span className='view'>
               <span className='pdf-img'><img src={PDF} /><span className='size'>5 MB</span></span>
            <span className='pdf-title'> Full name of the PDF file uploaded with.pdf</span>
             </span>
             </span>
              </div> : ''}

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
              <Icon.XCircle  size={20} style={{float:"right"}} onClick={() => deleteFunction(index)}/>
              </div>)
          })}
          
          <div className='comment_buttons'>
              <div className='comment_attachment'>
                    <Label className='mb-0 btn' for='attach-email-item'>
                      <Icon.PlusCircle  className='cursor-pointer'  size={20} /> FILE
                      <input type='file'
                       name='attach_email_item' 
                       accept="image/*, application/pdf"
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
