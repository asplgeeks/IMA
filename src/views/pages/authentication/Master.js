import {React, useState, useContext, Fragment, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, UncontrolledTooltip } from 'reactstrap'
const moment = require('moment')
import { useForm, Controller } from 'react-hook-form'
import Switch from '@material-ui/core/Switch'
import classnames from 'classnames'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { handleMaster, handleMasterUpdate } from '@store/actions/masteruser'
import {  forIdToken } from '@store/actions/auth'
import axios from 'axios'
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
import 'bootstrap/dist/css/bootstrap.min.css'
import { uploadFile } from 'react-s3'

const loginAuthID = sessionStorage.getItem('id_token')
// console.log(loginAuthID)
//config for s3
const config = {
  bucketName: 'ilovenagar',
  dirName: 'ilovenagar', /* optional */
  region: 'ap-south-1',
  accessKeyId: 'AKIARS26YOAJD4KZJDNK',
  secretAccessKey: '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'
}
const columns = [
  { id: 'index', label: 'Sr. No.', minWidth: 80 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'size',
    label: 'Mobile Number',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2)
  },
  { id: 'user', label: 'User Type', minWidth: 100 },
  { id: 'photo', label: 'Photo', minWidth: 100 },
  { id: 'dbb', label: 'Date Of Birth', minWidth: 140 },
  { id: 'doj', label: 'Date Of Joining', minWidth: 140 },
  { id: 'ei', label: 'Employe Id', minWidth: 140 },
  { id: 'dp', label: 'Departmente', minWidth: 100 },
  { id: 'ds', label: 'Designation', minWidth: 100 },
  { id: 'rm', label: 'Reporting Manager', minWidth: 100 },
  { id: 'an', label: 'Adhar Number', minWidth: 100 },
  { id: 'pn', label: 'Pan Number', minWidth: 100 },
  { id: 'bs', label: 'Bank A/C Number', minWidth: 180 },
  { id: 'bn', label: 'Bank Name', minWidth: 100 },
  { id: 'ic', label: 'IFSC Code', minWidth: 100 },
  { id: 'org', label: 'Organization', minWidth: 100 },
  { id: 'satus', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 }
]


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  closebutton: {
    borderRadius: "50% !important",
    backgroundColor: "red !important",
    padding: "2px",
    position: "absolute",
    right: "-10px",
    height: "20px",
    width: "20px",
    top: "-10px"
  }
})
// var dummyobject = Array;
const MasterForm = (props) => {
    const { register, errors, reset, setValue, handleSubmit, control } = useForm({defaultValues: props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [email, setEmail] = useState('')
    const [userdetail, setUserDetail] = useState([])
    const [department, setDepartment] = useState('')
    const classes = useStyles()
    const [designation, setDesignation] = useState('')
    const [organization, setOrganization] = useState('')
    const [updatedImage, setUpdatedImage] = useState(props && props.preloadValue && props.preloadValue.detail.photo)
    const [bucketimage, setImage] = useState()
    const [stuff, setStuff] = useState(props && props.preloadValue && props.preloadValue.detail.organization)
    const dispatch = useDispatch()

    const uploadImage = (e) => {
      console.log(e.target.files[0])
      uploadFile(e.target.files[0], config)
    .then(data => {
      setImage(data)
      setValue("photo", data.location)
    })
    .catch(err => console.error(err))
    }

    const userdetailapi = 'http://172.105.49.15:3030/api/user/get_user_list'
    useEffect(() => {
      axios.get(userdetailapi)
      .then(r => {
        console.log(r)
        setUserDetail(r)
      })
    }, [setUserDetail])

 console.log(department)
    const departmentmaster = 'http://172.105.49.15:3030/api/master/get_department_list'
    useEffect(async() => {
     await axios.get(departmentmaster)
      .then(r => setDepartment(r))

    }, [departmentmaster])
    const designations = 'http://172.105.49.15:3030/api/master/get_designation_list'
    useEffect(async() => {
     await axios.get(designations)
      .then(r => setDesignation(r))
    }, [designations])
        const organizations = 'http://172.105.49.15:3030/api/master/list_organization'
    useEffect(() => {
      axios.get(organizations)
      .then(r => setOrganization(r))
    }, [organizations])

    //handlesubmit
    const onSubmit = (data, e) => {
      e.preventDefault()
      console.log(data.photo)
        if (props && props.preloadValue) { 
          dispatch(handleMasterUpdate(data, props))
        } else {
          dispatch(handleMaster(data, props))
        }
      }

///set the date for update 
      useEffect(() => {
        // console.log(props && props.preloadValue && props.preloadValue.detail.photo)
        setValue("date_of_birth", moment(props && props.preloadValue && props.preloadValue.detail.date_of_birth).format("YYYY-MM-DD"))
        setValue("date_of_joining", moment(props && props.preloadValue && props.preloadValue.detail.date_of_joining).format("YYYY-MM-DD"))
        setValue("status", props && props.preloadValue && props.preloadValue.detail.status === 0 ? 0 : 1)
        setValue("photo", props && props.preloadValue && props.preloadValue.detail.photo)
      }, [setValue])
      
      const changeValue = (selected) => {
        // console.log(stuff)
      console.log(selected)
      setValue("organization_id", selected)
      }

      const handleChange = selected => {
        console.log(selected)
        setValue(selected)
        // console.log(stuff)
      }
    console.log(props)
    const options = props && props.preloadValue && props.preloadValue.detail.organization.map((values, index) => {
      return {value:values._id, label : values.location_name}
        })

console.log(options)
return (
  <div>
  <Form className='auth-login-form mt-2' onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
            <Row>

            <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Name
                </Label>
                <Input type='name' 
                name="name"
                  className={classnames({ 'is-invalid': errors['name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your full name' autoFocus />
                  {errors.name && errors.name.type === 'required' && <p style={{color:"red"}}>full name is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                 type='email'
                 id='login_email'
                 name='email_id'
                 onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['email_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter your mail id'
                 autoFocus />
              {errors.email_id && errors.email_id.type === 'required' && <p style={{color:"red"}}>Mail id is required</p>}
              </FormGroup>

              </Col>
              <Col md={3}>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Mobile Number
                  </Label>
                </div>
                <Input type='text'
                 id='mobile'
                 maxLength="10"
                 name="mobile_number"
                 className={classnames({ 'is-invalid': errors['mobile_number'] })}
                 innerRef={register({ 
                  required: true,
                  pattern:{value:/[1-9]{1}[0-9]{9}/,
                  message:"Enter your 10 digit mobile number"},
                   validate: value => value !== '' })}
                 placeholder='Enter your mobile' autoFocus />
                {/* <InputPasswordToggle className='input-group-merge' id='login-password' /> */}
                {errors.mobile_number && errors.mobile_number.type === 'required' && <p style={{color:"red"}}>Mobile number is required</p>}
              </FormGroup>
              </Col>
              {/* <Col md={3}>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <Input type='text'
                 id='password'
                 name="password"
                 className={classnames({ 'is-invalid': errors['password'] })}
                 innerRef={register({ 
                  required: true,
                   validate: value => value !== '' })}
                 placeholder='Enter your password' autoFocus />
              </FormGroup>
              </Col> */}
              <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >User Type</Label>
        <Input type="select" name="type" 
             className={classnames({ 'is-invalid': errors['type'] })}
             innerRef={register({ required: true, validate: value => value !== '' })}
        id="exampleSelect">
          <option>Staff</option>
          <option>Admin</option>
        </Input>
        {errors.type && errors.type.type === 'required' && <p style={{color:"red"}}>Type is required</p>}
      </FormGroup>
      </Col>

      <Col md={3}>
      <FormGroup>
                <Label className='form-label' for='login-email'>
             Date Of Birth
                </Label>
                <Input type='date'
                name="date_of_birth"
                  className={classnames({ 'is-invalid': errors['date_of_birth'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  autoFocus />
              {errors.date_of_birth && errors.date_of_birth.type === 'required' && <p style={{color:"red"}}>Date of birth id is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
             Date Of Joining
                </Label>
                <Input type='date' id='code'
                name="date_of_joining"
                  className={classnames({ 'is-invalid': errors['date_of_joining'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  // defaultValue={moment(props && props.preloadValue && props.preloadValue.detail.date_of_joining).format("YYYY-MM-DD")}
                  autoFocus />
              {errors.date_of_joining && errors.date_of_joining.type === 'required' && <p style={{color:"red"}}>Date of joining is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Employee Id
                </Label>
                <Input type='number' 
                name="employee_id"
                  className={classnames({ 'is-invalid': errors['employee_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your employe id' autoFocus />
              {errors.employee_id && errors.employee_id.type === 'required' && <p style={{color:"red"}}>Employe id is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >Department</Label>
        <Input type="select" name="department_id"
                 className={classnames({ 'is-invalid': errors['department_id'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="exampleSelect">
         {department && department.data && department.data.data && department.data.data.map((depart, index) => {
           return (
            <option value={depart._id}>{depart.department_name}</option>
           )
         })} 
        </Input>
        {errors.department_id && errors.department_id.type === 'required' && <p style={{color:"red"}}>department id is required</p>}
      </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >Designation</Label>
        <Input type="select" name="designation_id"
                 className={classnames({ 'is-invalid': errors['designation_id'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="exampleSelect">
         {designation && designation.data && designation.data.data && designation.data.data.map((countries, index) => {
           return (
            <option value={countries._id}>{countries.designation_name}</option>
           )
         })} 
        </Input>
        {errors.designation_id && errors.designation_id.type === 'required' && <p style={{color:"red"}}>designation id is required</p>}
      </FormGroup>
        </Col>
              {/* <Col md={3}>
      <FormGroup>
        <Label id="demo-mutiple-chip-label">Attendies</Label>
        <Select 
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[]}
              isMulti
              options={options} />
        </FormGroup>
      </Col> */}
          <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >Organization</Label>
        <Controller
        name="organization_id"
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            // value={{label:props && props.preloadValue && props.preloadValue.detail.organization_name}}
            options={organization && organization.data && organization.data.data && organization.data.data.map((org, index) => {
              return  { value : org._id, label : org.location_name }
            })}
            onChange = {changeValue}
            // {console.log()}
            defaultValue={options}
          />
        )}
        control={control}
      />
      {errors.a && errors.a.type === 'required' && <p style={{color:"red"}}>organization id is required</p>}
         {/* {organization && organization.data && organization.data.data && organization.data.data.map((org, index) => {
           return (
            <option value={org._id}>{org.location_name}</option>
           )
         })}  */}
        {/* </Input> */}
      </FormGroup>
              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Reporting Manager
                </Label>
                <Input type='select' 
                name="reporting_manager_id"
                  className={classnames({ 'is-invalid': errors['reporting_manager_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your reporting manager id' autoFocus >
                             {userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.map((detail, index) => {
              // console.log(detail)
              return (<option value={detail._id}>{detail.name}</option>) 
            }
              )}
              </Input>
              {errors.reporting_manager_id && errors.reporting_manager_id.type === 'required' && <p style={{color:"red"}}>reporting manager is required</p>}
              </FormGroup>
              </Col>
              {(bucketimage && bucketimage.location) || (updatedImage) ? <Col md={1}>       
                  <Button close className={classes.closebutton} onClick={() => {
                     setImage("")
                     setUpdatedImage("")
                  }}/>
                <img src={(bucketimage && bucketimage.location) || (props && props.preloadValue && props.preloadValue.detail && props.preloadValue.detail.photo)} width="80px" height="80px" alt="img"/> 
                </Col> :     <Col md={3}><FormGroup>
                <Label className='form-label' for='login-email'>
                Feed Logo
                </Label>
                <CustomInput type="file"
                 id="exampleCustomFileBrowser"
                 name="photo"
                 onChange={(e) => uploadImage(e)}
                 className={classnames({ 'is-invalid': errors['photo'] })}
                 innerRef={register("photo", {required: true, validate: value => value !== '' })}
                />
                {errors.photo && errors.photo.type === 'required' && <p style={{color:"red"}}>logo is required</p>}
              </FormGroup>
              </Col> 
               }
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Aadhar Number
                </Label>
                <Input type='number' 
                name="adhar_no"
                  className={classnames({ 'is-invalid': errors['adhar_no'] })}
                  innerRef={register({ required: true,
                    pattern:{value:/^\d{12}$/,
                  message:"Enter your adhar number properly"},
                    validate: value => value !== '' })}
                 placeholder='Enter your adhar number' autoFocus />
              {errors.adhar_no && errors.adhar_no.type === 'required' && <p style={{color:"red"}}>adhar no. is required</p>}
              </FormGroup>
              </Col>

              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 PAN Number
                </Label>
                <Input type='name' 
                name="pan_no"
                  className={classnames({ 'is-invalid': errors['pan_no'] })}
                  innerRef={register({ required: true,
                    pattern:{value:/[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message:"Enter your adhar number properly"},
                    validate: value => value !== '' })}
                  
                 placeholder='Enter your pan number' autoFocus />
                 {errors.pan_no && errors.pan_no.type === 'required' && <p style={{color:"red"}}>pan no. is required</p>}
              </FormGroup>     
              </Col>

              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Bank A/C Number
                </Label>
                <Input type='number' 
                name="bank_account_no"
                  className={classnames({ 'is-invalid': errors['bank_account_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your a/c number' autoFocus />
                 {errors.bank_account_no && errors.bank_account_no.type === 'required' && <p style={{color:"red"}}>bank a/c number is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Bank Name
                </Label>
                <Input type='name' 
                name="bank_name"
                  className={classnames({ 'is-invalid': errors['bank_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your bank name' autoFocus />
                 {errors.bank_name && errors.bank_name.type === 'required' && <p style={{color:"red"}}>bank name is required</p>}
              </FormGroup>

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 IFSC Code
                </Label>
                <Input type='name' 
                name="ifsc_code"
                  className={classnames({ 'is-invalid': errors['ifsc_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your ifsc code' autoFocus />
                 {errors.ifsc_code && errors.ifsc_code.type === 'required' && <p style={{color:"red"}}>Ifsc is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >Status</Label>
        <Input type="select"
         name="status"
        className={classnames({ 'is-invalid': errors['status'] })}
        innerRef={register({ required: true, validate: value => value !== ''  })}
        id="exampleSelect">
          <option id="1" value={1}>Active</option>
          <option value={0}>Deactive</option>
        </Input>
        {errors.status && errors.status.type === 'required' && <p style={{color:"red"}}>status is required</p>}
      </FormGroup>
      </Col>
              </Row>
              { props.preloadValue ?    <Button.Ripple className='ripple-button btn-theam' type="submit" size="sm" style={{float:"right"}} >
               Update
              </Button.Ripple> :   <Button.Ripple className='ripple-button btn-theam' type="submit" size="sm" style={{float:"right"}} >
                Save
              </Button.Ripple>}          
            </Form>
  </div>
)
}

const Master = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState('')
  const [user, setUser] = useState('')
  const [locationhistory, setLocationhistory] = useState(props.location.state)
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searching, setSearchStream] = useState('')
  // console.log(userdetail)
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
if (searchstream.length > 3) {
 const newstring = new RegExp(searchstream)
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
        //  console.log(item.name, searchstream, item.name.match(newstring))
         return item.name.match(newstring) || item.mobile_number.match(newstring) || item.type.match(newstring) || item.email_id.match(newstring)
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
  const onEditClick = (detail, props) => {
    props.history.push({
      state : {
        detail
     }})
     setUpdateuser(true)
     setAddForm(false)
  }
useEffect(() => {

}, [props])

  const userdetailapi = 'http://172.105.49.15:3030/api/user/get_user_list'
  useEffect(() => {
    axios.get(userdetailapi)
    .then(r => {
      // console.log(r)
      setUser(r)
      setUserDetail(r)
    })
  }, [addform, updateuser])

  //  console.log(locationhistory)
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        { addform === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            User Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} onMasterSave={() => setAddButton(false)}/>
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            User Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
            <MasterForm
             preloadValue={props && props.location && props.location.state} onAdd={() => { setUpdateuser(false) }}
             onMasterSave={() => setAddButton(false)}
             />
          </CardBody>
        </Card> : "" }
   
        <div style={{padding:5}}>
     
        </div>
        <Card className='mb-0'>
          <CardBody> 
            <Row>
              <Col md={3}>
              <h4 style={{margin:'10px'}} className='mb-1'>User List</h4>
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
                //   className={classnames({ 'is-invalid': errors['image'] })}
                //   innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple className='ripple-button btn-theam' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add User
              </Button.Ripple> : <Button.Ripple className='ripple-button btn-theam' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add User
              </Button.Ripple>
              
            }
              </Col>
            </Row>
         
     
             {/* <Table  responsive>
     <thead>
        <tr>
          <th>Sr. No.</th>
          <th> Name</th>
          <th>Number</th>
          <th>Email</th>
          <th>User Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
           
      <tbody>
      { userdetail && userdetail.data && userdetail.data.map((detail, index) => {
        return (
          <tr>
           <th scope="row">{index + 1}</th>
          <td>{detail.name}</td>
          <td>{detail.mobile_number}</td>
          <td>{detail.email_id}</td>
          <td>{detail.type}</td>
          <td>{detail.status}</td>
          <td><span onClick={() => onEditClick(detail, props)}>&#9998;</span></td>
        </tr>  
        )
 
         })
      }
      </tbody>
    </Table>  */}

      <TableContainer>
        <Table stickyHeader  size="small" aria-label="a dense table">
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
              // console.log(detail)
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={detail.code}>
                      <TableCell >
                    {index + 1}
                      </TableCell>
                      <TableCell >
                      {detail.name}
                      </TableCell>
                      <TableCell >
                      {detail.mobile_number}
                      </TableCell>
                      {/* <TableCell >
                     hjdhjsa88
                      </TableCell> */}
                      <TableCell >
                      {detail.email_id}
                      </TableCell>
                      <TableCell >
                      {detail.type}
                      </TableCell>
                      <TableCell >
                        {detail.photo === 'photo' ? '' :  <img src={detail.photo} width="50px" height="50px" alt="img"/> }
                      </TableCell>
                      <TableCell >
                      {moment(detail.date_of_birth).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell >
                      {moment(detail.date_of_joining).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell >
                      {detail.employee_id}
                      </TableCell>
                      <TableCell >
                      {detail.department_id && detail.department_name}
                      </TableCell>
                      <TableCell >
                      {detail.designation_id && detail.designation_name}
                      </TableCell>
                      <TableCell >
                      {detail.reporting_manager_id}
                      </TableCell>
                      <TableCell >
                      {detail.adhar_no}
                      </TableCell>
                      <TableCell >
                      {detail.pan_no}
                      </TableCell>
                      <TableCell >
                      {detail.bank_account_no}
                      </TableCell>
                      <TableCell >
                      {detail.bank_name}
                      </TableCell>
                      <TableCell >
                      {detail.ifsc_code}
                      </TableCell>
                      <TableCell >
                      {detail.organization_name.map((organizations, index) => {
                        return (<p style={{display:"inline"}}>{organizations},</p>)
                      })}
                      </TableCell>
                      <TableCell >
                      {detail.status === true ?  <Switch
        checked={true}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> : <Switch
      checked={false}
      name="checkedA"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />}
                      </TableCell>
                      <TableCell key={detail._v} >
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
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default Master