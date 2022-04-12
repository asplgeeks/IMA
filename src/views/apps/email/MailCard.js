// ** Custom Components & Plugins
import classnames from 'classnames'
import { htmlToString } from '@utils'
import Avatar from '@components/avatar'
import { Star, Paperclip } from 'react-feather'
import { CustomInput, Media, Row, Col } from 'reactstrap'
import PDF from "../../../Images/pdf.svg"

const moment = require('moment')
const MailCard = props => {
  // ** Props
  const {
    mail,
    mailId,
    dispatch,
    selectMail,
    labelColors,
    updateMails,
    selectedMails,
    handleMailClick,
    handleMailReadUpdate,
    formatDateToMonthShort
  } = props

  // // ** Function to render labels
  // const renderLabels = arr => {
  //   if (arr && arr.length) {
  //     return arr.map(label => (
  //       <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
  //     ))
  //   }
  // }

  // ** Function to handle read & mail click
  const onMailClick = () => {
    handleMailClick(mail.id)
    handleMailReadUpdate([mail.id], true)
  }


const files = JSON.parse(mail.files.replaceAll("\"\"", "\""))
  return (
    <Media tag='li' className="topic_info"  >
     <Media body onClick={() => onMailClick(mail.id)}>
        <div className='comment_data'>
        { files.map((img) => {
          { console.log("img", img) }
          if (img.mimetype === "application/pdf") {
            return (<div className='pdf_view'>
            <span className='pdf_text'>
            <span className='pdf-img'><img src={PDF} /> </span>
              <span className='view'>
              <span className='pdf'>PDF</span>
              <span className='size'>{(img.size / (1024 * 1024)).toFixed(1)} MB</span>
              </span>
            </span>
             </div>) 
             } else {
            return (<div className='pdf_view'> <img className='rounded img mr-50 mb-50' src={img.location} alt={img.originalname} /> </div>) 

          }
     }) }
     </div>
       <p style={mailId === mail.id ? {color:"#EE3224"} : {}}>{htmlToString(mail.comment)}</p>
        <div className='mail-details'>
          <div className='mail-items'>
          <Media className="user_info">
          {/* {console.log("mail", mail) } */}
                <Avatar className='mr-50' img={mail.image_url} imgHeight='50' imgWidth='50' />
                <div>
                <h5 className=''>{mail.comment_by}</h5>
                <h6 className='text-muted'> {mail.commentor_designation} </h6>
               </div>
              </Media>
              <Media body  className='text-muted'>
              <small className='text-muted'> Be the first to comment     
                  </small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>{moment(mail.created_datetime).startOf('hour').fromNow()}</small>
                </Media>
          </div>
        </div>
      </Media>
    </Media>
  )
}

export default MailCard

