import {React, useState, useContext, Fragment, useEffect } from 'react'
import {Col, Row, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, UncontrolledTooltip, InputGroup, InputGroupAddon, CustomInput, ListGroup, ListGroupItem, Button, Table} from 'reactstrap'
const moment = require('moment')
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import {Printer, Edit} from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import InputAdornment from '@material-ui/core/InputAdornment'
import classnames from 'classnames'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { handleMaster, handleMasterUpdate } from '@store/actions/masteruser'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import 'bootstrap/dist/css/bootstrap.min.css'
import Divider from '@material-ui/core/Divider'
import Select from 'react-select'
import Dialog from '@material-ui/core/Dialog'
import { uploadFile } from 'react-s3'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Icon from '@material-ui/core/Icon'
import { green, red } from '@material-ui/core/colors'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const loginAuthID = sessionStorage.getItem('id_token')

const columns = [
  { id: 'index', label: 'SR. NO.', minWidth: 170 },
  { id: 'staff_count', label: 'staff count', minWidth: 170 },
  { id: 'staff_present', label: 'staff present', minWidth: 170 }
]

const Agenda = [{ id: 'index', label: 'To sort out the place....'}]

const simpleList = [
  {id : "call", label : "jai tredurs"},
  {id : "call", label : "jai tredurs"},
  {id : "call", label : "jai tredurs"}
]
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:"5px",
    backgroundColor: theme.palette.background.paper
  },
  label: {
    width:"100%",
  // display: "flex",
  // textAlign:"center",
  padding:"9px 0px 9px 0px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  nested:{
    margin:"5px",
    height:"30px"
  },  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TimeSpan : {
    fontWeight : 200,
    padding:"10px",
    lightingColor:"#E62E2D"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  titleColor :{
    color: "#d52528"
  }
}))

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

  
              <Button.Ripple color='primary' className='ripple-button' onClick={props.handleClose} size="sm" style={{float:"right"}} >
                Close
              </Button.Ripple>

               <Button.Ripple color='danger' className='ripple-button' type="submit" size="sm" style={{float:"right"}} >
                Save
              </Button.Ripple>

      </Form>
      </div>
      </Modal >
  )
}

const ListUpdateForm = (props) => {
  const { register, errors, reset, setValue, handleSubmit, control } = useForm({defaultValues: props ? props && props.preloadValue && props.preloadValue.detail : ""})
  const [attendies, setAttendies] = useState(false)
  const [open, setOpen] = useState(false)
  const [personName, setPersonName] = useState([])
  const [stuff, setStuff] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }))
  const [stopTime, setStopTime] = useState()
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
console.log(personName)

const options = [
{ value: 'chocolate', label: 'Chocolate' },
{ value: 'strawberry', label: 'Strawberry' },
{ value: 'vanilla', label: 'Vanilla' }
]

const onStartMeeting = () => {
  setStopTime(setInterval(() => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000))
}

const EndTime = () => {
clearInterval(stopTime)
}

const handleClickOpen = () => {
setOpen(true)
}


const handleClose = () => {
setOpen(false)
}
//entering a list on change
const handleChange = (e) => {
console.log(e.target.value)
// if (e.key === 'Enter') {
const ajenda = e.target.value
personName.push(ajenda)
setValue("ajenda", personName)
// reset(e.target.value)
// }
}

//multiselect attendies value
const changeValue = (selected) => {
console.log(stuff)
console.log(selected)
setValue("attendies", selected)
}

//multiselect other attendies
const changeOtherAttendies = (selected) => {
console.log(stuff)
console.log(selected)
setValue("other_attendies", selected)
}

//delete the list
const onDelete = (e) => {
const ajendas = personName.filter((item, index) => {
  console.log(index)
  return index !== e.target.value
})
// console.log(ajendas)
setPersonName(ajendas)
}

// handle submit 
  const onSubmit = (data, e) => {   
    // e.preventDefault()
    console.log(data)

    }

  console.log(props)
return (
<div style={{marginBottom:10}}>
<OtherAttendies open={open} handleClose={handleClose}/>    
<div >
    {/* <OtherAttendies open={open} handleClose={handleClose}/>      */}
    <div style={{padding:10}}>
   </div>
     <Card>
        <CardBody>
        <CardTitle className='mb-1' style={{display:"flex"}}>
          <Col md={6}>
             <h5 className={classes.titleColor}> Edit MOM  </h5>
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
            <Form className='auth-login-form mt-2'
            onSubmit={handleSubmit((data, e) => onSubmit(data, e))}  
            onKeyPress={event => {
              if (event.which === 13 /* Enter */) {
                event.preventDefault()
              }
            }}>
          <Row style={{marginTop:"25px"}}>
          <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Type of Meeting               
                </Label>
                <Input type='select' 
                name="Location"
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
          <Col md={2}>
          <FormGroup>
        <Label for="exampleDate">Start Date</Label>
        <Input
          type="date"
          name="date"
          placeholder="date placeholder"
        />
      </FormGroup>
      </Col>
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
      <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
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
              {errors.Venue && errors.Venue.type === 'required' && <p style={{color:"red"}}>Venue id is required</p>}
              </FormGroup>
              </Col>
            <Col md={3}>
            <FormGroup>
              <Label className='form-label' >
              Responsibility
              </Label>
              <Input
               type='text'
               id='Meeting_called_by'
               name='Meeting_called_by'
              //  onChange={e => setEmail(e.target.value)}
                className={classnames({ 'is-invalid': errors['Meeting_called_by'] })}
                innerRef={register({ required: true, validate: value => value !== '' })}
              placeholder='Meeting call by'
               autoFocus />
               {errors.Meeting_called_by && errors.Meeting_called_by.type === 'required' && <p style={{color:"red"}}>Meeting called is required</p>}
            </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
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
            <Col md={3}>
            <FormGroup>
              <div className='d-flex justify-content-between'>
                <Label className='form-label' for='login-password'>
                Meeting Organised by
                </Label>
              </div>
              <Input type='text'
               id='Meeting_Organised_by'
               name="Meeting_Organised_by"
               className={classnames({ 'is-invalid': errors['Meeting_Organised_by'] })}
               innerRef={register({ 
                required: true,
                pattern:{
                message:"Enter your Meeting Organised by"},
                 validate: value => value !== '' })}
               placeholder='Meeting Organized by  ' autoFocus />
               {errors.Meeting_Organised_by && errors.Meeting_Organised_by.type === 'required' && <p style={{color:"red"}}>Meeting Organized is required</p>}
              {/* <InputPasswordToggle className='input-group-merge' id='login-password' /> */}
            </FormGroup>
            </Col>
            <Col md={3}>
            <FormGroup>
               <Label id="demo-mutiple-chip-label">Attendees within organization</Label>
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
                      { value: "mr.Avinash", label: "mr.Avinash" }
                           ]}
                   onChange = {changeValue}
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
              
              <div style={{marginTop:"27px"}}>
              <Button onClick={handleClickOpen} color="success" >Add Other Attendees</Button>
              </div>
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
                <Label for="exampleText" >Action</Label>
               <Input
                type="textarea"
                  innerRef={register({ required: true, validate: value => value !== '' })}
                   name="text"
                    id="exampleText" />
                    {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>text called is required</p>}
             </FormGroup>
           </Col>

      {/* <Col md={12}>
        <Divider style={{backgroundColor:"#EC8A37"}}/>
        </Col> */}
    {/* <Col md={12}>
            <FormGroup>
              <div className='d-flex justify-content-between'>
                <Label className='form-label' for='login-password'>
               Ajenda
                </Label>
              </div>
              <TextField id="outlined-basic"
               label="Outlined"
               name="ajenda"
               className={classnames({ 'is-invalid': errors['ajenda'] })}
               innerRef={register({ 
                pattern:{
                message:"Enter your Meeting Organised by"}})}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                        <Icon className="fa fa-plus-circle" style={{ color: green[500] }}  value={personName} onClick={(e) => handleChange(e)}/>
                    </InputAdornment>
                  )
                }} 
                fullWidth
                variant="filled" />
               
            </FormGroup>
            {personName && personName.map((ajenda) => { 
            return (
            <ListGroup>
            <ListGroupItem value={ajenda} onClick={(e) => onDelete(e)}>{ajenda} </ListGroupItem>
          </ListGroup>
            )             
                  }
             )}
            </Col> */}
            </Row>
             <Button.Ripple  type="submit" size="sm" style={{float:"right", marginLeft:"8px"}} onClick={props.handleClose}>
             Back
            </Button.Ripple> 
            <Button.Ripple className='ripple-button' type="submit" size="sm" style={{float:"right"}} onClick={props.handleClose}>
              Submit
            </Button.Ripple>       
          </Form>
          </CardBody>
          </Card>
          </div>
</div>
      // </Dialog>
  )
}

const AjendaEdit = (props) => {
  const { register, errors, reset, setValue, handleSubmit, control } = useForm({defaultValues: props ? props && props.preloadValue && props.preloadValue.detail : ""})
  const [addAjenda, setAddAjenda] = useState([...Agenda])
  const classes = useStyles()
console.log(addAjenda)

  const handleAddAgenda = () => {
    console.log(Agenda, {})
    setAddAjenda([...Agenda, {}])
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
  
  const onSubmit = (data, e) => {   
    // e.preventDefault()
    console.log(data)

    }
  return (
        <Card className='mb-0'>
        <CardBody>
          <CardTitle tag='h4' className='mb-1' className={classes.titleColor}>
            <Col md={6}>
               <h5 className={classes.titleColor}>Update List of Agenda</h5>
              </Col>
          </CardTitle>
            <Form className='auth-login-form mt-2'
            onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>

            <ul>
             {addAjenda.map((agenda, index) => {
               return (
                 <div>
          <Col md={12}>
          <a href="javascript:;">
                 <Icon className="fa fa-trash" id={index} onClick={() => handleRemoveAgenda(index)}  style={{ color: red[500], fontSize:"20px", float:"right" }}/>
            </a>
            </Col>
         
                <li>
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
                <Label className='form-label' >
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
               <Label id="demo-mutiple-chip-label">Responsibility with in organization</Label>
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
              <FormGroup check inline>
          <Input type="checkbox"  style={{width:"20px", height:"20px"}} />  Assign as task
          </FormGroup>
              </Col>
              </Row>
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
               style={{ color: green[500], float:"right" }}
              >
                Add Agenda
              </Button.Ripple>  
                 {/* <Icon className="fa fa-plus-circle" onClick={handleAddAgenda}  style={{ color: green[500], fontSize:"35px", float:"right" }}/> */}
            </Col>
            </Row>
              <Divider style={{backgroundColor:"#EC8A37"}}/>
                </li>
                </div>
               )
             })} 
            </ul>
            <Row>
              <Col md={12}>
              {/* <Button.Ripple color="success" className='ripple-button' 
              onClick={handleAddAgenda}
              size="sm"
               style={{ color: green[500], float:"right" }}
              >
                Add Agenda
              </Button.Ripple>   */}
            <Button.Ripple color='danger' className='ripple-button' type="submit" size="sm" style={{float:"right"}} onClick={props.handleClose}>
              Submit
            </Button.Ripple>  
                 {/* <Icon className="fa fa-plus-circle" onClick={handleAddAgenda}  style={{ color: green[500], fontSize:"35px", float:"right" }}/> */}
            </Col>
            </Row>
            {/* <button type="button" className="small">Add Shareholder</button> */}
   
          </Form>
          </CardBody>
          </Card>
  )
}

const ListOfMeeting = (props) => {
  const [open, setOpen] = useState(false)
  const [dialogu, setDialogu] = useState(false)
  const classes = useStyles()
  const [user, setUser] = useState('')
  const [userdetail, setUserDetail] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(4)
console.log(props)
  
  const handleClickOpen = () => {
      setDialogu(true)
  }

  const handleClose = () => {
    setDialogu(false)
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const searchChange = (e) => {
    e.preventDefault()
    const searchstream = e.target.value
   if (searchstream.length > 3) {
    const newstring = new RegExp(searchstream)
          const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
           //  console.log(item.name, searchstream, item.name.match(newstring))
            return item.organizations_name.match(newstring)
          })
          console.log(searchitem)
          setUserDetail({data:{data:searchitem}})
         } else {
           setUserDetail(user)
         }
   }

  const userdetailapi = 'http://172.105.49.15:3030/web/list_contractor'
  useEffect(() => {
    axios.get(userdetailapi)
    .then(r => {
      console.log(r)
      setUser(r)
      setUserDetail(r)
    })
  }, [setUserDetail])

return (
          <div className='auth-wrapper auth-v1 px-2'>
          <div className='auth-inner py-2'>
         {dialogu === true ?   <div>
         <ListUpdateForm  handleClose={handleClose}/>
         <AjendaEdit  handleClose={handleClose}/> 
         </div> : <Card className='mb-0'>
          <CardBody> 
            <Row>
              <Col md={3}>
              <h4 style={{margin:'10px', color:"#E62E2D"}} >Meeting List</h4>
              </Col>
              <Col md={2}>
                  <h6 style={{float:"right", marginTop:"10px"}}>Search</h6>
                  </Col>
              <Col md={3}>
            <FormGroup>
                <Input type='search'
                onChange ={(e) => {
                  searchChange(e)
                }}
                id='code'
                name="image"
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
            </Row>         

            <TreeView
                defaultCollapseIcon={<Icon className="fa fa-minus-circle" style={{ color: green[500] }}/>}
                defaultExpandIcon={<Icon className="fa fa-plus-circle" style={{ color: green[500] }}/>}
              >
                  {userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map((detail, index) => {
              // console.log(detail)
              return (
                <TreeItem  className={classes.root} nodeId={index} label={
              
                   <Row className={classes.label}>
                     <Col md={3}>
                     <span>Name : Daily Meeting</span> 
                     </Col>
                     <Col md={5}>
                     <span>Subject : Add members to the meeting</span> 
                     </Col>
                     <Col md={2} >
                     <span>Date : 2021 12 03</span> 
                     </Col>
                     <Col md={2} >
                     <Printer onClick={() => window.print()}/>
                     </Col>
                   </Row>
                }>
                  {simpleList.map((column, index) => (
                   <List >
                  <ListItem  className={classes.nested}>
                    <ListItemText>
                      {/* <Row>
                   
                     
                      </Row> */}
                      <Row>
                      <Col md={4} style={{display:"flex"}}>
                        <Typography variant="subtitle2" color="primary">Meeting Date: </Typography>
                        <Typography variant="subtitle2">Aug 4th 21</Typography>
                        </Col>
                        <Col md={4} style={{display:"flex"}}>
                        <Typography variant="subtitle2" color="primary">Meeting called by : </Typography>
                        <Typography variant="subtitle2">Mr. sundar pichai</Typography>
                        </Col>
                        <Col md={4} style={{display:"flex"}}>
                        <Typography variant="subtitle2" color="primary">Location : </Typography>
                        <Typography variant="subtitle2">Malewadi</Typography>
                        </Col>
                   
                        <Col md={4}  style={{display:"flex"}}>
                        <Typography variant="subtitle2" color="primary">Subject : </Typography>
                        <Typography variant="subtitle2">Employ stabilization</Typography>
                        </Col>
                        <Col  md={4} style={{display:"flex"}}>
                        <Typography variant="subtitle2" color="primary">Meeting Organised by : </Typography>
                        <Typography variant="subtitle2">Mr. sundar pichai</Typography>
                        </Col>
                      </Row>
                      {/* <Row>
                    
                      </Row> */}
                    </ListItemText>
                    {/* edit the meeting */}
                    <Link onClick={handleClickOpen}>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    </Link>
                    {/* print the doc */}
                    <Link onClick={() => window.print()}>
                    <ListItemIcon>
                        <Printer />
                    </ListItemIcon>
                    </Link>
                  </ListItem>
                  <hr></hr>
                </List>
                  ))}
                </TreeItem>
                        )
                  })}
              </TreeView>
              <Divider style={{backgroundColor:"#EC8A37"}}/>
              <TablePagination
                  rowsPerPageOptions={[1, 2, 4]}
                  component="div"
                  count={userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </CardBody>
                </Card>
            }
            </div>
        
            </div>
          )
          }
export default ListOfMeeting