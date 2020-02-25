import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/jingjing/book/项目/FH/code/fh-umi/src/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: require('../user/login').default,
        exact: true,
      },
      {
        name: '注册结果页',
        icon: 'smile',
        path: '/user/register-result',
        component: require('../user/register-result').default,
        exact: true,
      },
      {
        name: '注册页',
        icon: 'smile',
        path: '/user/register',
        component: require('../user/register').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/dashboard',
            exact: true,
          },
          {
            name: '分析页',
            icon: 'dashboard',
            path: '/dashboard',
            component: require('../dashboard/Dashboard').default,
            exact: true,
          },
          {
            path: '/school/',
            name: '学校',
            icon: 'bank',
            hideChildrenInMenu: true,
            authority: ['admin'],
            routes: [
              {
                path: '/school/',
                component: require('../school/schoolList').default,
                exact: true,
              },
              {
                name: '详情',
                path: '/school/:sid',
                component: require('../school/schoolManage').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: '课程',
            icon: 'smile',
            path: '/course/',
            hideChildrenInMenu: true,
            authority: ['admin'],
            routes: [
              {
                path: '/course/',
                component: require('../course/courseList').default,
                exact: true,
              },
              {
                path: '/course/:sid/:cid',
                name: '详情',
                component: require('../course/courseManage').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: '课室',
            icon: 'smile',
            path: '/classroom/',
            authority: ['admin'],
            component: require('../classroom/classroomList').default,
            exact: true,
          },
          {
            path: '/account/accountlist',
            name: '账户',
            icon: 'usergroup-add',
            component: require('../account/accountList').default,
            authority: ['admin'],
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/jingjing/book/项目/FH/code/fh-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
