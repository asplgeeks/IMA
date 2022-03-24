import { lazy } from 'react'

const DashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/pages/authentication/ComingSoon'))
  },
  // Dashboards
  {
    path: '/dashboard/master',
    component: lazy(() => import('../../views/pages/authentication/Master'))
  },
  {
    path: '/master/user',
    component: lazy(() => import('../../views/pages/authentication/Master')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/country-master',
    component: lazy(() => import('../../views/pages/master/countrymaster')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/state-master',
    component: lazy(() => import('../../views/pages/master/statemaster')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/designation-master',
    component: lazy(() => import('../../views/pages/master/designationmaster')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/department-master',
    component: lazy(() => import('../../views/pages/master/departmentmaster')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/organization-master',
    component: lazy(() => import('../../views/pages/master/organizationmaster')),
    // component: lazy(() => import('../../views/master/ecommerce')),
    exact: true
  },
  {
    path: '/master/daily-update-master',
    component: lazy(() => import('../../views/pages/master/dailyupdate')),
    exact: true
  },
  {
    path: '/master/rss-feed-master',
    component: lazy(() => import('../../views/pages/master/rssfeedmaster')),
    exact: true
  },
  {
    path: '/master/finance-master',
    component: lazy(() => import('../../views/pages/master/financialyearmaster')),
    exact: true
  },
  {
    path: '/master/custom-group-master',
    component: lazy(() => import('../../views/pages/master/customgroupmaster')),
    exact: true
  },
  {
    path: '/master/custom-master',
    component: lazy(() => import('../../views/pages/master/custommaster')),
    exact: true
  },
  {
    path: '/master/material-category-master',
    component: lazy(() => import('../../views/pages/master/materialcategorymaster')),
    exact: true
  },
  {
    path: '/master/material-sub-category-master',
    component: lazy(() => import('../../views/pages/master/materialsubcategorymaster')),
    exact: true
  },
  {
    path: '/master/item-master',
    component: lazy(() => import('../../views/pages/master/itemmaster')),
    exact: true
  },
  {
    path: '/master/currency-master',
    component: lazy(() => import('../../views/pages/master/currencymaster')),
    exact: true
  },
  {
    path: '/master/payment-master',
    component: lazy(() => import('../../views/pages/master/paymentmaster')),
    exact: true
  },
  {
    path: '/master/budget-master',
    component: lazy(() => import('../../views/pages/master/budgethead')),
    exact: true
  },
  {
    path: '/master/unit-measurment',
    component: lazy(() => import('../../views/pages/master/unitofmaster')),
    exact: true
  },
  {
    path: '/master/cost-center-master',
    component: lazy(() => import('../../views/pages/master/costcentermaster')),
    exact: true
  },
  {
    path: '/master/function-master',
    component: lazy(() => import('../../views/pages/master/functionmaster')),
    exact: true
  },
  {
    path: '/master/meeting-request-master',
    component: lazy(() => import('../../views/pages/master/minutsofmeeting')),
    exact: true
  },
  {
    path: '/master/status-master',
    component: lazy(() => import('../../views/pages/master/statusMaster')),
    exact: true
  },
  {
    path: '/master/labour-master',
    component: lazy(() => import('../../views/pages/master/labourMaster')),
    exact: true
  },
  {
    path: '/master/employee-master',
    component: lazy(() => import('../../views/pages/master/employeeMaster')),
    exact: true
  },
  {
    path: '/master/guest-master',
    component: lazy(() => import('../../views/pages/master/guestMaster')),
    exact: true
  },
  {
    path: '/master/association-master',
    component: lazy(() => import('../../views/pages/master/associationMaster')),
    exact: true
  },
  {
    path: '/master/document-master',
    component: lazy(() => import('../../views/pages/master/documentMaster')),
    exact: true
  },
  {
    path: '/master/document-type-master',
    component: lazy(() => import('../../views/pages/master/documentTypeMaster')),
    exact: true
  }
]

export default DashboardRoutes
