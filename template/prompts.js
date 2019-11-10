module.exports = [{
    type: 'input',
    name: 'name',
    message: 'Name of vue-cli ui plugin',
    validate: input => !!input,
    group: 'Basic Options',
    default: 'chrome-extension'
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version for vue-cli ui plugin',
    validate: input => !!input,
    group: 'Basic Options',
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description for vue-cli ui plugin',
    validate: input => !!input,
    group: 'Basic Options',
    default: '__MSG_pluginDesc__'
  },
  {
    type: 'list',
    name: 'script',
    message: 'Vue UI(devtools,newtab,options,popup) use Javascript or Typescript',
    choices: [
      { name: 'Javascript', value: 'js' },
      { name: 'Typescript', value: 'ts' }
    ],
    group: 'Basic Options',
    default: 'js',
  },
  {
    type: 'confirm',
    name: 'test1',
    message: 'test1 message',
    group: 'Extend Options',
    default: false
  },
  {
    when: answers => answers.test1,
    type: 'confirm',
    name: 'test2',
    message: 'test2 message',
    group: 'Extend Options',
    default: false
  },
  {
    when: answers => answers.test1 && answers.test2,
    type: 'confirm',
    name: 'test3',
    message: 'test3 message',
    group: 'Background Options',
    default: false
  }
];