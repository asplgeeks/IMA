import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {

    path: '/',
    exact: true,
    appLayout: true,
    className: 'email-application',
    // component: lazy(() => import('../../views/apps/email/MailCard')),
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/',
      // publicRoute: true
      authRoute: true
    }
  },
  {

    path: '/apps',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/apps/email',
    // exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink:'/apps/email'
    }
  },
  {
    path: '/apps/data/:fuid/:user_id',
    exact: true,
    appLayout: true,
    className: '',
    component: lazy(() => import('../../views/apps/data')),
    meta: {
     publicRoute: true
    }
  }
]

export default AppRoutes
