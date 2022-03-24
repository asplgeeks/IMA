
import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit, Edit2} from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, UncontrolledTooltip, span } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch, connect } from 'react-redux'
import { addCountryMaster, updateCountryMaster } from '@store/actions/masteruser'
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
import 'bootstrap/dist/css/bootstrap.min.css'
import app from './../../../base'
const loginAuthID = sessionStorage.getItem('id_token')

const columns = [
  { id: 'index', label: 'Sr. No.'},
  {
    id: 'size',
    label: 'Country Code',
    align: 'right'
  },
  {
    id: 'name',
    label: 'Country Name',
    align: 'right'
  },
  
  { id: 'code', label: 'Action'}
]


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: "1000px"
  }
})


const MasterForm = (props) => {
    const { register, errors, reset, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const onSubmit = (data, e) => {
      e.preventDefault()
        if (props && props.preloadValue) { 
          dispatch(updateCountryMaster(data, props))
        } else {
          dispatch(addCountryMaster(data, props))
        }
      }

    console.log(props)
return (
  <div>
<Form className='auth-login-form mt-2' onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
            <Row>
            <Col md={4}>
            <FormGroup>
                <Label className='form-label' for='login-email'> Country Code </Label>
                <Input
                 type='number'
                 id='code'
                name="country_code"
                  className={classnames({ 'is-invalid': errors['country_code'] })}
                  innerRef={register({ required: true, message:"Country code is required"})}
                 placeholder='Enter Country code' autoFocus />
              {errors.country_code && errors.country_code.type === 'required' && <p style={{color:"red"}}>Country code is required</p>}

              </FormGroup>
              </Col>
              <Col md={4}>
              <FormGroup>
                <Label className='form-label' for='country_name'>
                  Country Name
                </Label>
                <Input type='country_name'
                 id='country_name'
                 name='country_name'
                  className={classnames({ 'is-invalid': errors['country_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter country Name'
                 autoFocus />
                               {errors.country_code && errors.country_code.type === 'required' && <p style={{color:"red"}}>Country name is required</p>}

              </FormGroup>
              </Col>
              <Col md={4}>
              <span className="input-group-btn">
          <Button.Ripple  type="submit" className='ripple-button  btn-theam theam_m' size="sm" style={{float:"left"}}>
          { props.preloadValue ? 'Update' : 'Submit' }
              </Button.Ripple>
              </span>
              </Col>
              </Row>
            </Form>

  </div>
)
}

const CountryMaster = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState([])
  const [locationhistory, setLocationhistory] = useState(props.location.state)
  const [user, setUser] = useState([])
    const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searching, setSearchStream] = useState('')
  const [tooltipOpen, setTooltipOpen] = useState(false)

  // const [loginAuthID, setIdToken] = useState('')
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
         console.log(item.name, searchstream, item.country_name.match(newstring))
         return item.country_name.match(newstring) || item.country_code.match(newstring)  
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
  useEffect(() => {
 
  }, [])


  const userdetailapi = 'http://172.105.49.15:3030/api/master/get_country_list'
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
           Add Country
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} onMasterSave={() => setAddButton(false)}/>
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Update Country 
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
              <h4 style={{margin:'10px'}} className='mb-1'>Country List</h4>
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
                 placeholder='search ....' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple  className='ripple-button btn-theam' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add Country
              </Button.Ripple> : <Button.Ripple  className='ripple-button btn-theam' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Country
              </Button.Ripple>
              
            }
              </Col>
            </Row>
        
    
        <TableContainer>
        <Table stickyHeader size="small" hover  responsive>
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
                      <TableCell>
                      {detail.country_code}
                      </TableCell>
                      <TableCell>
                      {detail.country_name}
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
        component="div"
        // rowsPerPageOptions={[10, 20, 30]}
        count={userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.length}
        page={page}
        onPageChange={handleChangePage}

        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </CardBody>
    </Card>
      </div>
    </div>
  )
}

// const mapStateToProps = (state, ownprops) => {
// return {
//   loginAuthID : state.auth.Token.i.Token
// }
// }

export default CountryMaster
