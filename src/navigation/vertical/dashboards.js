import { Home, Send, User, Users, UserCheck, Globe, DollarSign, UserPlus, Tool, ShoppingBag, Eye, Truck, PieChart, Twitch, Clock, Shuffle, Heart, PenTool, Zap, Layers, Layout, Framer } from 'react-feather'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import BusinessIcon from '@material-ui/icons/Business'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import SpeedIcon from '@material-ui/icons/Speed'
import PollIcon from '@material-ui/icons/Poll'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import FunctionsIcon from '@material-ui/icons/Functions'
import BuildIcon from '@material-ui/icons/Build'
import CategoryIcon from '@material-ui/icons/Category'
import MoneyIcon from '@material-ui/icons/Money'
import WorkIcon from '@material-ui/icons/Work'
import PersonIcon from '@material-ui/icons/Person'

export default [
  {
    id: 'Dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    navLink:'/dashboard'
  }
  // {
  //       id: 'Master',
  //       title: 'Master',
  //       icon: <PersonIcon size={18} />,
  //       navLink: '/dashboard/master',
  //       children:[
  //         {
  //           id: 'User Master',
  //           title: 'User',
  //           icon: <User size={18} />,
  //           navLink: '/master/user'
  //         },
  //         {
  //           id: 'Country Master',
  //           title: 'Country',
  //           icon: <Globe size={18} />,
  //           navLink: '/master/country-master'
  //         },
  //         {
  //           id: 'State Master',
  //           title: 'State',
  //           icon: <PieChart size={18} />,
  //           navLink: '/master/state-master'
  //         },
  //         {
  //           id: 'Designation Master',
  //           title: 'Designation',
  //           icon: <PollIcon size={18} />,
  //           navLink: '/master/designation-master'
  //         },
  //         {
  //           id: 'Organization Master',
  //           title: 'Organization',
  //           icon: <Eye size={18} />,
  //           navLink: '/master/organization-master'
  //         },
  //         {
  //           id: 'Department Master',
  //           title: 'Department',
  //           icon: <SupervisedUserCircleIcon size={18} />,
  //           navLink: '/master/department-master'
  //         },
  //         {
  //           id: 'Daily Update',
  //           title: 'Daily Update',
  //           icon: <UserCheck size={12} />,
  //           navLink: '/master/daily-update-master'
  //         },
  //         {
  //           id: 'Rss Feed Master',
  //           title: 'Rss Feed',
  //           icon: <Users size={12} />,
  //           navLink: '/master/rss-feed-master'
  //         },
  //         {
  //           id: 'Finance Master',
  //           title: 'Finance',
  //           icon: <MonetizationOnIcon size={12} />,
  //           navLink: '/master/finance-master'
  //         },
  //         {
  //           id: 'Cost Center Master',
  //           title: 'Cost Center',
  //           icon: <AccountBalanceIcon size={18} />,
  //           navLink: '/master/cost-center-master'
  //         },
  //         {
  //           id: 'Function Master',
  //           title: 'Function',
  //           icon: <FunctionsIcon size={18} />,
  //           navLink: '/master/function-master'
  //         },
  //         {
  //           id: 'Customer Group Master',
  //           title: 'Customer Group',
  //           icon: <Users size={12} />,
  //           navLink: '/master/custom-group-master'
  //         },
  //         {
  //           id: 'Customer Master',
  //           title: 'Customer',
  //           icon: <Heart size={12} />,
  //           navLink: '/master/custom-master'
  //         },
  //         {
  //           id: 'Material Category Master',
  //           title: 'Material Category',
  //           icon: <BuildIcon size={12} />,
  //           navLink: '/master/material-category-master'
  //         },
  //         {
  //           id: 'Material Sub Category Master',
  //           title: 'Material Sub Category',
  //           icon: <Framer size={12} />,
  //           navLink: '/master/material-sub-category-master'
  //         },
  //         {
  //           id: 'Item Master',
  //           title: 'Item Master',
  //           icon: <CategoryIcon size={12} />,
  //           navLink: '/master/item-master'
  //         },
  //         {
  //           id: 'Currency Master',
  //           title: 'Currency',
  //           icon: <Users size={12} />,
  //           navLink: '/master/currency-master'
  //         },
  //         {
  //           id: 'Payment Master',
  //           title: 'Payment',
  //           icon: <MoneyIcon size={12} />,
  //           navLink: '/master/payment-master'
  //         },
  //         {
  //           id: 'Budget Master',
  //           title: 'Budget',
  //           icon: <WorkIcon size={12} />,
  //           navLink: '/master/budget-master'
  //         },
  //         {
  //           id: 'Unit Measurement Master',
  //           title: 'Unit Measurement',
  //           icon: <SpeedIcon size={12} />,
  //           navLink: '/master/unit-measurment'
  //         },
  //         {
  //           id: 'Meeting Request',
  //           title: 'Meeting Request',
  //           icon: <Send size={12} />,
  //           navLink: '/master/meeting-request-master'
  //         },
  //         {
  //           id: 'Status Master',
  //           title: 'Status',
  //           icon: <AssignmentTurnedInIcon size={12} />,
  //           navLink: '/master/status-master'
  //         },
  //         {
  //           id: 'Labour Master',
  //           title: 'Labour',
  //           icon: <TransferWithinAStationIcon size={12} />,
  //           navLink: '/master/labour-master'
  //         },
  //         {
  //           id: 'Employee Master',
  //           title: 'Employee',
  //           icon: <AssignmentIndIcon size={12} />,
  //           navLink: '/master/employee-master'
  //         },
  //         {
  //           id: 'Guest User Master',
  //           title: 'Guest User',
  //           icon: <AssignmentIndIcon size={12} />,
  //           navLink: '/master/guest-master'
  //         },
  //         {
  //           id: 'Association Master',
  //           title: 'Association',
  //           icon: <AssignmentIndIcon size={12} />,
  //           navLink: '/master/association-master'
  //         },
  //         {
  //           id: 'Document Master',
  //           title: 'Document',
  //           icon: <AssignmentIndIcon size={12} />,
  //           navLink: '/master/document-master'
  //         },
  //         {
  //           id: 'Document Type Master',
  //           title: 'Document Type',
  //           icon: <AssignmentIndIcon size={12} />,
  //           navLink: '/master/document-type-master'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'MOM',
  //       title: 'MOM',
  //       icon: <AccessAlarmsIcon size={18} />,
  //       children:[
  //         {
  //           id: ' Meeting Details',
  //           title: 'Add MOM',
  //           icon: <Layout size={18} />,
  //           navLink: '/master-of-meeting/create-meeting'
  //         },
  //         {
  //           id: 'List Of MOM',
  //           title: 'List Of MOM',
  //           icon: <Layers size={18} onClick={() => window.location.reload()}/>,
  //           navLink: '/master-of-meeting/list-meeting'
  //         }
  //       ]
  //     },
      // {
      //   id: 'hr',
      //   title: 'HR Model',
      //   icon: <PersonPinIcon size={18} />,
      //   children:[
      //     {
      //       id: 'Man Power Attendance',
      //       title: 'Man Power Attendance',
      //       icon: <Users size={18} />,
      //       navLink: '/hr/man-power'
      //     },
      //     {
      //       id: 'Daily Turnover',
      //       title: 'Daily Turnover',
      //       icon: <DollarSign size={18} />,
      //       navLink: '/hr/daily-Turnover'
      //     },
      //     {
      //       id: 'Contractor Registration',
      //       title: 'Contractor Registration',
      //       icon: <AssignmentIndIcon size={18} />,
      //       children:[
      //         {
      //           id: 'Contractor',
      //           title: 'Contractor Registration',
      //           icon: <AccessibilityIcon size={18} />,
      //           navLink: '/hr/contractor-detail'
      //           },
      //         {
      //           id: 'Employe Registration',
      //           title: 'Employe Registration',
      //           icon: <PenTool size={18} />,
      //           navLink: '/hr/employee-registration'
      //         }
           
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'ECR Model',
      //   title: 'ECR Model',
      //   icon: <Shuffle size={18} />,
      //   children:[
      //     {
      //       id: 'ECR Registration',
      //       title: 'ECR Registration',
      //       icon: <Twitch size={18} />,
      //       navLink: '/ecr/create-ecr'
      //     }

      //     // {
      //     //   id: 'list',
      //     //   title: 'List Of Meeting',
      //     //   icon: <Twitch size={18} />,
      //     //   navLink: '/master_of_meeting/list_meeting'
      //     // }
      //   ]
      // },
      // {
      //   id:"Business",
      //   title:"Business",
      //   icon: <BusinessIcon size={18}/>,
      //   children:[
      //     {
      //       id: 'Business Trip',
      //       title: 'Business Trip',
      //       icon: <Truck size={18} />,
      //       navLink: '/business/business-trip'
      //     }
      //   ]
      // },
      // {
      //   id:"Purchase",
      //   title:"Purchase",
      //   icon: <ShoppingBag size={18}/>,
      //   children:[
      //     {
      //       id: 'Purchase Request',
      //       title: 'Purchase Detail',
      //       icon: <ShoppingBag size={18} />,
      //       navLink: '/purchase/purchase-detail'
      //     },
      //     {
      //       id: 'Stationary Request',
      //       title: 'Stationary Request',
      //       icon: <ShoppingBag size={18} />,
      //       navLink: '/purchase/stationary-request'
      //     }
      //   ]
      // }
]
