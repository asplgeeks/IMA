
// ** React Imports
import { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom"
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
import Adnewgreen from './../../../Images/addnewgreen.svg'
import Thread from './../../../Images/thread.svg'
import Quote from './../../../Images/quote.svg'
import Sub_reply from './../../../Images/sub_reply.svg'
import CollapseIcon from './../../../Images/collaspeIcon.svg'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

// ** Custom Components
import Avatar from '@components/avatar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
// import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
//**UseForm Hook */
import { Controller, useForm } from 'react-hook-form'

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
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Collapse
} from 'reactstrap'
import {
  Paperclip,
  MoreVertical,
  CornerUpLeft,
  CornerUpRight,
  Trash2 } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axiosConfig from './../../../axiosConfig'
import PDFVIEWER from './../../components/PdfReader'
import Dialog from './../../components/Dailog'
const moment = require('moment')

const MailDetails = props => {
  const { register, errors, handleSubmit, control } = useForm()
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

  const [searchField, setSearchField] = useState("")
  const store = useSelector(state => state.email)
  const history = useHistory()
    // ** States
    const [isRtl, setIsRtl] = useRTL()
    const [showReplies, setShowReplies] = useState(false)
    const [search, setSearchVisible] = useState(false)
    const [value, setValue] = useState("")
    const [formValue, setFormValue] = useState({})
    const [modal, setModal] = useState(false)
      const [uploadedImage, setUploadedImage] = useState([])
      const [blocking_state, setBlocking] = useState(false)
      const [commentDetail, setCommentDetail] = useState()
      const [replyDetail, setReplyDetail] = useState()
      const { mails, selectedMails, currentMail } = store
// state pdf
const [pdfUrl, setPDFUrl] = useState("")
console.log(pdfUrl !== "")

    const [Collapse_data, setCollapse_data] = useState([])//useState([])

//toggle collapps
const filter_array = (data) => {
  const filter_info = Collapse_data.filter(function(item) {
    return item !== data
})
setCollapse_data(filter_info)
console.log("check_info12312", Collapse_data)
}

const ToggleCollapse = (data) => {
  console.log("data", data, "array", Collapse_data)
  const  array_data = (Collapse_data.indexOf(data) >= 0)
  array_data === true ? filter_array(data) : setCollapse_data([...Collapse_data, data])
  console.log("check_info", Collapse_data)

} 
console.log("check_info1111", Collapse_data)
// const ToggleCollapse = () => setCollapse_data(!Collapse_data)

  // comment sub comment data
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


  const deleteFunction = (i) => {
    const clearImage = uploadedImage && uploadedImage.filter((image, index) => {
      return uploadedImage.indexOf(image) !== i
    })
    setUploadedImage(clearImage)
  }

  // ** Renders Attachments
const params = {
  // slidesPerView: 3,
  spaceBetween:10,
  breakpoints: {
    1920: {
        slidesPerView: 3,
        spaceBetween: 30
    },
    1028: {
        slidesPerView: 2.2,
        spaceBetween: 30
    },
    480: {
        slidesPerView: 1.2,
        spaceBetween: 10
    },
    380: {
      slidesPerView: 1.2,
      spaceBetween: 10
  }
}

}

const commentparam = {
  // slidesPerView: 1.2,
  spaceBetween:10,
  breakpoints: {
    1920: {
        slidesPerView: 5,
        spaceBetween: 30
    },
    1028: {
        slidesPerView:4,
        spaceBetween: 30
    },
    480: {
        slidesPerView: 2.5,
        spaceBetween: 10
    },
    380: {
      slidesPerView: 2,
      spaceBetween: 10
  }
}
}

// ..show the files
const userFiles = mail && mail.data && mail.data.files
const USER_File_TYPE = JSON.parse(userFiles && userFiles.replaceAll("\"\"", "\""))
const SwiperMultiSlides = () => {
  return (
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          {USER_File_TYPE && USER_File_TYPE.map((image, index) => {
               if (image.mimetype === "application/pdf") {
            return ("")
           } else {
          return (
            <SwiperSlide>
            {image.mimetype.slice(0, 5) === "image" ?   <img src={image.location} alt='swiper 1' className='img-fluid swiper_img' /> : ''}
             </SwiperSlide> 
            )
        }

      })}       
    </Swiper>
  )
}

  // ** Handle show replies, go back, folder & read click functions
  const handleShowReplies = e => {
    e.preventDefault()
    setShowReplies(true)
  }

  const handleGoBack = () => {
    setOpenMail(false)
    history.replace('/apps')
  }

  const toggleForReply = (status, detail) => {
    // console.log("status1", status, detail)
    if (modal !== status) {
      setModal(status)
      setReplyDetail(detail)
    } else {
      setModal(false)
    }
  }

  const toggleModal = (status, detail) => {
    // console.log("status1", status, detail)
    if (modal !== status) {
      setModal(status)
      setCommentDetail(detail)
    } else {
      setModal(false)
    }
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
    // console.log(event.target.files)
    bodyFormData.append('file', value[0])
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  
  const fileList = event.target.files
  // console.log(fileList)
    axiosConfig.post('/admin/uploadFile', bodyFormData, config).then(r => setUploadedImage([...uploadedImage, r.data.data]))
    // uploadedImage.push
    // setFormValue(values => ({...values, [name]: [r.data && r.data.location]}))
  }
  // console.log(mail && mail)
  // onsubmit
  const onSubmit = (data) => {
    // setSentPop(true)
    // console.log(data, uploadedImage, commentDetail, props, replyDetail)
    dispatch(addCommentSubComment(data.comment, uploadedImage, commentDetail, props, replyDetail)).then(info => { 
      // console.log("info", info) 
      if (info === "success") {
        setModal(false)
        // setUploadedImage([])
      }
     })
     .catch(err => {
      // console.log("err", err) 
     })
    // alert(formValue.title)
  }


// console.log(Responses())
    // ** Renders Labels
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
            <h5>Add Reply</h5>
  
       <form  onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col md={12} sm={12}  className="p0">
       <FormControl variant="standard" >
          <InputLabel htmlFor="input-with-icon-adornment">
          Comment
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
            {errors.comment && <p style={{color:"red"}}>Please enter your comment</p>}  
        </FormControl>
        </Col>
        <Col md={12} sm={12} className="p0">
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
        <Col md={12} sm={12} className="p0">
        <FormControl variant="standard">
          <div> 
            {uploadedImage && uploadedImage.map((image, index) => {
                  return (<div className='image_box'>
                  <Icon.XCircle  size={20} style={{float:"right"}} onClick={() => deleteImage(index)}/>
                    <img src={image.location} />
                    </div>)
                })}
            </div>
          </FormControl> 
        </Col>
        <Col md={12} sm={12} className="p0">
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
            <Button color="modal-success" onClick={() => toggleModal(false)}>
              CANCEL
            </Button>
          </ModalFooter>
          </BlockUi>
  
        </Modal>
      </div>
    )

    // const number = () => {
    //   const data = Math.floor((Math.random() * 1000) + 1)
    //   return data
    // }


    const SubComment = ({filteredPersons}) => ( 
      <div  className='sub-comment'>
    
        {/* <div> asndlkafd ksjdfdsfkj {}</div> */}
               {filteredPersons && filteredPersons.map((detail, index) => {
              return (<div>
                <Row className="comment_details" style={detail && detail.subcomments && detail.subcomments.length > 1 ? {marginLeft: "40px !important"} : {}}>
                <Col sm='12' className="p0 m10" >
                <Media> 
                <div className='avatar'>
                <img  src={detail.image_url} height='50' width='50' />
    
                </div>
                  <div>
                  <span className='user_name'>{detail.comment_by}</span>
                  <span className='text-muted '> {detail.commentor_designation} </span>
                  </div>
                </Media>
                

        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...commentparam}>
          {JSON.parse(detail && detail.files.replaceAll("\"\"", "\"")).map((image, index) => {
               if (image.mimetype === "application/pdf") {
            return ("")
           } else {
          return (
            <SwiperSlide>
            {image.mimetype.slice(0, 5) === "image" ?   <img src={image.location} alt='swiper 1' className='img-fluid swiper_img_comment' /> : ''}
             </SwiperSlide> 
            )
        }

      })}       
    </Swiper>
      <div className='sub-comment-pdf'>
       {JSON.parse(detail && detail.files.replaceAll("\"\"", "\"")).map((image, index) => {
                  return (image.mimetype.slice(0, 11) === "application" ? <div className='pdf_view_comment'><span className='pdf_text'>
                     <span className='view'>
                     <span className='pdf-img'><img src={PDF} /><span className='size'>{(image.size / (1024 * 1024)).toFixed(1)} MB</span></span>
                  <span className='pdf-title'>{image.originalname}</span>
                   </span>
                   </span> </div> : ""
                    )
                })}
                </div>
                <p>
                {detail.comment}
                </p>
                
            <small className='text-muted'> {moment(detail.created_datetime).format("DD MMMM  YYYY")} {detail.subcomments ? detail.subcomments.length ? (<span> | {detail.subcomments.length} Replies <span onClick={() => ToggleCollapse(detail.id) }> <img src={CollapseIcon} /></span> </span>) : "" : "" } 
            </small>
                <div style={{float:"right"}} onClick={() => toggleModal(true, detail)}>
                <small className='text-muted'><img src={Reply} />Reply</small>
                </div>
                 </Col>
                </Row>
                <Collapse style={{marginLeft:"20px"}} isOpen={(Collapse_data.indexOf(detail.id) >= 0)}>
                {detail.subcomments ?  <Second_SubComment className="subcomment" filteredPersons={detail.subcomments}  /> : ''}
                </Collapse>

                </div>)
            })}
      </div>
    )


    const Second_SubComment = ({filteredPersons, parent_id}) => (
      <div>
          {filteredPersons && filteredPersons.map((detail, index) => {
              return (<div>
                <Row className="comment_details" style={detail && detail.subcomments && detail.subcomments.length > 1 ? {marginLeft: "40px !important"} : {}}>
                <Col sm='12' className="p0 m10" >

                  
                <Media> 
                <div className='avatar'>
                <img  src={detail.image_url} height='50' width='50' />
    
                </div>
                  <div>
                  <span className='user_name'>{detail.comment_by}</span>
                  <span className='text-muted '> {detail.commentor_designation} </span>
                  </div>
                </Media>
                

        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...commentparam}>
          {JSON.parse(detail && detail.files.replaceAll("\"\"", "\"")).map((image, index) => {
               if (image.mimetype === "application/pdf") {
            return ("")
           } else {
          return (
            <SwiperSlide>
            {image.mimetype.slice(0, 5) === "image" ?   <img src={image.location} alt='swiper 1' className='img-fluid swiper_img_comment' /> : ''}
             </SwiperSlide> 
            )
        }

      })}       
    </Swiper>
      <div className='sub-comment-pdf'>
       {JSON.parse(detail && detail.files.replaceAll("\"\"", "\"")).map((image, index) => {
                  return (image.mimetype.slice(0, 11) === "application" ? <div className='pdf_view_comment'><span className='pdf_text'>
                     <span className='view'>
                     <span className='pdf-img'><img src={PDF} onClick={() => setPDFUrl(image.location)}/><span className='size'>5 MB</span></span>
                  <span className='pdf-title'>{image.originalname}</span>
                   </span>
                   </span> </div> : ""
                    )
                })}
                </div>
                <p>
                {detail.comment}
                </p>
                
            <small className='text-muted'> {moment(detail.created_datetime).format("DD MMMM  YYYY")}{detail.subcomments ? detail.subcomments.length ? (<span> | {detail.subcomments.length}Sub Replies <span onClick={() => ToggleCollapse(detail.id) }> <img src={CollapseIcon} /></span> </span>) : "" : ""} 
            </small>
                <div style={{float:"right"}} onClick={() => toggleModal(true, detail)}>
                <small className='text-muted'><img src={Sub_reply} />Sub-Reply</small>
                </div>
                 </Col>
                </Row>
                <Collapse isOpen={(Collapse_data.indexOf(detail.id) >= 0)}>
                {detail.subcomments ? <Second_SubComment className="subcomment" filteredPersons={detail.subcomments} /> : ''}
                </Collapse>
                </div>)
            })}
      </div>
    )


  return (
    <div
    // className='wrap-border side-navbar square-border d-none d-lg-block border_bottom_none border_top_none'
      className={classnames('email-app-details', {
        show: openMail
      })}
    >
              {pdfUrl !== "" ? <Dialog pdfUrl={pdfUrl} open={pdfUrl !== ""}/> : ''}
<div>{renderModal}</div>
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
          <span className='align-middle mr20'   ><img className='img' src={Refresh}  onClick={() => resetSelectedMail()}/> </span>
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
              <Col sm='12' className="p0">
                <div className='email-label'>
                  <p><img src={Quote}></img> {mail && mail.data && mail.data.comment}</p>
                </div>
          {/* <div style={{
            display: 'block', maxWidth: 600, padding: 30
        }}> Images slider */}
                 {SwiperMultiSlides()}
          {/* </div> */}
</Col>
{USER_File_TYPE && USER_File_TYPE.map((image, index) => {
          return (image.mimetype.slice(0, 11) === "application" ? <div className='pdf_view'> <span className='pdf_text'>
               <span className='view'>
               <span className='pdf-img'><img src={PDF} onClick={() => setPDFUrl(image.location)}/><span className='size'>5 MB</span></span>
            <span className='pdf-title'>{image.originalname}</span>
             </span>
             </span> </div> : ''
             )
              })
            }
            <Col md="12"  className="p0">
              <Media> 
            <div className='avatar'>
            <img  src={mail.image_url} height='25' width='25' />

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
                <small className='text-muted'><img src={Reply} /> Comment </small>
                </div>
              </Media>
              </Col>
            </Row>

            <SubComment filteredPersons={filteredPersons}/>
            {/* </div> */}
            </PerfectScrollbar>
            </div>
        </Fragment>
      ) : null}

    </div>
  )
}

export default MailDetails
