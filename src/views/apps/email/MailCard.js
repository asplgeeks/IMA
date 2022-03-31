// ** Custom Components & Plugins
import classnames from 'classnames'
import { htmlToString } from '@utils'
import Avatar from '@components/avatar'
import { Star, Paperclip } from 'react-feather'
import { CustomInput, Media, Row, Col } from 'reactstrap'

const MailCard = props => {
  // ** Props
  const {
    mail,
    dispatch,
    selectMail,
    labelColors,
    updateMails,
    selectedMails,
    handleMailClick,
    handleMailReadUpdate,
    formatDateToMonthShort
  } = props

  // ** Function to render labels
  const renderLabels = arr => {
    if (arr && arr.length) {
      return arr.map(label => (
        <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
      ))
    }
  }

  // ** Function to handle read & mail click
  const onMailClick = () => {
    handleMailClick(mail.id)
    handleMailReadUpdate([mail.id], true)
  }

  return (
    <Media tag='li'  >
     
      <Media body>
      <img className='rounded mr-50 mb-50' src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" alt="dsad" width='70' height='50' />
      <img className='rounded mr-50 mb-50' src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" alt="dsad" width='70' height='50' />
      <img className='rounded mr-50 mb-50' src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" alt="dsad" width='70' height='50' />

        <div onClick={() => onMailClick(mail.id)}>
          <p>{htmlToString(mail.message)}</p>
        </div>
        <div className='mail-details'>
          <div className='mail-items'>
          <Media>
           
                <Avatar className='mr-50' img="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-7.ba3f6823.jpg" imgHeight='50' imgWidth='50' />
                <div>
                <h5 className=''>Vidhyabhuan Upadhye</h5>
                <h6 className='text-muted '> CTO, Indian Market Assessment </h6>
               </div>
              </Media>
              <Media body  className='text-muted' style={{fontSize: "16px"}} >
              <small className='text-muted'> Be the first to comment     
                  </small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>Created 5 mins ago</small>
                </Media>
          </div>
         
        </div>
      </Media>
    </Media>
  )
}

export default MailCard

