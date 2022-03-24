
import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, UncontrolledTooltip, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addItemMaster, updateItemMaster } from '@store/actions/masteruser'
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
  { id: 'index', label: 'Sr.No.', minWidth: 120 },
  {
    id: 'name',
    label: 'Material code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material description',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material category',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material sub category',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Tax category',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Opening quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Min stock level',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Max stock level',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Hsn code',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Primary uom',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Mangaged type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material rate',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'name',
    label: 'Material rate tax',
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
    const { register, errors, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const [email, setEmail] = useState('')
    const [materialcategory, setMaterialCategory] = useState('')
    const [materialsubcategory, setMaterialsubCategory] = useState('')
    const [primaryuom, setPrimaryUOM] = useState('')
    const [categorybyid, setCategorybyid] = useState('')
    const [categoryState, setCategoryState] = useState('')
    const dispatch = useDispatch()

console.log(categorybyid)

    const  materialcategoryid = 'http://172.105.49.15:3030/api/master/list_material_category'
    const materialsubcategorylist = 'http://172.105.49.15:3030/api/master/list_materialsub_material_id'
    useEffect(() => {
    axios.get(materialcategoryid)
    .then(r => {
      console.log(r)
      setMaterialCategory(r)
    })
    }, [materialcategoryid])

    useEffect(() => {
      if (categorybyid) {
      axios.post(materialsubcategorylist, {
        Material_Category_id:categorybyid
      })
      .then(r => setCategoryState(r))
    }
    }, [categorybyid])
    

    const  primUOM = 'http://172.105.49.15:3030/api/master/list_Unit_of_Measurement'
    useEffect(() => {
    axios.get(primUOM, {
    headers:{
      token:loginAuthID
    }
    })
    .then(r => {
      console.log(r)
      setPrimaryUOM(r)
    })
    }, [primUOM])

    const  materialsubcategoryid = 'http://172.105.49.15:3030//api/master/list_material_sub_category'
    useEffect(() => {
    axios.get(materialsubcategoryid)
    .then(r => {
      console.log(r)
      setMaterialsubCategory(r)
    })
    }, [materialsubcategoryid])

    const onSubmit = data => {
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue && props.preloadValue.detail._id) { 
          dispatch(updateItemMaster(data, props))
        } else {
          dispatch(addItemMaster(data, props))
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
                Material Code
                </Label>
                <Input
                 type='number'
                 id='type'
                 name='material_code'
                  className={classnames({ 'is-invalid': errors['material_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your material code'
                 autoFocus />
              </FormGroup>
              {errors.material_code && errors.material_code.type === 'required' && <p style={{color:"red"}}>Material_codeis required</p>}

              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Material Discription
                </Label>
                <Input
                 type='text'
                 id='discription'
                 name='material_description'
                  className={classnames({ 'is-invalid': errors['material_description'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
              </FormGroup>
              {errors.material_description && errors.material_description.type === 'required' && <p style={{color:"red"}}>Material description is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                Material Category
                </Label>
                <Input
                 type='select'
                 id='category'
                 name='material_category'
                 value={categorybyid}
                 onChange={(e) => setCategorybyid(e.target.value)}
                  className={classnames({ 'is-invalid': errors['material_category'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter your material category'
                 autoFocus >
            {materialcategory && materialcategory.data && materialcategory.data.data && materialcategory.data.data.map((materialinfo, index) => {
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
                material sub category
                </Label>
                <Input
                 type='select'
                 id='country_name'
                 name='material_sub_category'
                  className={classnames({ 'is-invalid': errors['material_sub_category'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your material sub category'
                 autoFocus>
                {categoryState && categoryState.data && categoryState.data.data && categoryState.data.data.map((materialinfo, index) => {
                   console.log(materialinfo)
                   return (
                    <option value ={materialinfo._id}>{materialinfo.Material_sub_category_name}</option>
                    )
                  })}
                  </Input>
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                tax category
                </Label>
                <Input
                 type='text'
                 id='tex'
                 name='tax_category'
                  className={classnames({ 'is-invalid': errors['tax_category'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your tax category'
                 autoFocus />
              </FormGroup>
              {errors.tax_category && errors.tax_category.type === 'required' && <p style={{color:"red"}}>Tax category is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                opening quantity
                </Label>
                <Input
                 type='number'
                 id='country_name'
                 name='opening_quantity'
                  className={classnames({ 'is-invalid': errors['opening_quantity'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your opening quantity'
                 autoFocus />
              </FormGroup>
              {errors.opening_quantity && errors.opening_quantity.type === 'required' && <p style={{color:"red"}}>Opening quantity is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                min stock level
                </Label>
                <Input
                 type='text'
                 id='country_name'
                 name='min_stock_level'
                  className={classnames({ 'is-invalid': errors['min_stock_level'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
              </FormGroup>
              {errors.min_stock_level && errors.min_stock_level.type === 'required' && <p style={{color:"red"}}>Min stock level is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                max stock level
                </Label>
                <Input
                 type='text'
                 id='max'
                 name='max_stock_level'
                  className={classnames({ 'is-invalid': errors['max_stock_level'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
              </FormGroup>
              {errors.max_stock_level && errors.max_stock_level.type === 'required' && <p style={{color:"red"}}>Max stock level is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                hsn code
                </Label>
                <Input
                 type='number'
                 id='hsn_code'
                 name='hsn_code'
                  className={classnames({ 'is-invalid': errors['hsn_code'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
              </FormGroup>
              {errors.hsn_code && errors.hsn_code.type === 'required' && <p style={{color:"red"}}>Hsn code is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                primary uom
                </Label>
                <Input
                 type='select'
                 id='primary_uom'
                 name='primary_uom'
                  className={classnames({ 'is-invalid': errors['primary_uom'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your primary uom'
                 autoFocus >
                          {primaryuom && primaryuom.data && primaryuom.data.data && primaryuom.data.data.map((uom, index) => {
                   return (
                    <option value ={uom._id}>{uom.uom_description}</option>
                    )
                  })}
                  </Input>
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                mangaged type
                </Label>
                <Input
                 type='text'
                 id='mangaged_type'
                 name='mangaged_type'
                  className={classnames({ 'is-invalid': errors['mangaged_type'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your mangaged type'
                 autoFocus />
              </FormGroup>
              {errors.mangaged_type && errors.mangaged_type.type === 'required' && <p style={{color:"red"}}>Mangaged type is required</p>}
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                material rate
                </Label>
                <Input
                 type='number'
                 id='material_rate'
                 name='material_rate'
                  className={classnames({ 'is-invalid': errors['material_rate'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your Designation'
                 autoFocus />
              {errors.material_rate && errors.material_rate.type === 'required' && <p style={{color:"red"}}>Material rate is required</p>}
              </FormGroup>
              </Col>
              <Col md={3}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                material rate tax
                </Label>
                <Input
                 type='number'
                 id='material_rate_tax'
                 name='material_rate_tax'
                  className={classnames({ 'is-invalid': errors['material_rate_tax'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                placeholder='Enter Your material rate tax'
                 autoFocus />
              </FormGroup>
              {errors.material_rate_tax && errors.material_rate_tax.type === 'required' && <p style={{color:"red"}}>Material rate tax is required</p>}
              </Col>
              <Col md={9}>
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

const ItemMaster = (props) => {
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

         return item.material_description.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/list_material_master'
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
            Item Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Item Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>Items List</h4>
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
          <i class="fa fa-plus"></i> Add Items
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Items
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
                      {detail.material_code}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_description}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_category === null ? 'Not Found' : detail.material_category.material_category_name}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_sub_category === null ? 'Not Found' : detail.material_sub_category.Material_sub_category_name}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.tax_category}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.opening_quantity}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.min_stock_level}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.max_stock_level}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.hsn_code}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.primary_uom === null ? 'Not Found' : detail.primary_uom.uom_description}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.mangaged_type}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_rate}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.material_rate_tax}
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

export default ItemMaster