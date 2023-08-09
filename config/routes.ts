const routes = [
  {
    path: '/',
    routes: [
      { path: '/', redirect: '/home' },
      {
        name: 'HOME',
        path: '/home',
        component: './Home',
      },
      {
        name: 'FinKG Query',
        path: '/query',
        component: './Query',
        // microApp: 'query',
      },
      {
        name: 'FinKG Update',
        path: '/update',
        component: './Update',
        // microApp: 'update',
      },
      {
        name: 'Data Sources',
        path: '/datasources',
        component: './DataSource',
      },
      {
        name: 'APIs',
        path: '/table2',
        component: './Table',
      },
      {
        name: 'K-Quant',
        path: '/kquant',
        component: './KQuant',
      },
      {
        name: 'Explainer',
        path: '/table4',
        component: './Table',
      },
      {
        name: 'More Information',
        path: '/more',
        component: './More',
      },
      {
        name: '404',
        path: '/*',
        component: './404',
        hideInMenu: true,
      },
    ],
  },
];

export default routes;
