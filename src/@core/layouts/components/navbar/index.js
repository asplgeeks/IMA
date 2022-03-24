// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import '@styles/base/pages/page-auth.scss'
// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = props => {
  // ** Props
  const [Titled, setTitled] = useState("")
  const { skin, setSkin, setMenuVisibility } = props
  const Title = localStorage.getItem('myTitle')
  useEffect(() => {

    setTitled(Title)
  }, [Title])

  return (
    <Fragment>
      <div className='bookmark-wrapper align-items-center' style={{display:"table", width: "100%", textAlign: "center"}}>
      <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
       {/* <h4  style={{color:"rgb(221 33 44)", fontFamily:"gotham", fontWeight:400, display: "table-cell", verticalAlign:"middle"}}>{Titled === "undefined" ? 'Dashboard' : Titled}</h4>  */}
       <h4  style={{color:"#191617", fontFamily:"gotham", fontWeight:400, display: "table-cell", verticalAlign:"middle"}}>DISCUSSION FORUM</h4> 

      </div>
      {/* <NavbarUser skin={skin} setSkin={setSkin} /> */}  
    </Fragment>
  )
}

export default ThemeNavbar
