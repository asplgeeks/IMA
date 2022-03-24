import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2} from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, UncontrolledTooltip, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addGuestMaster, updateGuestMaster } from '@store/actions/masteruser'
import Switch from '@material-ui/core/Switch'
import axios from 'axios'
// import '@styles/base/pages/page-auth.scss'
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
  { id: 'index', label: 'Sr. No.', minWidth: 90 },
  {
    id: 'name',
    label: 'name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'email',
    label: 'email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'address',
    label: 'address',
    minWidth: 290,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'mobile_no',
    label: 'mobile_no',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
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
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const dispatch = useDispatch()


    const onSubmit = data => {
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue) { 
          dispatch(updateGuestMaster(data, props))
        } else {
          dispatch(addGuestMaster(data, props))
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
                Name
                </Label>
                <Input
                 type='text'
                 id='name'
                name="name"
                  className={classnames({ 'is-invalid': errors['name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your status' autoFocus />
              </FormGroup>
      {errors.name && errors.name.type === 'required' && <p style={{color:"red"}}>Name is required</p>}
              </Col>

            <Col md={4}>
              <FormGroup>
        <Label for="email" >Email</Label>
        <Input type="email" name="email"
                 className={classnames({ 'is-invalid': errors['email'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="email"/>
      </FormGroup>
      {errors.email && errors.email.type === 'required' && <p style={{color:"red"}}>Email is required</p>}
      </Col>

      <Col md={4}>
              <FormGroup>
        <Label for="address" >Address</Label>
        <Input type="text" name="address"
                 className={classnames({ 'is-invalid': errors['address'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="address"/>
      </FormGroup>
      {errors.address && errors.address.type === 'required' && <p style={{color:"red"}}>Address is required</p>}
      </Col>

      <Col md={4}>
              <FormGroup>
        <Label for="mobile_no" >Mobile_no</Label>
        <Input type="number" name="mobile_no"  maxLength={10}
                 className={classnames({ 'is-invalid': errors['mobile_no'] })}
                 innerRef={register({ required: true, maxLength:10, validate: value => value !== '' })}
        id="mobile_no"/>
      </FormGroup>
      {errors.mobile_no && errors.mobile_no.type === 'required' && <p style={{color:"red"}}>Mobile_no is required</p>}
      </Col>

      <Col md={4}>
              <FormGroup>
        <Label for="status" >Status</Label>
        <Input type="select" name="status"
                 className={classnames({ 'is-invalid': errors['status'] })}
                 innerRef={register({ required: true, validate: value => value !== '' })}
        id="status">
        <option value={1}>True</option>
        <option value={0}>False</option>
        </Input>
      </FormGroup>
      {errors.status && errors.status.type === 'required' && <p style={{color:"red"}}>Status is required</p>}
      </Col>
      <Col md={4}>
              <span className="input-group-btn">
          <Button.Ripple  type="submit" className='ripple-button  btn-theam theam_m' size="sm" style={{float:"right"}}>
          { props.preloadValue ? 'Update' : 'Submit' }
              </Button.Ripple>
              </span>
              </Col>
              </Row>
              {/* { props.preloadValue ?    <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
               Update
              </Button.Ripple> :   <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
                Save
              </Button.Ripple>} */}
            
            </Form>

  </div>
)
}

const GuestMaster = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState()
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
if (searchstream.length > 0) {
  const newstring = new RegExp(searchstream)
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
         console.log(item)
         return item.name.match(searchstream) || item.email.toString().match(newstring) || item.address.toString().match(newstring) ||
         item.mobile_no.toString().match(newstring)
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_guest_users'
  useEffect(() => {
    axios.get(userdetailapi)
    .then(r => { 
      setUserDetail(r)
      setUser(r)
    })
  }, [userdetailapi, addform, updateuser])
console.log(userdetail)
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
      { addform === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Guest Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} onMasterSave={() => setAddButton(false)}/>
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Guest Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
            <MasterForm
             preloadValue={props && props.location && props.location.state} onAdd={() => { setUpdateuser(false) }}
             onMasterSave={() => setAddButton(false)}
             />
          </CardBody>
        </Card> : "" }
      
        <div style={{padding:10}}>
     
        </div>
        <Card className='mb-0'>
          <CardBody> 
          <Row>
              <Col md={3}>
              <h4 style={{margin:'10px'}} className='mb-1'>Guest List</h4>
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
          <i class="fa fa-plus"></i> Add Guest
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Guest
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
                      <TableCell >
                    {index + 1}
                      </TableCell>
                      <TableCell  >
                      {detail.name}
                      </TableCell>
                      <TableCell  >
                      {detail.email.toString()}
                      </TableCell>
                      <TableCell  >
                      {detail.address.toString()}
                      </TableCell>
                      <TableCell  >
                      {detail.mobile_no.toString()}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.status === true ? <Switch
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
                      <TableCell >
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

export default GuestMaster
