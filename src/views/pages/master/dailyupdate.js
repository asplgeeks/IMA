import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, UncontrolledTooltip, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addDailyUpdate, updateDailyUpdate } from '@store/actions/masteruser'
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
  { id: 'index', label: 'Sr. No.', minWidth: 80 },
  {
    id: 'name',
    label: 'Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Text',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Image',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'From Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'To Date',
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
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props.preloadValue && props.preloadValue.detail : ""})
    const [type, setType] = useState('')
    const [bucketimage, setImage] = useState()
    const dispatch = useDispatch()
    console.log(bucketimage && bucketimage.location)
    const onSelect = (e) => {
        setType(e.target.value)
    }

    const uploadImage = (e) => {
      console.log(e.target.files[0])
      uploadFile(e.target.files[0], config)
    .then(data => {
      setImage(data)
      setValue("image", data.location)
    })
    .catch(err => console.error(err))
    }

//set the values 
    useEffect(() => {
      // console.log(props && props.preloadValue && props.preloadValue.detail.photo)
      setValue("from_date", moment(props && props.preloadValue && props.preloadValue.detail.from_date).format("YYYY-MM-DD"))
      setValue("to_date", moment(props && props.preloadValue && props.preloadValue.detail.to_date).format("YYYY-MM-DD"))
      setValue("type", props && props.preloadValue && props.preloadValue.detail.type)
    }, [setValue])
///get img from s3 bucket
// useEffect(() => {
//   s3.listObjectsV2(params, (err, data) => {
//     if (err) throw console.log(err)
//     console.log(data.Contents)
//    })
// }, [])


// Storage.get('hello.png', {expires: 60})
// .then(result => console.log(result))
// .catch(err => console.log(err)) 

    // console.log(onSelect())
    const onSubmit = data => {
        console.log(data)
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue) { 
          dispatch(updateDailyUpdate(data, props))
        } else {
          dispatch(addDailyUpdate(data, props))
        }
      }

    console.log(props)
return (
  <div>
  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row>
     <Col md={3}>
       <FormGroup>
        <Label for="exampleText" >Type</Label>
        <Input type="select" 
        name="type"
         id="exampleparentBusiness"
         className={classnames({ 'is-invalid': errors['text'] })}
         innerRef={register({ required: true, validate: value => value !== '' })}
         onChange ={(e) => onSelect(e)}>
         <option>Text</option>
          <option>Text and images</option>
        </Input>
      </FormGroup>
      </Col>
          
          <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                Text
                </Label>
                <Input type='text' id='code'
                name="text"
                  className={classnames({ 'is-invalid': errors['text'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='please enter your text' autoFocus />
              </FormGroup>
              {errors.text && errors.text.type === 'required' && <p style={{color:"red"}}>Text is required</p>}

              </Col>              
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                From Date
                </Label>
                <Input type='date' id='code'
                name="from_date"
                min={moment().format("YYYY-MM-DD")}
                  className={classnames({ 'is-invalid': errors['from_date'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='please enter your code' autoFocus />
              </FormGroup>
              {errors.from_date && errors.from_date.type === 'required' && <p style={{color:"red"}}>From date is required</p>}
              
              </Col>

              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
               To Date
                </Label>
                <Input type='date' id='code'
                name="to_date"
                min={moment().format("YYYY-MM-DD")}
                  className={classnames({ 'is-invalid': errors['to_date'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='please enter your code' autoFocus />
              </FormGroup>
              {errors.to_date && errors.to_date.type === 'required' && <p style={{color:"red"}}>To date is required</p>}

              </Col>

              <Col md={3}>
              {type === "Text and images" ? <div>

                {bucketimage && bucketimage.location ? <Col md={1}>
                  
                  <Button close style={{backgroundColor:"red", borderRadius:"50%"}} onClick={() => setImage("")}/>
                <img src={bucketimage && bucketimage.location} width="80px" height="80px" alt="img"/> 
                </Col> : <div><FormGroup>
                                <Label className='form-label' for='login-email'>
                                Image
                                </Label>
                                <CustomInput type="file"
                 id="exampleCustomFileBrowser"
                 name="image"
                 onChange={(e) => uploadImage(e)}
                 className={classnames({ 'is-invalid': errors['image'] })}
                 innerRef={register("image", {required: true, validate: value => value !== '' })}
                />
                         </FormGroup>
              {errors.to_date && errors.to_date.type === 'required' && <p style={{color:"red"}}>Image is required</p>}

                         </div>
                }
      
      </div> : ""}
      </Col>
      <Col md={12}>
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


const DailyUpdateMaster = (props) => {
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
if (searchstream.length > 2) {
  const newstring = new RegExp(searchstream, 'gi')
       const searchitem = userdetail && userdetail.data && userdetail.data.data && userdetail.data.data.filter(item => {
         console.log(item.name, searchstream, item.text.match(newstring))
         return moment(item.date).format("MMM Do YY").match(newstring) || item.text.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/get_daily_update_list'
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
            Daily Update
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Daily Update
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
              <h4 style={{margin:'10px'}} className='mb-1'>Daily Update List</h4>
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
          <i class="fa fa-plus"></i> Add Daily Updates
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add Daily Updates
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
                <TableRow hover role="checkbox" tabIndex={-1} key={detail.code}>
                      <TableCell key={detail._v} >
                    {index + 1}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.type}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {detail.text}
                      </TableCell>
                      <TableCell key={detail._v} >
                   <img src={detail.image} width="50px" height="50px" alt="img"/> 
                      </TableCell>
                      <TableCell key={detail._v} >
                      {moment(detail.from_date).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell key={detail._v} >
                      {moment(detail.to_date).format("DD-MM-YYYY")}
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
      </div>
    </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default DailyUpdateMaster