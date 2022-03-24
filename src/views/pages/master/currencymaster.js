
import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, UncontrolledTooltip, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addCurrencyMaster, updateCurrencyMaster } from '@store/actions/masteruser'
import axios from 'axios'
// import '@styles/base/pages/page-auth.scss'
import Switch from '@material-ui/core/Switch'
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
    label: 'Currency Code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Currency Description',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  { id: 'code', label: 'ACTION', minWidth: 100 }
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
    const { register, errors, reset, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const onSubmit = (data, e) => {
      e.preventDefault()
        if (props && props.preloadValue) { 
          dispatch(updateCurrencyMaster(data, props))
        } else {
          dispatch(addCurrencyMaster(data, props))
        }
      }

    console.log(props)
return (
  <div>
<Form className='auth-login-form mt-2' onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
            <Row>
            <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                 Currency Code
                </Label>
                <Input
                 type='text'
                 id='code'
                name="currency_code"
                  className={classnames({ 'is-invalid': errors['currency_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter your currency code' autoFocus />
              </FormGroup>
              {errors.currency_code && errors.currency_code.type === 'required' && <p style={{color:"red"}}>Currency code is required</p>}
              </Col>
              <Col md={4}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Currency discription
                </Label>
                <Input
                 type='text'
                 id='currency_description'
                 name='currency_description'
                  className={classnames({ 'is-invalid': errors['currency_description'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter currency description'
                 autoFocus />
              </FormGroup>
              {errors.currency_description && errors.currency_description.type === 'required' && <p style={{color:"red"}}>Currency description is required</p>}
              </Col>
              <Col md={4}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                 Status
                </Label>
                <Input
                 type='select'
                 id='currency_description'
                 name='status'
                  className={classnames({ 'is-invalid': errors['status'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 autoFocus >
                     <option value={1}>true</option>
                     <option value={0}>false</option>
                 </Input>
              </FormGroup>
              </Col>
              </Row>
              {/* <FormGroup row>
                  <Col md={6}>
        <Label for="exampleText" sm={4}>Status</Label>
       
          <Input type="textarea" placeholder='please enter a message' id="exampleText"  autoFocus/>
          </Col>
      </FormGroup> */}

              {/* <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup> */}
      { props.preloadValue ?    <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
               Update
              </Button.Ripple> :   <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
                Submit
              </Button.Ripple>}
            
            </Form>

  </div>
)
}

const CurrencyMaster = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState([])
  const [user, setUser] = useState([])
    const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searching, setSearchStream] = useState('')
  console.log(user)
  
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
  const newstring = new RegExp(searchstream, 'gi')
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
         return item.currency_description.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_Currency_Master'
  useEffect(() => {
    axios.get(userdetailapi,  {
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
            Currency Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Currency Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>Currency List</h4>
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
          <i class="fa fa-plus"></i> Add Currency
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Currency
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
                <TableRow hover role="checkbox" tabIndex={-1} key={detail.code}>
                      <TableCell key={detail._v} >
                    {index + 1}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.currency_code}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.currency_description}
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
        rowsPerPageOptions={[10, 2, 3]}
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

export default CurrencyMaster