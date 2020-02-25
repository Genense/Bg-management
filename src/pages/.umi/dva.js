import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'account', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/account.js').default) });
app.model({ namespace: 'arrangement', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/arrangement.js').default) });
app.model({ namespace: 'classroom', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/classroom.js').default) });
app.model({ namespace: 'course', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/course.js').default) });
app.model({ namespace: 'global', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/global.js').default) });
app.model({ namespace: 'school', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/school.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/setting.js').default) });
app.model({ namespace: 'student', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/models/student.js').default) });
app.model({ namespace: 'model', ...(require('/Users/jingjing/book/项目/FH/code/fh-umi/src/pages/dashboard/Dashboard/model.jsx').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
