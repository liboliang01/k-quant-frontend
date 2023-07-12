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
      },
      {
        name: 'FinKG Update',
        path: '/update',
        component: './Update',
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
        path: '/table3',
        component: './Table',
      },
      {
        name: 'Explainer',
        path: '/table4',
        component: './Table',
      },
      {
        name: 'More Information',
        path: '/table5',
        component: './Table',
      },
    ],
  },
];

export default routes;
