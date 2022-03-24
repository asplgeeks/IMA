import { Nav, NavItem, NavLink } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import * as Icon from 'react-feather'

const NavSquareBorder = () => {
  return (
    <Nav vertical className='wrap-border side-navbar square-border d-none d-lg-block border_bottom_none border_top_none'>
      <NavItem className="bottom_border " active>
        <NavLink  tag={Link} to='/apps/email/weiu'  className="text-center">
        <Icon.Users size={30} className='ficon' />
        <h5> Discussion Forum </h5>
        </NavLink>
      </NavItem>
      <NavItem  className="bottom_border">
        <NavLink href='#' className="text-center">
        <Icon.Clock  size={30} className='ficon' />
        <h5>Forum Sessions </h5>
        </NavLink>
      </NavItem>
      <NavItem  className="bottom_border">
        <NavLink href='#' className="text-center">
        <Icon.Aperture size={30}  className='ficon' />
        <h5>Insights</h5>
        </NavLink>
      </NavItem>

      <NavItem  className="bottom_border">
        <NavLink href='#' className="text-center">
        <Icon.UserCheck size={30}  className='ficon' />
        <h5>Member Directory</h5>
        </NavLink>
      </NavItem>

      <NavItem  className="bottom_border">
        <NavLink href='#' className="text-center">
        <Icon.User size={30}  className='ficon' />
        <h5>My Profile</h5>
        </NavLink>
      </NavItem>

      <NavItem  className="bottom_border">
        <NavLink href='#' className="text-center">
        <Icon.Settings size={30}  className='ficon' />
        <h5>Settings</h5>
        </NavLink>
      </NavItem>

      {/* <NavItem>
        <NavLink href='#'>Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href='#'>
          Disabled
        </NavLink>
      </NavItem> */}
    </Nav>
  )
}
export default NavSquareBorder