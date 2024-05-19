const routes = [
  {
    path: '/',
    routes: [
      { path: '/', redirect: '/welcome' },
      {
        name: 'Home',
        path: '/welcome',
        component: './Welcome',
        // hideInMenu: true,
      },
      // {
      //   name: 'HOME',
      //   path: '/home',
      //   component: './Home',
      // },
      // {
      //   name: 'FinKG Query',
      //   path: '/query',
      //   component: './Query',
      // },
      // {
      //   name: 'FinKG Update',
      //   path: '/update',
      //   component: './Update/newPage',
      // },
      {
        name: 'KB Construction',
        path: '/KB',
        component: './KB',
      },
      {
        name: 'Data Sources',
        path: '/datasources',
        component: './DataSource',
      },
      {
        name: 'APIs',
        path: '/apis',
        component: './API',
      },
      {
        name: 'K-Quant',
        path: '/kquant',
        component: './KQuant',
      },
      {
        name: 'Explainer',
        path: '/explainer/:date',
        component: './Explainer',
      },
      {
        name: 'Assessment',
        path: '/assessment',
        component: './Assessment',
      },
      {
        name: 'News',
        path: '/News',
        component: './Progress',
        hideInMenu: true,
      },
      {
        name: 'More Information',
        path: '/more',
        component: './More',
        hideInMenu: true,
      },
      {
        name: 'new-home',
        path: '/newHome',
        component: './newHome',
        hideInMenu: true,
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
