import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, UncontrolledTooltip, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addOrganizationMaster, updateOrganizationMaster } from '@store/actions/masteruser'
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
const loginAuthID = sessionStorage.getItem('id_token')
const columns = [
  { id: 'index', label: 'Sr.No.', minWidth: 120 },
  {
    id: 'name',
    label: 'Location Code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'location',
    label: 'Location Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'shotcode',
    label: 'Location Short Code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'pan',
    label: 'PAN Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'gst',
    label: 'GST Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'inc',
    label: 'Incorp. Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'plant',
    label: 'Plant Head',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'tele',
    label: 'Telephone Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'webs',
    label: 'Website',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'district',
    label: 'District',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'zip',
    label: 'ZIP Code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'perchase',
    label: 'Perchase Id',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  { id: 'action', label: 'Action', minWidth: 100 }
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
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : "",  shouldUnregister: false})
    const [userlist, setUserList] = useState([])
    const [usercountrylist, setUserCountry] = useState([])
    const [plantHeadid, setPlantHeadId] = useState("")
    const [state, setState] = useState([])
    const [countryid, setCountryid] = useState('')
    const [planthead, setPlantHead] = useState('')
    const dispatch = useDispatch()

console.log(props)
    useEffect(() => {
      setPlantHead(props && props.preloadValue && props.preloadValue.detail.plant_head._id)
      setValue("country", props && props.preloadValue && props.preloadValue.detail.country_id._id)
      setValue("state", props && props.preloadValue && props.preloadValue.detail.state_id._id)
      setCountryid(props && props.preloadValue && props.preloadValue.detail.country_id._id)
    }, [setValue, setPlantHead, setCountryid])
// console.log(countryid)
    const userList = 'http://172.105.49.15:3030/api/user/get_user_list'
    useEffect(() => {
      axios.get(userList)
      .then(r => setUserList(r))
    }, [userList])

    const countryList = 'http://172.105.49.15:3030/api/master/get_country_list'
    const statebycountryid = 'http://172.105.49.15:3030/api/master/get_state_by_country_id'
    useEffect(() => {
      axios.get(countryList
      //   , {
      //   headers:{
      //     token:loginAuthID
      //   }
      // }
      )
      .then(r => setUserCountry(r))
    }, [countryList])

    useEffect(() => {
      if (countryid) {
        axios.post(statebycountryid, {
          country_id:countryid
        }
        )
        .then(r => {
          console.log(r)
          setState(r)
        })
      }
    }, [countryid])

    //HANDLE SUBMIT
    const onSubmit = data => {
        if (props && props.preloadValue) { 
          dispatch(updateOrganizationMaster(data, props))
        } else {
          dispatch(addOrganizationMaster(data, props))
        }
      }

    // console.log(props)
return (
  <div>
  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row> 
            <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Purchase Acknowledge Email Id
                </Label>
                <Input type='acknowledgeId' id='acknowledgeId'
                name="purchase_email_id"
                  className={classnames({ 'is-invalid': errors['purchase_email_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your acknowledge email id' autoFocus />
              </FormGroup>
              {errors.purchase_email_id && errors.purchase_email_id.type === 'required' && <p style={{color:"red"}}>Purchase email id is required</p>}

              </Col>

            <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Location Code
                </Label>
                <Input type='text' id='code'
                name="location_code"
                  className={classnames({ 'is-invalid': errors['location_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your code' autoFocus />
              </FormGroup>
      {errors.location_code && errors.location_code.type === 'required' && <p style={{color:"red"}}>Location code is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Location Name
                </Label>
                <Input type='location_name' id='location_name'
                name="location_name"
                  className={classnames({ 'is-invalid': errors['location_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your location name' autoFocus />
              </FormGroup>
      {errors.location_name && errors.location_name.type === 'required' && <p style={{color:"red"}}>Location name is required</p>}

              </Col>
   
           <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Location Short Code
                </Label>
                <Input type='text' id='location_shortcode'
                name="location_shortcode"
                  className={classnames({ 'is-invalid': errors['location_shortcode'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your location short code' autoFocus />
              </FormGroup>
      {errors.location_shortcode && errors.location_shortcode.type === 'required' && <p style={{color:"red"}}>Location short code is required</p>}
              </Col>
              
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 PAN Number
                </Label>
                <Input type='pan_number' id='pan_number'
                name="pan_no"
                  className={classnames({ 'is-invalid': errors['pan_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your pan number' autoFocus />
              </FormGroup>
      {errors.pan_no && errors.pan_no.type === 'required' && <p style={{color:"red"}}>Pan number is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 GST Number
                </Label>
                <Input type='GST_number' id='GST_number'
                name="gst_no"
                  className={classnames({ 'is-invalid': errors['gst_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your GST number' autoFocus />
              </FormGroup>
      {errors.gst_no && errors.gst_no.type === 'required' && <p style={{color:"red"}}>GST number is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Incorp Number
                </Label>
                <Input
                 type='Incorp_number'
                  id='Incorp_number'
                name="incorp_no"
                  className={classnames({ 'is-invalid': errors['incorp_no'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Incorp number' autoFocus />
              </FormGroup>
      {errors.incorp_no && errors.incorp_no.type === 'required' && <p style={{color:"red"}}>Incorp number is required</p>}

              </Col>
              <Col md={3}>
              <FormGroup>
        <Label for="Text" >Plant Head</Label>
        <Input type="select"
         name="plant_head"
         value={planthead}
         onChange={(e) => setPlantHead(e.target.value)}
        className={classnames({ 'is-invalid': errors['plant_head'] })}
        innerRef={register({ required: true, validate: value => value !== '' })}
        id="Select">
         {userlist && userlist.data && userlist.data.data && userlist.data.data.map((user, index) => {
           return (
            <option value={user._id}>{user.name}</option>
           )
         })}
        </Input>
        {/* {errors.plant_head && <p style={{color:"red"}}>{errors.plant_head.message}</p>} */}
      </FormGroup>
      {errors.plant_head && errors.plant_head.type === 'required' && <p style={{color:"red"}}>Plant head no is required</p>}

      </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Email
                </Label>
                <Input type='email' id='email'
                name="email"
                  className={classnames({ 'is-invalid': errors['email'] })}
                  innerRef={register({ required: true, 
                    pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message:"Enter your 10 digit otp"},
                    validate: value => value !== '' })}
                 placeholder='Enter your Email' autoFocus />
              </FormGroup>
      {errors.email && errors.email.type === 'required' && <p style={{color:"red"}}>Email is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Telephone Number
                </Label>
                <Input type='phone' id='telephone_number'
                name="telephone_no"
                  className={classnames({ 'is-invalid': errors['telephone_no'] })}
                  innerRef={register({ required: true,
                    pattern:{value:/^((\\+91-?)|0)?[0-9]{10}$/,
                    message:"Enter your 10 digit otp"},
                    validate: value => value !== '' })}
                 placeholder='Enter your Telephone Number' autoFocus />
              </FormGroup>
              {errors.telephone_no && errors.telephone_no.type === 'required' && <p style={{color:"red"}}>Telephone number is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Website
                </Label>
                <Input type='website' id='website'
                name="website"
                  className={classnames({ 'is-invalid': errors['website'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your website' autoFocus />
              </FormGroup>
              {errors.website && errors.website.type === 'required' && <p style={{color:"red"}}>Url is required</p>}

              </Col>
              {/* <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Location Logo
                </Label>
                <Input type='location_logo' id='location_logo'
                name="location_logo"
                  className={classnames({ 'is-invalid': errors['location_logo'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your Location Logo' autoFocus />
              </FormGroup>
              </Col> */}
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Address
                </Label>
                <Input type='address' id='address'
                name="address"
                  className={classnames({ 'is-invalid': errors['address'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your address' autoFocus />
              </FormGroup>
              {errors.address && errors.address.type === 'required' && <p style={{color:"red"}}>Address number is required</p>}

              </Col>
              <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >Country</Label>
        <Input type="select" name="country"
                value={countryid}
                onChange={(e) => setCountryid(e.target.value)}
                 className={classnames({ 'is-invalid': errors['country'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="exampleSelect">
          {usercountrylist && usercountrylist.data && usercountrylist.data.data && usercountrylist.data.data.map((user, index) => {
            return (
              <option value={user._id}>{user.country_name}</option>
            )
          })}
     

        </Input>
      </FormGroup>
      </Col>
      <Col md={3}>
              <FormGroup>
        <Label for="exampleText" >State</Label>
        <Input type='select' id='state'
                name="state"
                  className={classnames({ 'is-invalid': errors['state'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your state' autoFocus >
                           {state && state.data && state.data.data && state.data.data.map((user, index) => {
            return (
              <option value={user._id}>{user.state_name}</option>
            )
          })}
          </Input>
      </FormGroup>
      </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 District
                </Label>
                <Input type='district' id='district'
                name="district"
                  className={classnames({ 'is-invalid': errors['district'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your district' autoFocus />
              </FormGroup>
              {errors.district && errors.district.type === 'required' && <p style={{color:"red"}}>District is required</p>}

              </Col>
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 City
                </Label>
                <Input type='city' id='city'
                name="city"
                  className={classnames({ 'is-invalid': errors['city'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your city' autoFocus />
              </FormGroup>
              {errors.city && errors.city.type === 'required' && <p style={{color:"red"}}>City is required</p>}

              </Col>
              {/* <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 State
                </Label>
                <Input type='state' id='state'
                name="state"
                  className={classnames({ 'is-invalid': errors['state'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your state' autoFocus />
              </FormGroup>
              </Col> */}
 
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 ZIP Code
                </Label>
                <Input type='number' id='zipcode'
                name="zip_code"
                  className={classnames({ 'is-invalid': errors['zip_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your zip code' autoFocus />
              </FormGroup>
              {errors.zip_code && errors.zip_code.type === 'required' && <p style={{color:"red"}}>ZIP code is required</p>}

              </Col>
              <Col md={9}>
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


const OrganizationMaster = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState([])
  const [user, setUser] = useState([])
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
if (searchstream.length > 3) {
  const newstring = new RegExp(searchstream)
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
        //  console.log(item.name, searchstream, item.text.match(newstring))
         return item.location_name.match(newstring) || item.pan_no.match(newstring) || item.gst_no.match(newstring) || item.email.match(newstring) || item.city.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_organization'
  useEffect(() => {
    axios.get(userdetailapi, {
      headers:{
        token:loginAuthID
      }})
    .then(r => {
      setUser(r)
      setUserDetail(r)
    }
      )
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
            Organization Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Organization Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>Organization List</h4>
              </Col>
              <Col md={2}>
                  <h6 style={{float:"right", marginTop:"10px"}}>Search</h6>
                  </Col>
              <Col md={3}>
            <FormGroup>
                <Input type='search' id='code'
                name="image"
                onChange = {(e) => searchChange(e)}
                //   className={classnames({ 'is-invalid': errors['image'] })}
                //   innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add Organization
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Organization
              </Button.Ripple>
              
            }
              </Col>
            </Row>
  
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
                <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell scope="row">{index + 1 }</TableCell>
          <TableCell>{detail.location_code}</TableCell>
          <TableCell>{detail.location_name}</TableCell>
          <TableCell>{detail.location_code}</TableCell>
          <TableCell>{detail.pan_no}</TableCell>
          <TableCell>{detail.gst_no}</TableCell>
          <TableCell>{detail.incorp_no}</TableCell>
          <TableCell>{detail.plant_head === null ?  "not found" : detail.plant_head.name}</TableCell>
          <TableCell>{detail.email}</TableCell>
          <TableCell>{detail.telephone_no}</TableCell>
          <TableCell>{detail.website}</TableCell>
          <TableCell>{detail.address}</TableCell>
          <TableCell>{detail.district}</TableCell>
          <TableCell>{detail.city}</TableCell>
          <TableCell>{detail.country_id === null ? 'not found' : detail.country_id.country_name}</TableCell>
          <TableCell>{detail.state_id === null ? 'not found' : detail.state_id.state_name}</TableCell>
          <TableCell>{detail.zip_code}</TableCell>
          <TableCell>{detail.purchase_email_id}</TableCell>
            <TableCell>
            <Button.Ripple className='btn-icon btn-sm rounded-circle' color='flat-success'  onClick={() => onEditClick(detail)} outline id={`positionTop_${index + 1}`}>
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

export default OrganizationMaster