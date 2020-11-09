/**
 * 校验是否登录，开发环境不需要
 * @param permits
 */
export const checkLogin = (permits: any): boolean => {
  return (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development'
}