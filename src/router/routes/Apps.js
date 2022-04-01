import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {

    path: '/',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email/MailCard')),
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
    path: '/apps/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  }
]

export default AppRoutes
