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
                {/* <Avatar className='mr-50' img="" imgHeight='50' imgWidth='50' /> */}

            {/* <Row>
              <Col sm={3}>
                dsmahWD
                </Col>
              <Col sm={9}>
            <h5 className='mb-25'>{mail.from.name} </h5>
            <span className='text-truncate'>{mail.subject}</span>
            </Col>
            </Row> */}
            {/* <div class="d-flex"><div class="avatar me-50"><img class="" src="/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-14.ea440a6a.jpg" alt="avatarImg" height="24" width="24"></div><div><small class="text-muted me-25">by</small><small><a class="text-body" href="/">Fred Boone</a></small><span class="text-muted ms-50 me-25">|</span><small class="text-muted">Jan 10, 2020</small></div></div> */}
          </div>
          {/* <div className='mail-meta-item'>
            {mail.attachments && mail.attachments.length ? <Paperclip size={14} /> : null}
            {renderLabels(mail.labels)}
            <span className='mail-date'>{formatDateToMonthShort(mail.time)}</span>
          </div> */}
        </div>
      </Media>
    </Media>
  )
}

export default MailCard


// // ** Custom Components & Plugins
// import classnames from 'classnames'
// import { htmlToString } from '@utils'
// import Avatar from '@components/avatar'
// import { Star, Paperclip } from 'react-feather'
// import { CustomInput, Media } from 'reactstrap'

// const MailCard = props => {
//   // ** Props
//   const {
//     mail,
//     dispatch,
//     selectMail,
//     labelColors,
//     updateMails,
//     selectedMails,
//     handleMailClick,
//     handleMailReadUpdate,
//     formatDateToMonthShort
//   } = props

//   // ** Function to render labels
//   const renderLabels = arr => {
//     if (arr && arr.length) {
//       return arr.map(label => (
//         <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
//       ))
//     }
//   }

//   // ** Function to handle read & mail click
//   const onMailClick = () => {
//     handleMailClick(mail.id)
//     handleMailReadUpdate([mail.id], true)
//   }

//   return (
//     <Media tag='li' onClick={() => onMailClick(mail.id)} className={classnames({ 'mail-read': mail.isRead })}>
//       <div className='media-left pr-50'>
//         <Avatar img={mail.from.avatar} />
//         <div className='user-action'>
//           {/* <CustomInput
//             label=''
//             type='checkbox'
//             checked={selectedMails.includes(mail.id)}
//             id={`${mail.from.name}-${mail.id}`}
//             onChange={e => e.stopPropagation()}
//             onClick={e => {
//               dispatch(selectMail(mail.id))
//               e.stopPropagation()
//             }}
//           /> */}
//           <div className='custom-control custom-checkbox'>
//             <input
//               className='custom-control-input'
//               type='checkbox'
//               id={`${mail.from.name}-${mail.id}`}
//               checked={selectedMails.includes(mail.id)}
//               onChange={e => e.stopPropagation()}
//               onClick={e => {
//                 dispatch(selectMail(mail.id))
//                 e.stopPropagation()
//               }}
//             />
//             <label
//               className='custom-control-label'
//               htmlFor={`${mail.from.name}-${mail.id}`}
//               onClick={e => {
//                 e.stopPropagation()
//               }}
//             ></label>
//           </div>
//           <div
//             className='email-favorite'
//             onClick={e => {
//               e.stopPropagation()
//               dispatch(updateMails([mail.id], { isStarred: !mail.isStarred }))
//             }}
//           >
//             <Star
//               size={14}
//               className={classnames({
//                 favorite: mail.isStarred
//               })}
//             />
//           </div>
//         </div>
//       </div>
//       <Media body>
//         <div className='mail-details'>
//           <div className='mail-items'>
//             <h5 className='mb-25'>{mail.from.name}</h5>
//             <span className='text-truncate'>{mail.subject}</span>
//           </div>
//           <div className='mail-meta-item'>
//             {mail.attachments && mail.attachments.length ? <Paperclip size={14} /> : null}
//             {renderLabels(mail.labels)}
//             <span className='mail-date'>{formatDateToMonthShort(mail.time)}</span>
//           </div>
//         </div>
//         <div className='mail-message'>
//           <p className='text-truncate mb-0'>{htmlToString(mail.message)}</p>
//         </div>
//       </Media>
//     </Media>
//   )
// }

// export default MailCard
