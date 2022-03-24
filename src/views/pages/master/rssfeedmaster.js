import { useState, useContext, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Edit2 } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {Col, Row, Card, CardBody, CardTitle, CardText, Form, FormGroup, UncontrolledTooltip, Label, Input, CustomInput, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Switch from '@material-ui/core/Switch'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { addRssFeedMaster, updateRssFeedMaster } from '@store/actions/masteruser'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { uploadFile } from 'react-s3'
const loginAuthID = sessionStorage.getItem('id_token')
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
    label: 'Feed Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Feed Logo',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Feed Url',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Priority',
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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
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
)

const MasterForm = (props) => {
    const { register, errors, setValue, handleSubmit } = useForm({defaultValues:props ? props && props.preloadValue && props.preloadValue.detail : ""})
    const dispatch = useDispatch()
    const classes = useStyles()
    const [bucketimage, setImage] = useState()
    const [updatedImage, setUpdatedImage] = useState(props && props.preloadValue && props.preloadValue.detail)
console.log(bucketimage)
useEffect(() => {
  setValue("status", props && props.preloadValue && props.preloadValue.detail.status === false ? 0 : 1)
})
    const uploadImage = (e) => {
      console.log(e.target.files[0])
      uploadFile(e.target.files[0], config)
    .then(data => {
      setImage(data)
      setValue("feed_logo", data.location)
    })
    .catch(err => console.error(err))
    }

    const onSubmit = (data) => {
        console.log(data)
        // alert("SUBMITED SUCCESSFULLY")
        if (props && props.preloadValue) { 
          dispatch(updateRssFeedMaster(data, props))
        } else {
          dispatch(addRssFeedMaster(data, props))
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
                RSS Feed Name
                </Label>
                <Input type='text' id='codee'
                name="feed_name"
                  className={classnames({ 'is-invalid': errors['feed_name'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter RSS Feed Name' autoFocus />
              </FormGroup>
              {errors.feed_name && errors.feed_name.type === 'required' && <p style={{color:"red"}}>Feed name is required</p>}
              </Col>
        
            {(bucketimage && bucketimage.location) || (updatedImage) ? <Col md={1}>       
                  <Button close className={classes.closebutton} onClick={() => {
                    setImage("")
                    setUpdatedImage("")
                }}/>
                <img src={(bucketimage && bucketimage.location) || (props && props.preloadValue && props.preloadValue.detail && props.preloadValue.detail.feed_logo)} width="80px" height="80px" alt="img"/> 
                </Col> :     <Col md={3}><FormGroup>
                <Label className='form-label' for='login-email'>
                Logo
                </Label>
                <CustomInput type="file"
                 id="exampleCustomFileBrowser"
                 name="feed_logo"
                 onChange={(e) => uploadImage(e)}
                 className={classnames({ 'is-invalid': errors['feed_logo'] })}
                 innerRef={register("feed_logo", {required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              {errors.feed_logo && errors.feed_logo.type === 'required' && <p style={{color:"red"}}>Logo is required</p>}
              </Col> 
}
           
              <Col md={3}>
            <FormGroup>
                <Label className='form-label' for='login-email'>
                URL
                </Label>
                <Input type='text' id='code'
                name="feed_url"
                  className={classnames({ 'is-invalid': errors['feed_url'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                 placeholder='Enter URL' autoFocus />
              </FormGroup>
              {errors.feed_url && errors.feed_url.type === 'required' && <p style={{color:"red"}}>Feed url is required</p>}
              </Col>
              <Col md={3}>
       <FormGroup>
        <Label for="exampleText" >Priority</Label>
        <Input type="number"
        min="0" 
        step="1"
         name="priority"
         className={classnames({ 'is-invalid': errors['priority'] })}
         innerRef={register({ required: true, validate: value => value !== '' })}
          id="exampleparentBusiness" />
      </FormGroup>
      </Col>
      <Col md={3}>
       <FormGroup>
        <Label for="exampleText" >Status</Label>
        <Input type="select"
         name="status"
         className={classnames({ 'is-invalid': errors['status'] })}
         innerRef={register({ required: true, validate: value => value !== '' })}
          id="exampleparentBusiness" >
         <option value={1}>Active</option>
          <option value={0}>Deactive</option>
        </Input>
      </FormGroup>
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


const RssFeedMaster = (props) => {
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
         console.log(item.name, searchstream, item.feed_name.match(newstring))
         return item.feed_name.match(newstring) 
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
  const userdetailapi = 'http://172.105.49.15:3030/api/master/get_rss_feed_list'
  useEffect(() => {
    axios.get(userdetailapi)
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
            Rss Feed Master
            </CardTitle>
            {/* <CardText className='mb-2'>Please Register for master</CardText> */}
           <MasterForm onAdd={() => { setAddForm(false) }} />
          </CardBody>
        </Card> : " "}
        {updateuser === true ?   <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
            Rss Feed Master
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
              <h4 style={{margin:'10px'}} className='mb-1'>  Rss Feed List</h4>
              </Col>
              <Col md={2}>
                  <h6 style={{float:"right", marginTop:"10px"}}>Search</h6>
                  </Col>
              <Col md={3}>
            <FormGroup>
                <Input 
                type='search'
                size="small"
                onChange ={(e) => {
                  searchChange(e)
                }}
                id='code'
                name="image"
                 placeholder='search...' autoFocus />
              </FormGroup>
              </Col>
              <Col md={4}>
              {addbutton === false ?   <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onAddClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-plus"></i> Add  Rss Feed
              </Button.Ripple> : <Button.Ripple className='ripple-button' type="submit" size="sm" onClick={onCancleClick} style={{margin:'10px', float:"right"}}>
          <i class="fa fa-minus"></i> Add  Rss Feed
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
                      <TableCell>
                    {index + 1}
                      </TableCell>
                      <TableCell>
                      {detail.feed_name}
                      </TableCell>
                      <TableCell>
                     <img src={detail.feed_logo} width="50px" height="50px" alt="img"/> 
                      </TableCell>
                      <TableCell>
                      {detail.feed_url}
                      </TableCell>
                      <TableCell>
                      {detail.priority}
                      </TableCell>
                      <TableCell>
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
        rowsPerPageOptions={[10, 20, 40]}
        colSpan={3}
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

export default RssFeedMaster