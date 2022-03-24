import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, UncontrolledTooltip, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addCustomMaster, updateCustomMaster } from '@store/actions/masteruser'
import axios from 'axios'
const moment = require('moment')
import '@styles/base/pages/page-auth.scss'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
//Optional Import
import { uploadFile } from 'react-s3'
const AWS = require('aws-sdk/global')

const S3 = require('aws-sdk/clients/s3')
const loginAuthID = sessionStorage.getItem('id_token')
AWS.config.update({ accessKeyId: 'AKIARS26YOAJD4KZJDNK', secretAccessKey: 'Ck06E0hZUaQvPkNLqpU6RYhEIBxER4BrOq4jC', region: 'ap-south-1' })
const s3 = new AWS.S3()

const params = {
 Bucket: 'ilovenagar',
 Delimiter: '',
 Prefix: ''
}

//config for s3
const config = {
  bucketName: 'ilovenagar',
  dirName: 'ilovenagar', /* optional */
  region: 'ap-south-1',
  accessKeyId: 'AKIARS26YOAJD4KZJDNK',
  secretAccessKey: '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'
}
const columns = [
  { id: 'index', label: 'Sr.No.', minWidth: 120 },
  { id: 'code', label: 'Customer Code', minWidth: 170, align: 'right' },
  { id: 'name', label: 'Customer Name', minWidth: 170, align: 'right' },
  { id: 'group', label: 'Customer Group', minWidth: 170, align: 'right' },
  { id: 'person', label: 'Contact Person', minWidth: 170, align: 'right' },
  { id: 'pan', label: 'Pan No.', minWidth: 170, align: 'right' },
  { id: 'gst', label: 'Gst No.', minWidth: 170, align: 'right' },
  { id: 'address', label: 'Address', minWidth: 170, align: 'right' },
  { id: 'city', label: 'City', minWidth: 170, align: 'right' },
  { id: 'state', label: 'State', minWidth: 170, align: 'right' },
  { id: 'country', label: 'Country', minWidth: 170, align: 'right' },
  { id: 'zip', label: 'zip Code', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Email Id', minWidth: 170, align: 'right' },
  { id: 'contact', label: 'Contact No', minWidth: 170, align: 'right' },
  { id: 'action', label: 'ACTION', minWidth: 100 }
]


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

const MasterForm = (props) => {
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props.preloadValue && props.preloadValue.detail : ""})
    const dispatch = useDispatch()
    const [customgroup, setCustomGroup] = useState([])
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])

  const  customgroupid = 'http://172.105.49.15:3030/api/master/list_customer_group'
useEffect(() => {
axios.get(customgroupid, {
headers:{
  token:loginAuthID
}
})
.then(r => {
  setCustomGroup(r)
})
}, [setCustomGroup])

const  countryid = 'http://172.105.49.15:3030/api/master/get_country_list'
useEffect(() => {
axios.get(countryid, {
headers:{
  token:loginAuthID
}
})
.then(r => {
  setCountry(r)
})
}, [setCustomGroup])

const stateid = 'http://172.105.49.15:3030/api/master/get_state_list'
   
useEffect(() => {
  axios.get(stateid, {
    headers:{
      token:loginAuthID
    }
  })
  .then(r => setState(r))
}, [stateid])
    const onSubmit = data => {
        console.log(data)
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue) { 
          dispatch(updateCustomMaster(data, props))
        } else {
          dispatch(addCustomMaster(data, props))
        }
      }

    console.log(props)
return (
  <div>
  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row>
          
           <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Customer Code
                </Label>
                <Input type='number' id='code'
                name="customer_code"
                  className={classnames({ 'is-invalid': errors['customer_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='Enter customer code'
                  autoFocus />
              </FormGroup>
              {errors.customer_code && errors.customer_code.type === 'required' && <p style={{color:"red"}}>Customer code is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Customer Name
                </Label>
                <Input type='text' id='code'
                name="customer_name"
                  className={classnames({ 'is-invalid': errors['customer_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='Enter customer name'
                  autoFocus />
              </FormGroup>
              {errors.customer_name && errors.customer_name.type === 'required' && <p style={{color:"red"}}>Customer name is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Customer Group 
                </Label>
                <Input type='select' id='exampleselect'
                name="customer_group"
                  className={classnames({ 'is-invalid': errors['customer_group'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  autoFocus >
                  {customgroup && customgroup.data && customgroup.data.data && customgroup.data.data.map((customer, index) => {
                    return (
                    <option value ={customer._id}>{customer.Customer_group_name}</option>
                    )
                  })}
                  </Input>
              </FormGroup>
              {errors.customer_group && errors.customer_group.type === 'required' && <p style={{color:"red"}}>Customer group is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Contact Person
                </Label>
                <Input type='text' id='code'
                name="contact_person"
                  className={classnames({ 'is-invalid': errors['contact_person'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your contact person'
                  autoFocus />
              </FormGroup>
              {errors.contact_person && errors.contact_person.type === 'required' && <p style={{color:"red"}}>Contact person is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Pan No
                </Label>
                <Input type='text' id='code'
                name="pan_no"
                  className={classnames({ 'is-invalid': errors['pan_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your pan no.'
                  autoFocus />
              </FormGroup>
              {errors.pan_no && errors.pan_no.type === 'required' && <p style={{color:"red"}}>Pan number is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Gst No
                </Label>
                <Input type='text' id='code'
                name="gst_no"
                  className={classnames({ 'is-invalid': errors['gst_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your gst no.'
                  autoFocus />
              </FormGroup>
              {errors.gst_no && errors.gst_no.type === 'required' && <p style={{color:"red"}}>Gst number is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Address
                </Label>
                <Input type='text' id='code'
                name="address"
                  className={classnames({ 'is-invalid': errors['address'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your address'
                  autoFocus />
              {errors.address && errors.address.type === 'required' && <p style={{color:"red"}}>Address is required</p>}

              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                City
                </Label>
                <Input type='text' id='code'
                name="city"
                  className={classnames({ 'is-invalid': errors['city'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your city'
                  autoFocus />
              </FormGroup>
              {errors.city && errors.city.type === 'required' && <p style={{color:"red"}}>City is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                State
                </Label>
                <Input type='select' id='code'
                name="state_id"
                  className={classnames({ 'is-invalid': errors['state_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your state id'
                  autoFocus >
                     {state && state.data && state.data.data && state.data.data.map((stateuser, index) => {
                    return (
                    <option value ={stateuser._id}>{stateuser.state_name}</option>
                    )
                  })}
               </Input>
              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Country
                </Label>
                <Input type='select' id='code'
                name="country_id"
                  className={classnames({ 'is-invalid': errors['country_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  autoFocus>
               {country && country.data && country.data.data && country.data.data.map((country, index) => {
                    return (
                    <option value ={country._id}>{country.country_name}</option>
                    )
                  })}
               </Input>
              </FormGroup>
              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Zip Code
                </Label>
                <Input type='text' id='code'
                name="zip_code"
                  className={classnames({ 'is-invalid': errors['zip_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your zip code'
                  autoFocus />
              </FormGroup>
              {errors.zip_code && errors.zip_code.type === 'required' && <p style={{color:"red"}}>Zip code is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Email Id
                </Label>
                <Input type='email' id='email'
                name="email_id"
                  className={classnames({ 'is-invalid': errors['email_id'] })}
                  innerRef={register({ required: true, 
                    pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message:"please enter your 10 digit otp"},
                    validate: value => value !== '' })}
                 placeholder='please enter your email' 
                 autoFocus />
              </FormGroup>
              {errors.email_id && errors.email_id.type === 'required' && <p style={{color:"red"}}>Email id is required</p>}

              </Col>
              <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Contact No
                </Label>
                <Input type='number' id='code'
                name="contact_no"
                  className={classnames({ 'is-invalid': errors['contact_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  
                  placeholder='please enter your contact no.'
                  autoFocus />
              </FormGroup>
              {errors.contact_no && errors.contact_no.type === 'required' && <p style={{color:"red"}}>Contact no is required</p>}

              </Col>
              <Col md={8}>
              <span className="input-group-btn">
          <Button.Ripple  type="submit" className='ripple-button  btn-theam theam_m' size="sm" style={{float:"right"}}>
          { props.preloadValue ? 'Update' : 'Submit' }
              </Button.Ripple>
              </span>
              </Col>
              </Row>
              {/* { props.preloadValue ?    <Button.Ripple color='primary' className='ripple-button' type="submit" size="sm" style={{float:"right"}} >
               Update
              </Button.Ripple> :   <Button.Ripple color='primary' className='ripple-button' type="submit" size="sm" style={{float:"right"}} >
                Save
              </Button.Ripple>} */}
            
            </Form>
  </div>
)
}


const CustomMaster = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState([])
  const [user, setUser] = useState([])
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searching, setSearchStream] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
 ///search table data
const searchChange = (e) => {
 e.preventDefault()
 const searchstream = e.target.value
//  setSearchStream(searchstream)
//  const searchString = searching
if (searchstream.length > 2) {
  const newstring = new RegExp(searchstream, 'gi')
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
        //  console.log(item.name, searchstream, item.text.match(newstring))
         return item.customer_name.match(newstring) || item.contact_person.match(newstring)
       })
       console.log(searchitem)
       setUserDetail({data:{data:searchitem}})
      } else {
        setUserDetail(user)
      }
}
  const onAddClick = () => {
    setAddForm(true)
    setAddButton(true)
    setUpdateuser(false)
  }
  const onCancleClick = () => {
    setAddForm(false)
    setAddButton(false)
  }

  const onEditClick = (detail) => {
    props.history.push({
      state : {
     detail
     }})
     setUpdateuser(true)
     setAddForm(false)
  }
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_customer_master'
  useEffect(() => {
    axios.get(userdetailapi, {
      headers:{
        token:loginAuthID
      }})
    .then(r => {
      setUser(r)
      setUserDetail(r)
    })
  }, [addform, updateuser])


  useEffect(() => {
    const {location, history} = props
    //use the state via location.state
    //and replace the state via
    history.replace() 
  }, [history])
console.log(userdetail)
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
      { addform === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Customer Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Customer Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
            <MasterForm
             preloadValue={props && props.location && props.location.state} onAdd={() => { setUpdateuser(false) }}
             />
          </CardBody>
        </Card> : "" }
      
        <div style={{padding:10}}>
     
        </div>
        <Card className='mb-0'>
          <CardBody> 
          <Row>
              <Col md={3}>
              <h4 style={{margin:'10px'}} className='mb-1'>Customer List</h4>
              </Col>
              <Col md={2}>
                  <h6 style={{float:"right", marginTop:"10px"}}>Search</h6>
                  </Col>
              <Col md={3}>
            <FormGroup>
                <Input 
                type='search'
                onChange ={(e) => {
                  searchChange(e)
                }}
                id='code'
                name="image"
                //   className={classnames({ 'is-invalid': errors['image'] })}
                //   innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add Customer
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Customer
              </Button.Ripple>
              
            }
              </Col>
            </Row>
        
            <div className={classes.root}>
    <TableContainer>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map((detail, index) => {
              console.log(detail)
              return (
                <TableRow hover role="checkbox" tabIndex={-1} >
                      <TableCell>
                    {index + 1}
                      </TableCell>
                      <TableCell>
                      {detail.customer_code}
                      </TableCell>
                      <TableCell>
                      {detail.customer_name}
                      </TableCell>
                      <TableCell>
                     {detail.customer_group === null ?  "not found" : detail.customer_group.Customer_group_name}
                      </TableCell>
                      <TableCell>
                      {detail.contact_person}
                      </TableCell>
                      <TableCell>
                      {detail.pan_no}
                      </TableCell>
                      <TableCell>
                      {detail.gst_no}
                      </TableCell>
                      <TableCell>
                      {detail.address}
                      </TableCell>
                      <TableCell>
                      {detail.city}
                      </TableCell>
                      <TableCell>
                      {detail.state_id === null ? 'not found' : detail.state_id.state_name}
                      </TableCell>
                      <TableCell>
                      {detail.country_id === null ? 'not found' : detail.country_id.country_name}
                      </TableCell>
                      <TableCell>
                      {detail.zip_code}
                      </TableCell>
                      <TableCell>
                      {detail.email_id}
                      </TableCell>
                      <TableCell>
                      {detail.contact_no}
                      </TableCell>
                      <TableCell>
                      <Button.Ripple className='btn-icon btn-sm rounded-circle' color='flat-success'  onClick={() => onEditClick(detail, props)} outline id={`positionTop_${index + 1}`}>
        <Edit2 size={16} />
      </Button.Ripple>
      <UncontrolledTooltip placement='top' target={`positionTop_${index + 1}`}>
       Edit
      </UncontrolledTooltip>
                      </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[7, 20, 30]}
        component="div"
        count={userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
    </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default CustomMaster