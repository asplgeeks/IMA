import {React, useState, useContext, Fragment, useEffect } from 'react'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, FormGroup, UncontrolledTooltip, Label, Input, Tooltip, InputGroup, InputGroupAddon, ListGroup, ListGroupItem, InputGroupText, CustomInput, Button } from 'reactstrap'
const moment = require('moment')
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { useDispatch } from 'react-redux'
import { handleMaster, handleMasterUpdate } from '@store/actions/masteruser'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'
import { makeStyles, useTheme  } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import 'bootstrap/dist/css/bootstrap.min.css'
import { uploadFile } from 'react-s3'
import IconButton from "@material-ui/core/IconButton"
// import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import InputAdornment from '@material-ui/core/InputAdornment'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import { green, red } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'

const loginAuthID = sessionStorage.getItem('id_token')

const animatedComponents = makeAnimated()
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:10
  },
  container: {
    maxHeight: 440
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  TimeSpan : {
    fontWeight : 200,
    padding:"10px",
    lightingColor:"#E62E2D"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  titleColor :{
    color: "#d52528"
  }
}))

const Agenda = [{}]

const OtherAttendies = (props) => {
  const { register, errors, reset, setValue, handleSubmit } = useForm()
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const onSubmit = (data) => {
    // e.preventDefault()
    console.log(data)
    }
  return (
       <Modal 
        fullScreen={fullScreen}
        className={classes.modal}
        open={props.open}
        toggle={props.handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
      >
        <div className={classes.paper}>
          <h4>Other Attendees</h4>
    <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
      <Row>
       <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Name
                </Label>
                <Input type='text' 
                name="name"
                  className={classnames({ 'is-invalid': errors['name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your name' autoFocus />
                 {errors.name && errors.name.type === 'required' && <p style={{color:"red"}}>name is require</p>}
              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Mobile Number
                </Label>
                <Input type='number'
                name="phone"
                  className={classnames({ 'is-invalid': errors['phone'] })}
                  innerRef={register({ required: true,
                    pattern:{value:/[1-9]{1}[0-9]{9}/,
                    message:"please enter your 10 digit mobile number"},
                     validate: value => value !== '' })}
                 placeholder='Enter your mobile  number' autoFocus />
                 {errors.phone && errors.phone.type === 'required' && <p style={{color:"red"}}>phone is require</p>}
              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Email
                </Label>
                <Input type='email' 
                name="mail"
                  className={classnames({ 'is-invalid': errors['mail'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your email' autoFocus />
                 {errors.mail && errors.mail.type === 'required' && <p style={{color:"red"}}>mail is require</p>}
              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Location
                </Label>
                <Input type='text' 
                name="address"
                  className={classnames({ 'is-invalid': errors['address'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your location' autoFocus />
                 {errors.address && errors.address.type === 'required' && <p style={{color:"red"}}>location is require</p>}
              </FormGroup>
              </Col>

              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Company name
                </Label>
                <Input type='text' 
                name="address"
                  className={classnames({ 'is-invalid': errors['address'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your company name' autoFocus />
                 {errors.address && errors.address.type === 'required' && <p style={{color:"red"}}>Company name is require</p>}
              </FormGroup>
              </Col>
              </Row>

  
              <Button.Ripple color='secondary' onClick={props.handleClose} size="sm" style={{float:"right", margin:"6px"}} >
                Close
              </Button.Ripple>

               <Button.Ripple  className='ripple-button' type="submit" size="sm" style={{float:"right", margin:"6px"}} >
                Save
              </Button.Ripple>

      </Form>
      </div>
      </Modal >
  )
}

const MinuteOfMeetings = (props) => {
    // const { register, errors, reset, setValue, handleSubmit, control } = useForm()
    const [ajendaz, setAjenda] = useState()
    const [open, setOpen] = useState(false)
    const [personName, setPersonName] = useState([])
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }))
    const [stopTime, setStopTime] = useState()
    const [type, setType] = useState()
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { item, id } = props
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const { register, errors, reset, setValue, handleSubmit, control } = useForm({defaultValues: props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [addAjenda, setAddAjenda] = useState([...Agenda])
    
  console.log(currentTime)
   
  const onSelect = (e) => {
    setType(e.target.value)
}

  const toggle = () => setTooltipOpen(!tooltipOpen)
    const handleAddAgenda = () => {
      console.log(Agenda, {})
      setAddAjenda([...Agenda, {}])
    }
 

const onStartMeeting = () => {
  setStopTime(setInterval(() => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000))
}

const EndTime = () => {
clearInterval(stopTime)
}


    const handleRemoveAgenda = (I) => {
      // console.log(e.target.id)
      // const removeAgenda = Agenda.filter((item, index) => {
      //   console.log(Agenda, index)
      //   return Agenda !== e.target.id
      // })
      const value = [...addAjenda]
      value.splice(I, 1)
      setAddAjenda(value)
      // console.log(removeAgenda)
      // setAddAjenda({Agenda : [Agenda.filter()]})
    }
// console.log(errors)

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const handleClickOpen = () => {
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
}
//entering a list on change
const handleChange = (e) => {
  // console.log(e.target.value)
  // if (e.key === 'Enter') {
  
  const ajenda = e.target.value
    setAjenda(ajenda)
    //  e.preventDefault()
  // personName.push(ajenda)
  // setValue("ajenda", personName)
  // setPersonName(personName)
//   reset()
// }
}

//add ajenda
// const addAjenda = () => {
//   personName.push(ajendaz)
//   setValue("ajenda", personName)
//   // setPersonName('')
//   reset({ajenda:[]})
// }

//multiselect attendies value
const changeValue = (selected) => {
  // console.log(stuff)
// console.log(selected)
setValue("attendies", selected)
}

//multiselect other attendies
const changeOtherAttendies = (selected) => {
  // console.log(stuff)
// console.log(selected)
setValue("other_attendies", selected)
}

//delete the list
const onDelete = (e) => {
  const ajendas = personName.filter((item, index) => {
    // console.log(index)
    return index !== e
  })
  // console.log(ajendas)
  setPersonName(ajendas)
}


// handle submit 
    const onSubmit = (data, e) => {   
      // e.preventDefault()
      console.log(data)

      }


    // console.log(props)
return (
  <div className='auth-wrapper auth-v1 px-2'>
  <div className='auth-inner py-2'>
      <OtherAttendies open={open} handleClose={handleClose}/>            
          <Form className='auth-login-form mt-2'
          onSubmit={handleSubmit((data, e) => onSubmit(data, e))}  
          onKeyPress={event => {
            if (event.which === 13 /* Enter */) {
              event.preventDefault()
            }
          }}>
      <Card>
        <CardBody>
          <CardTitle className='mb-1' style={{display:"flex"}}>
          <Col md={6}>
             <h5 className={classes.titleColor}>Meeting Details</h5>
          </Col> 
          <Col md={6} style={{textAlign:"right"}}>
          <Button color="primary" type= "button" outline onClick={() => onStartMeeting()}>
                  Start Meeting
           </Button>
           <span className={classes.TimeSpan}>{currentTime}</span>
           <Button color="primary" type= "button" outline style={{margin:"0px 0px 0px 3px"}} onClick={() => EndTime()}>
                  End Meeting
           </Button>
           </Col>
          </CardTitle>
            <Row  style={{marginTop:"25px"}}>
            <Col md={3}>
            <FormGroup>
                <Label>
                Type of Meeting               
                </Label>
                <Input type='select' 
                name="Location"
                autoComplete="on"
                  className={classnames({ 'is-invalid': errors['Location'] })}
                  // onClick={() => props.history.push('/master_of_meeting/googlemap')}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Location' autoFocus>
                 <option>DAILY MEETING</option>
                 <option>ADJECENT MEETING</option>
                 <option>KKS</option>
                 <option>JW MEET</option>
                 </Input>
                 {errors.Location && errors.Location.type === 'required' && <p style={{color:"red"}}>Location id is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
            <FormGroup>
                <Label>
                Meeting Type               
                </Label>
                <Input type='select' 
                name="Meeting_type"
                  className={classnames({ 'is-invalid': errors['Meeting_type'] })}
                  onChange ={(e) => onSelect(e)}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Unit' autoFocus>
                   <option selected >Select</option>
                 <option >Join Now</option>
                 <option>Scheduled</option>
                 </Input>
                 {errors.Meeting_type && errors.Meeting_type.type === 'required' && <p style={{color:"red"}}>Meeting type  is required</p>}
              </FormGroup>
              </Col>
         
              { type === "Scheduled" ? <Col md={3}>
            <FormGroup>
                <Label>
                 Schedule Type               
                </Label>
                <Input type='select' 
                name="type"
                autoComplete="on"
                  className={classnames({ 'is-invalid': errors['type'] })}
                  // onClick={() => props.history.push('/master_of_meeting/googlemap')}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Location' autoFocus>
                  <option>Select..</option>
                 <option>Daily</option>
                 <option>Weekly</option>
                 </Input>
                 {errors.type && errors.type.type === 'required' && <p style={{color:"red"}}>Schedule type is required</p>}
              </FormGroup>
              </Col> : "" }

    { type === "Scheduled" ? <Col md={3}>
          <FormGroup>
          <Label for="exampleDate">From Date</Label>
           <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
           />
           </FormGroup>
            </Col> : <Col md={2}>
          <FormGroup>
          <Label for="exampleDate">Date</Label>
           <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
           />
           </FormGroup>
            </Col>   }
            
            { type === "Scheduled" ?   <Col md={3}>
          <FormGroup>
          <Label for="exampleDate">To Date</Label>
           <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
           />
           </FormGroup>
            </Col> : ""
           }
      <Col md={2}>
      <FormGroup>
        <Label for="exampleTime">Start Time</Label>
        <Input
          type="time"
          name="start_time"
          id="exampleTime"
          placeholder="time placeholder"
        />
      </FormGroup>
      </Col>
      <Col md={2}>
      <FormGroup>
        <Label for="exampleTime">End Time</Label>
        <Input
          type="time"
          name="end_time"
          id="exampleTime"
          placeholder="time placeholder"
        />
      </FormGroup>
      </Col>

          {/* <Col md={3}>
          <FormGroup>
            <Controller
            name="datetime"
          render={(props) => <TextField
              ref={register({ required: true })}
              {...props}
              type="datetime-local"
              label="End Date/Time"
              InputLabelProps={{
                shrink: true
              }}
            />
          }
          defaultValue={moment.utc(new Date()).format('YYYY-MM-DDThh:mm')}
          control={control}
        >
        </Controller>
           {errors.occurrenceTimestamp && errors.occurrenceTimestamp.type === 'required' && <p style={{color:"red"}}>End date date is require</p>}
          </FormGroup>
        </Col> */}
            <Col md={3}>
            <FormGroup>
                <Label>
                Select Unit               
                </Label>
                <Input type='select' 
                name="Unit"
                  className={classnames({ 'is-invalid': errors['Unit'] })}
                  // onClick={() => props.history.push('/master_of_meeting/googlemap')}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Unit' autoFocus>
                 <option>Neharu Park</option>
                 <option>Nana peth</option>
                 <option>Sadashiv peth</option>
                 <option>Jm road</option>
                 </Input>
                 {errors.Unit && errors.Unit.type === 'required' && <p style={{color:"red"}}>Unit  is required</p>}
              </FormGroup>
              </Col>
            <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Venue
                </Label>
                <Input type='text' 
                name="Venue"
                  className={classnames({ 'is-invalid': errors['Venue'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your venue' autoFocus />
              {errors.Venue && errors.Venue.type === 'required' && <p style={{color:"red"}}>Venue is required</p>}
              </FormGroup>
              </Col>
              <Col md={4}>
              <FormGroup>
                <Label>
                Meeting called by
                </Label>
                <Input
                 type='select'
                 id='Meeting_called_by'
                 name='Meeting_called_by'
                //  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['Meeting_called_by'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Meeting call by'
                 autoFocus >
                   <option>Mr.Ramkrishnana chanchalwiraj</option>
                   </Input>
                 {errors.Meeting_called_by && errors.Meeting_called_by.type === 'required' && <p style={{color:"red"}}>Meeting called is required</p>}
              </FormGroup>
              </Col>
              <Col md={4}>
              <FormGroup>
                <div>
                  <Label className='form-label' for='login-password'>
                  Meeting Organized by
                  </Label>
                </div>
                <Input type='select'
                 id='Meeting_Organised_by'
                 name="Meeting_Organised_by"
                 className={classnames({ 'is-invalid': errors['Meeting_Organised_by'] })}
                 innerRef={register({ 
                  required: true,
                  pattern:{
                  message:"Enter your Meeting Organised by"},
                   validate: value => value !== '' })}
                 placeholder='Meeting Organized by  ' autoFocus >
                    <option>Mr.Ramkrishnana chanchalwiraj</option>
                   </Input>
                 {errors.Meeting_Organised_by && errors.Meeting_Organised_by.type === 'required' && <p style={{color:"red"}}>Meeting Organized is required</p>}
                {/* <InputPasswordToggle className='input-group-merge' id='login-password' /> */}
              </FormGroup>
              </Col>
              <Col md={12}>
          <Row>
              <Col md={6}>
              <FormGroup>
             <Label for="exampleText" >Subject</Label>
                  <Input
                    type="textarea"
                    innerRef={register({ required: true, validate: value => value !== '' })}
                     name="text"
             innerRef={register({ required: true, validate: value => value !== '' })}
               id="exampleSelect"/>
               {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
             </FormGroup>
                </Col>

             <Col md={6}>
              <FormGroup>
                  <Label for="exampleText" >Meeting Details</Label>
                 <Input
                  type="textarea"
                    innerRef={register({ required: true, validate: value => value !== '' })}
                     name="text"
                      id="exampleText" />
                      {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
               </FormGroup>
             </Col>
             </Row>
             </Col>
        <Col md={12}>
          <Row>
              <Col md={5}>
              <FormGroup>
                 <Label id="demo-mutiple-chip-label">Attendees with in organization</Label>
                 <Controller
                   name="attendies"
                       render={({ field }) => (
                 <Select
                       {...field}
                        isMulti
                        innerRef={register({ required: true, validate: value => value !== '' })}
                    // value={stuff}
                    options={[
                        { value: "ms.rupa dixit", label: "ms.rupa dixit" },
                        { value: "ms.ragini sawant", label: "ms.ragini sawant" },
                        { value: "mr.Avinash", label: "mr.Avinash" }
                             ]}
                     onChange = {changeValue}
                 />
                  )}
                  control={control}
                  defaultValue={[]}
                />
                     {errors.attendies && errors.attendies.type === 'required' && <p style={{color:"red"}}>attendies called is required</p>}
              </FormGroup>
            </Col>
                <Col md={4}>
                      <FormGroup>
                <Label  id="demo-mutiple-chip-label">Attendees outside organization</Label>
                {/* <InputGroup> */}
                <Controller
                   name="other_attendies"
                       render={({ field }) => (
                 <Select
                       {...field}
                        isMulti
                        innerRef={register({ required: true, validate: value => value !== '' })}
                    // value={stuff}
                    options={[
                        { value: "mr.tejpal", label: "mr.tejpal" },
                        { value: "mr.sadanand", label: "mr.sadanand" },
                        { value: "mr.ekrupa", label: "mr.ekrupa" }
                             ]}
                     onChange = {changeOtherAttendies}
                    
                 />
                  )}
                  control={control}
                  defaultValue={[{ value: "mr.tejpal", label: "mr.tejpal" }]}
                />
                
              {/* </InputGroup> */}
              {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>Click on the add button to add your attendance</p>}
              </FormGroup>
              </Col>
              <div style={{marginTop:"28px", position:"relative"}}>
              <Button onClick={handleClickOpen} color="success" >Add Other Attendees</Button>
              </div>
              </Row>
              </Col>
</Row>
</CardBody>
</Card>
<div style={{marginTop:"5px"}}>

</div>
      <Card className='mb-0'>
        <CardBody>
          <CardTitle tag='h4' className='mb-1' className={classes.titleColor}>
          <Col md={6}>
             <h5 className={classes.titleColor}>Add MOM</h5>
          </Col> 
          </CardTitle>
          <Row>
              
             {addAjenda.map((agenda, index) => {
               return (
                <div>
          <Col md={12}>
            <a href="javascript:;">
                 <Icon className="fa fa-trash" id={index} onClick={() => handleRemoveAgenda(index)}  style={{ color: red[500], fontSize:"20px", float:"right" }}/>
            </a>
          </Col>

          <Row>
              <Col md={6}>
            <FormGroup>
           <Label>Agenda / Point discussed</Label>
                <Input
                  type="textarea"
                  value={agenda.label}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                   name="text"
              />
                  {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
           </FormGroup>
              </Col>

              <Col md={6}>
            <FormGroup>
           <Label>Action</Label>
                <Input
                  type="textarea"
                  innerRef={register({ required: true, validate: value => value !== '' })}
                   name="action"
              />
                  {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
           </FormGroup>
              </Col>

              <Col md={3}>
            <FormGroup>
                <Label>
                Target Date
                </Label>
                <Input type='date' id='code'
                name="Target_year_start_date"
                  className={classnames({ 'is-invalid': errors['Target_year_start_date'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  autoFocus />
              {errors.Target_year_start_date && errors.Target_year_start_date.type === 'required' && <p style={{color:"red"}}>Financial year end date is required</p>}

              </FormGroup>
              </Col>

              <Col md={3}>
            <FormGroup>
               <Label >Responsibility with in organization</Label>
               <Controller
                 name="attendies"
                     render={({ field }) => (
               <Select
                     {...field}
                      isMulti
                  // value={stuff}
                  options={[
                      { value: "ms.rupa dixit", label: "ms.rupa dixit" },
                      { value: "ms.ragini sawant", label: "ms.ragini sawant" },
                      { value: "mr.Avinash", label: "mr.Avinash" },
                      {value: "All", label:"All"} 
                           ]}
                  //  onChange = {changeValue}
                   defaultValue={[]}
               />
                )}
                control={control}
              />
                   {errors.attendies && errors.attendies.type === 'required' && <p style={{color:"red"}}>attendies called is required</p>}
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
               <Label >Responsibility of outside organization</Label>
               <Controller
                 name="other_responsibility"
                     render={({ field }) => (
               <Select
                     {...field}
                      isMulti
                  // value={stuff}
                  options={[
                      { value: "ms.rupa dixit", label: "ms.rupa dixit" },
                      { value: "ms.ragini sawant", label: "ms.ragini sawant" },
                      { value: "mr.Avinash", label: "mr.Avinash" },
                      {value: "All", label:"All"} 
                           ]}
                  //  onChange = {changeValue}
                   defaultValue={[]}
               />
                )}
                control={control}
              />
                   {errors.other_responsibility && errors.other_responsibility.type === 'required' && <p style={{color:"red"}}>other_responsibility is required</p>}
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
           <Label>Status</Label>
                <Input
                  type="select"
                  innerRef={register({ required: true, validate: value => value !== '' })}
                   name="Status"
              >
                <option>INFO. Schedule</option>
                <option>Schedule</option>
              </Input>
                  {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
           </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup check inline >
          <Input type="checkbox"  style={{width:"20px", height:"20px"}} /> Assign as task
          </FormGroup>
              </Col>

              </Row>
              <div> 
              <Row>
              <Col md={12}>
              {/* <Button color="primary" type= "button" outline>
                  Start Meeting
           </Button>
           <Button color="primary" type= "button" outline style={{margin:"0px 0px 0px 3px"}}>
                  End Meeting
           </Button> */}
              <Button.Ripple color="success"
              onClick={handleAddAgenda}
              size="sm"
               style={{ color: green[500], float:"right", margin:"5px" }}
              >
                Add Agenda
              </Button.Ripple>  
                 {/* <Icon className="fa fa-plus-circle" onClick={handleAddAgenda}  style={{ color: green[500], fontSize:"35px", float:"right" }}/> */}
            </Col>
            </Row>
              <Divider style={{backgroundColor:"#EC8A37"}}/>
              </div>
                </div>
               )
             })} 

           <Col md={12}>
            {/* <Button color="primary" type= "button" outline onClick={() => onStartMeeting()}>
                  Start Meeting
           </Button>
           <span className={classes.TimeSpan}>{currentTime}</span>
           <Button color="primary" type= "button" outline style={{margin:"0px 0px 0px 3px"}} onClick={() => EndTime()}>
                  End Meeting
           </Button> */}
              {/* <Button.Ripple color="success" className='ripple-button' 
              onClick={handleAddAgenda} 
              size="sm"
               style={{ color: green[500], float:"right" }}
              >
                Add Agenda
              </Button.Ripple>   */}
              <Button.Ripple color='danger' className='ripple-button' type="submit" size="sm" style={{float:"right"}} >
                Submit
              </Button.Ripple>  
            </Col>
            </Row>
            </CardBody>
          </Card>
     
            </Form>
            </div>
  </div>
)
}

export default MinuteOfMeetings