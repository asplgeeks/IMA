
import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, UncontrolledTooltip, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addDesignatonMaster, updateDesignatonMaster } from '@store/actions/masteruser'
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
import app from './../../../base'
const loginAuthID = sessionStorage.getItem('id_token')
const columns = [
  { id: 'index', label: 'Sr. No.', minWidth: 100 },
  {
    id: 'name',
    label: 'Designation Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  { id: 'code', label: 'Action', minWidth: 100 }
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
    const { register, errors, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const onSubmit = data => {
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue && props.preloadValue.detail._id) { 
          dispatch(updateDesignatonMaster(data, props))
        } else {
          dispatch(addDesignatonMaster(data, props))
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
                Designation
                </Label>
                <Input
                 type='country_name'
                 id='country_name'
                 name='designation_name'
                  className={classnames({ 'is-invalid': errors['designation_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
                {errors.designation_name && errors.designation_name.type === 'required' && <p style={{color:"red"}}>Designation name is required</p>}

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
              {/* <FormGroup row>
                  <Col md={6}>
        <Label for="exampleText" sm={4}>Status</Label>
       
          <Input type="textarea" placeholder='please enter a message' id="exampleText"  autoFocus/>
          </Col>
      </FormGroup> */}

              {/* <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup> */}
      {/* { props.preloadValue ?    <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
               Update
              </Button.Ripple> :   <Button.Ripple color='primary' type="submit" className='ripple-button' size="sm" style={{float:"right"}} >
                Save
              </Button.Ripple>} */}
            
            </Form>

  </div>
)
}

const DesignationMaster = (props) => {
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
  const newstring = new RegExp(searchstream, 'gi')
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
         console.log(item.name, searchstream, item.designation_name.match(newstring))
         return item.designation_name.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/get_designation_list'
  useEffect(() => {
    // app.auth().currentUser.getIdToken(false).then(function (Token) {
      axios.get(userdetailapi, {
        headers:{
          token:loginAuthID
        }})
      .then(r => {
        setUser(r)
        setUserDetail(r)
      })
    // })

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
            Designation Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Designation Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>Designation List</h4>
              </Col>
              <Col md={2}>
                  <h6 style={{float:"right", marginTop:"10px"}}>Search</h6>
                  </Col>
              <Col md={3}>
            <FormGroup>
                <Input
                 type='search'
                 onChange = {(e) => searchChange(e)}
                 id='code'
                name="image"
                //   className={classnames({ 'is-invalid': errors['image'] })}
                //   innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add Designation
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Designation
              </Button.Ripple>
              
            }
              </Col>
            </Row>
  
    <TableContainer >
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
                      {detail.designation_name}
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

export default DesignationMaster