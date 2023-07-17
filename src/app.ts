import logo from '@/assets/UST.jpg';
import './global.less';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'K-Quant HKUST' };
}

export const layout = () => {
  return {
    logo,
    menu: {
      locale: true,
    },
    layout: 'top',
    fixedHeader: true,
    rightRender: () => null,
    contentStyle: { padding: '0' },
    menuDataRender: (routes: any) =>
      routes[0].children.filter((item: any) => item.hideInMenu !== true),
  };
};
