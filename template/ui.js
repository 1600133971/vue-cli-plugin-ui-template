module.exports = api => {
  // 带命名空间的版本
  const {
    setSharedData,
    getSharedData,
    removeSharedData,
    watchSharedData,
    unwatchSharedData
  } = api.namespace('org.vue.st.{{namespace}}.addon.');

  function addQuotes(text) {
    return '\\\"' + (text) + '\\\"';
  }

  String.prototype.startWith = function(str){     
    var reg = new RegExp("^" + str);     
    return reg.test(this);        
  }  
  
  String.prototype.endWith = function(str){     
    var reg = new RegExp(str + "$");     
    return reg.test(this);        
  }

  api.describeConfig({
    id: 'org.vue.st.{{namespace}}.configuration',
    name: 'template',
    description: 'org.vue.st.{{namespace}}.config.description',
    link: 'https://github.com/1600133971/{{name}}',
    files: {
      // eslintrc.js
      eslint: {
        js: ['.eslintrc.js'],
        json: ['.eslintrc', '.eslintrc.json'],
        // 会从 `package.json` 读取
        package: 'eslintConfig'
      },
      // vue.config.js
      vue: {
        js: ['vue.config.js']
      }
    },
    onRead: ({ data, cwd }) => ({
      tabs: [
        {
          id: 'tab1',
          label: 'org.vue.st.{{namespace}}.config.tab1.label',
          icon: 'settings',
          prompts: [
            // 提示符对象们
          ]
        },
        {
          id: 'tab2',
          label: 'org.vue.st.{{namespace}}.config.tab2.label',
          icon: 'settings_applications',
          prompts: [
            // 提示符对象们
          ]
        }
      ]
    }),
    onWrite: ({ prompts, answers, data, files, cwd, api }) => {
      // ...
    }
  })

  api.describeTask({
    match: /vue-cli-service {{cmd}}/,
    description: 'org.vue.st.{{namespace}}.tasks.description',
    link: 'https://github.com/1600133971/{{name}}#injected-commands',
    prompts: [
      {
        name: 'mode',
        type: 'list',
        default: 'development',
        choices: [
          {
            name: 'development',
            value: 'development'
          },
          {
            name: 'production',
            value: 'production'
          },
          {
            name: 'test',
            value: 'test'
          }
        ],
        message: '--mode',
        description: 'org.vue.st.{{namespace}}.tasks.mode.description',
        group: 'org.vue.st.{{namespace}}.tasks.group.general'
      },
      {
        name: 'custom',
        type: 'input',
        default: '',
        description: 'org.vue.st.{{namespace}}.tasks.custom.description',
        group: 'org.vue.st.{{namespace}}.tasks.group.recommended'
      }
    ],
    // 钩子
    // 任务运行之前立即执行
    onBeforeRun: ({ answers, args }) => {
      // answers: 配置界面获取参数
      // args: 参数整理输出
      if (answers.mode) args.push('--mode', answers.mode);
      args.push('--file', answers.conf !== "custom" ? answers.conf : answers.customconf);
    },
    // 任务运行之后立即执行
    onRun: async ({ args, child, cwd }) => {
      // child: Node 子进程
      // cwd: 进程所在目录

      // build-status
      /*api.setSharedData('build-status.status', 'Processing');
      api.setSharedData('build-status.total', '...');
      api.setSharedData('build-status.skipped', '...');
      api.setSharedData('build-status.processed', '...');
      api.setSharedData('build-status.passed', '...');
      api.setSharedData('build-status.failed', '...');
      api.setSharedData('build-status.fixtures', '...');
      api.setSharedData('build-status.warnings', '...');
      api.setSharedData('build-status.startTime', '...');
      api.setSharedData('build-status.endTime', '...');
      api.setSharedData('build-status.duration', '...');
      api.setSharedData('build-status.userAgents', '...');*/

      // build-progress
      /*api.setSharedData('build-progress.status', 'Compiling');
      api.setSharedData('build-progress.progress', '0.4');
      api.setSharedData('build-progress.operations', 'e2e test is started');*/
    },
    onExit: async ({ args, child, cwd, code, signal }) => {
      // code: 退出码
      // signal: 可能会被使用的杀进程信号
      /*var fs = require('fs');
      var json = JSON.parse(fs.readFileSync("./tests/e2e/st.json"));*/

      // build-status
      /*api.setSharedData('build-status.status', 'Finished');
      api.setSharedData('build-status.total', json.total.toString());
      api.setSharedData('build-status.skipped', json.skipped.toString());
      api.setSharedData('build-status.processed', json.processed.toString());
      api.setSharedData('build-status.passed', json.passed.toString());
      api.setSharedData('build-status.failed', json.failed.toString());
      api.setSharedData('build-status.fixtures', json.fixtures.length.toString());
      api.setSharedData('build-status.warnings', json.warnings.length.toString());
      api.setSharedData('build-status.startTime', json.startTime);
      api.setSharedData('build-status.endTime', json.endTime);
      api.setSharedData('build-status.duration', json.duration);
      api.setSharedData('build-status.userAgents', json.userAgents.join(","));*/

      // build-progress
      /*api.setSharedData('build-progress.status', code === 0 ? 'Success' : 'Failed');
      api.setSharedData('build-progress.progress', '1');
      api.setSharedData('build-progress.operations', 'e2e test is finished');*/
    },
    // 额外的视图(仪表盘)
    // 默认情况下，这里是展示终端输出的 `output` 视图
    /*views: [
      {
        id: 'org.vue.st.{{namespace}}.client-addon',
        label: 'org.vue.st.{{namespace}}.tasks.views.label',
        icon: 'dashboard',
        component: 'org.vue.st.{{namespace}}.components.statistics'
      }
    ],*/
    // 展示任务详情时默认选择的视图 (默认是 `output`)
    //defaultView: 'org.vue.st.{{namespace}}.client-addon'
  })

  /*api.addClientAddon({
    id: 'org.vue.st.{{namespace}}.client-addon',
    // 包含构建出来的 JS 文件的文件夹
    path: 'vue-cli-addon-ui-{{namespace}}/dist'
    //url: 'http://localhost:8042/index.js'
  })*/

  // Hooks
  api.onProjectOpen((project, previousProject) => {
    //console.log('onProjectOpen', project.id, previousProject)
  })

  api.onPluginReload((project) => {
    //console.log('plugin reloaded', project.id)
  })

  api.onViewOpen(({ view, cwd }) => {
    //console.log('onViewOpen', view.id)
  })

  api.onTaskOpen(({ task, cwd }) => {
    //console.log('onTaskOpen', task.id)
    if (task.id.endWith(':karma')) {
      // build-status
      /*api.setSharedData('build-status.status', 'Idle');
      api.setSharedData('build-status.total', '...');
      api.setSharedData('build-status.skipped', '...');
      api.setSharedData('build-status.processed', '...');
      api.setSharedData('build-status.passed', '...');
      api.setSharedData('build-status.failed', '...');
      api.setSharedData('build-status.fixtures', '...');
      api.setSharedData('build-status.warnings', '...');
      api.setSharedData('build-status.startTime', '...');
      api.setSharedData('build-status.endTime', '...');
      api.setSharedData('build-status.duration', '...');
      api.setSharedData('build-status.userAgents', '...');*/

      // build-progress
      /*api.setSharedData('build-progress.status', 'Idle');
      api.setSharedData('build-progress.progress', '0');
      api.setSharedData('build-progress.operations', '...');*/
    }
  })

  api.onTaskRun(({ task, args, child, cwd }) => {
    //console.log('onTaskRun', task.id)
  })

  api.onTaskExit(({ task, args, child, signal, code, cwd }) => {
    //console.log('onTaskExit', task.id)
  })

  api.onConfigRead(({ config, data, onReadData, tabs, cwd }) => {
    //console.log('onConfigRead', config.id)
  })

  api.onConfigWrite(({ config, data, changedFields, cwd }) => {
    //console.log('onConfigWrite', config.id)
  })
}
