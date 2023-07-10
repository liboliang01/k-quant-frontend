import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'K-QUANT HKUST',
    contentStyle: {},
  },
  links: [{ rel: 'icon', href: 'images/UST.jpg' }],
  title: 'K-Quant',

  routes,
  npmClient: 'npm',
});
