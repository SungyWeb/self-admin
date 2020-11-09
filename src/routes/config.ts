export interface IFMenuBase {
  key: string;
  title: string;
  route: string;
  icon?: string;
  component?: string;
  query?: string;
  requireAuth?: string;
  isVisitor?: boolean;    // 游客
}
export interface IFMenu extends IFMenuBase {
  subs?: IFMenuBase[];
}
const menus: {
  menus: IFMenu[];
  others: IFMenu[];
} = {
  menus: [
    {
      key: 'home-page',
      title: '首页',
      icon: 'mobile',
      component: 'dashboard',
      route: '/app/dashboard/index'
    }
  ],
  others: [],
}
export default menus
