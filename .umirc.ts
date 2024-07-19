import { defineConfig } from '@umijs/max';
import routes from './config/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'K-QUANT',
    contentStyle: {},
  },
  // links: [{ rel: 'icon', href: 'images/UST.jpg' }],
  title: 'K-Quant',
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  routes,
  npmClient: 'npm',
  // mfsu: {
  //   strategy: 'normal',
  // },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: { type: 'hash' },
});
