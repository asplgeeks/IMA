
import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, UncontrolledTooltip, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import Switch from '@material-ui/core/Switch'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addMaterialSubCategory, updateMaterialSubCategory } from '@store/actions/masteruser'
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
  { id: 'index', label: 'Sr. No.', minWidth: 90 },
  {
    id: 'name',
    label: 'Material Catergory',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material Group Code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  // {
  //   id: 'name',
  //   label: 'Status',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US')
  // },
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
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [materialcategory, setMaterialCategory] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
      setValue("status", props && props.preloadValue && props.preloadValue.detail.status === false ? 0 : 1)
    }, [setValue])

    const  materialcategoryid = 'http://172.105.49.15:3030/api/master/list_material_category'
    useEffect(() => {
    axios.get(materialcategoryid, {
    headers:{
      token:loginAuthID
    }
    })
    .then(r => {
      console.log(r)
      setMaterialCategory(r)
    })
    }, [materialcategoryid])

    const onSubmit = data => {
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue && props.preloadValue.detail._id) { 
          dispatch(updateMaterialSubCategory(data, props))
        } else {
          dispatch(addMaterialSubCategory(data, props))
        }
      }

    console.log(props)
return (
  <div>
<Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row>
            <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Material Catergory
                </Label>
                <Input
                 type='select'
                 id='country_name'
                 name='Material_Category_id'
                  className={classnames({ 'is-invalid': errors['Material_Category_id'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter material catergory'
                 autoFocus >
                        {materialcategory && materialcategory.data && materialcategory.data.data && materialcategory.data.data.map((materialinfo, index) => {
                   console.log(materialinfo)
                   return (
                    <option value ={materialinfo._id}>{materialinfo.material_category_name}</option>
                    )
                  })}
                  </Input>
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Material sub Catergory Name
                </Label>
                <Input
                 type='text'
                 id='category'
                 name='Material_sub_category_name'
                  className={classnames({ 'is-invalid': errors['Material_sub_category_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter material sub catergory name'
                 autoFocus />
              </FormGroup>
              {errors.Material_sub_category_name && errors.Material_sub_category_name.type === 'required' && <p style={{color:"red"}}>Material sub Catergory Name is required</p>}

              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Material Group Code
                </Label>
                <Input
                 type='country_name'
                 id='country_name'
                 name='Material_sub_group_code'
                  className={classnames({ 'is-invalid': errors['Material_sub_group_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter material group code'
                 autoFocus />
              </FormGroup>
              {errors.Material_sub_group_code && errors.Material_sub_group_code.type === 'required' && <p style={{color:"red"}}>Material Group Code is required</p>}
              </Col>
            {/* <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Status
                </Label>
                <Input
                 type='select'
                 id='status'
                 name='status'
                  className={classnames({ 'is-invalid': errors['status'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 autoFocus >
                 <option value={1} >true</option>
                 <option value={0} >false</option>
                 </Input>
              </FormGroup>
              </Col> */}
              <Col md={12}>
              <span className="input-group-btn">
          <Button.Ripple  type="submit" className='ripple-button  btn-theam theam_m' size="sm" style={{float:"right"}}>
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

const MaterialSubCatergory = (props) => {
  const [addform, setAddForm] = useState(false)
  const [updateuser, setUpdateuser] = useState(false)
  const [addbutton, setAddButton] = useState(false)
  const [userdetail, setUserDetail] = useState([])
  const classes = useStyles()
  const [user, setUser] = useState([])
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
         return item.material_category_id.material_category_name.match(newstring) || item.material_sub_category_name.match(newstring)
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_material_sub_category'
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
            Material Sub Category Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Material Sub Category Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>Material Sub Catergory List</h4>
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
          <i class="fa fa-plus"></i> Add Material Sub Catergory
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Material Sub Catergory
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
                      {detail.material_category_id.material_category_name}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_sub_category_name}
                      </TableCell>
                      {/* <TableCell key={detail._v} >
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
                      </TableCell> */}
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

export default MaterialSubCatergory