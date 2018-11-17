module.exports = (api, _, __, invoking) => {
  api.render('./template', {
    hasElement: api.hasPlugin('element-ui')
  })

  api.extendPackage({
    devDependencies: {
    },
    scripts: {
      "{{cmd}}": "vue-cli-service {{cmd}}"
    }
  })

  if (api.hasPlugin('eslint')) {
    applyESLint(api)
  }

  if (api.hasPlugin('element-ui')) {
    applyElement(api, invoking)
  }
}

const applyESLint = module.exports.applyESLint = api => {
  api.render(files => {
    files['tests/.eslintrc.js'] = api.genJSConfig({
      rules: {
        "no-redeclare": 0,
        "no-useless-escape": 0,
        "no-undef": 0,
        "no-unused-vars": 0,
        "no-console": 0
      }
    })
  })
}

const applyElement = module.exports.applyElement = (api, invoking) => {
  api.extendPackage({
    devDependencies: {
    }
  })
  // inject testcafe types to tsconfig.json
  if (invoking) {
    api.render(files => {
    })
  }
}
