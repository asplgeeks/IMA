// ** Routes Imports
import AppRoutes from './Apps'
// import FormRoutes from './Forms'
import PagesRoutes from './Pages'
// import TablesRoutes from './Tables'
// import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
// import MasterMeetingsRoutes from './Mom'
// import PageLayoutsRoutes from './PageLayouts'


// ** Document title
const TemplateTitle = '%s -IMA'

// ** Default Route
const DefaultRoute = '/apps'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes
  // ...MasterMeetingsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartMapsRoutes
]


export { DefaultRoute, TemplateTitle, Routes }
export default { DefaultRoute, TemplateTitle, Routes }
