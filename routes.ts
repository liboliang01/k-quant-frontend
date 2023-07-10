const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'HOME',
    path: '/home',
    component: './Home',
  },
  {
    name: 'FinKG Query',
    path: '/access',
    component: './Access',
  },
  {
    name: 'FinKG Update',
    path: '/table',
    component: './Table',
  },
  {
    name: 'Data Sources',
    path: '/table',
    component: './Table',
  },
  {
    name: 'APIs',
    path: '/table',
    component: './Table',
  },
  {
    name: 'K-Quant',
    path: '/table',
    component: './Table',
  },
  {
    name: 'Explainer',
    path: '/table',
    component: './Table',
  },
  {
    name: 'More Information',
    path: '/table',
    component: './Table',
  },
];

export default routes;
