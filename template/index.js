module.exports = (api, options) => {
  const chalk = require("chalk");

  function removeArg(rawArgs, arg) {
    const matchRE = new RegExp(`^--${arg}`);
    const equalRE = new RegExp(`^--${arg}=`);
    const i = rawArgs.findIndex(arg => matchRE.test(arg));
    if (i > -1) {
      rawArgs.splice(i, equalRE.test(rawArgs[i]) ? 1 : 2);
    }
  }

  function run(args, rawArgs) {
    removeArg(rawArgs, "mode");
    removeArg(rawArgs, "file");

    const serverPromise = api.service.run("serve", { mode: args.mode || "production" });

    return serverPromise.then(({ url, server }) => {
      const { info } = require("@vue/cli-shared-utils");
      info(`Starting unit tests...`);
      //info(`args: ` + JSON.stringify(args));
      //info(`rawArgs: ` + rawArgs);
      const templateArgs = [
        `start`,
        args.file
      ].filter(v => v);
      info(`template ` + templateArgs.join(" "));
      const execa = require("execa");
      const templateBinPath = require.resolve("{{cmd}}/bin/{{cmd}}");
      const runner = execa(templateBinPath, templateArgs, { stdio: "inherit" });
      if (server) {
        runner.on("exit", () => server.close());
        runner.on("error", () => server.close());
      }

      if (process.env.VUE_CLI_TEST) {
        runner.on("exit", code => {
          process.exit(code);
        });
      }

      return runner;
    });
  }

  const commandOptions = {
    "--mode": "specify the mode the dev server should run in. (default: development)"
  };

  api.registerCommand(
    "{{cmd}}",
    {
      description: "run unit tests with {{cmd}}",
      usage: "vue-cli-service {{cmd}} [options]",
      options: Object.assign(
        {
          // "--arg": "insert extra argument here"
        },
        commandOptions
      ),
      details:
        `All {{cmd}} configuration options are also supported:\n` +
        chalk.yellow(
          `http://{{cmd}}-runner.github.io/3.0/config/configuration-file.html`
        )
    },
    (args, rawArgs) => run(args, rawArgs)
  );
};
