import {React, useState, Fragment, useEffect} from 'react'

import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash, Search} from 'react-feather'
import * as Icon from 'react-feather'
import FileSent from './../../Images/Folder-Clock.svg'
import { Button, ListGroup, ListGroupItem, Badge, Media, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText} from 'reactstrap'

import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles({
    root: {
      borderRadius: "50%"
    }
  })

const renderModal = (props) => {
    const classes = useStyles()
    return (
    <div className={classes.root} key={3}>
      <Modal
        isOpen={props.modal}
        size='sm'
        toggle={() => props.toggleModal(3)}
        className='modal-dialog-centered'
        modalClassName="modal-success"
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true}
        key={3}
      >
        {/* <ModalHeader toggle={() => toggleModal(3)}></ModalHeader> */}
        <ModalBody className="thread-model">
          <h5><img src={FileSent} alt='img'/></h5>
          <h5>Request Sent</h5>
          <Typography variant='caption'>Your request has been successfully sent. If the admin feels appropriate, a new thread will be added.</Typography>
        </ModalBody>
        <ModalFooter className="thread-model-footer">
          <Button color="modal-success" onClick={() => props.toggleModal(3)}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    )
}

export default renderModal