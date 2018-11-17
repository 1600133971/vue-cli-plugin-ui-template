# ☕️ {{name}}

> {{cmd}} plugin(ui) for vue-cli 3.x

This adds unit testing support using [{{cmd}}](http://template-runner.github.io/latest/index.html).

## Features

### Implemented
- Run unit tests in headless chrome with `vue-cli-service {{cmd}}`

## Injected Commands

- **`vue-cli-service {{cmd}}`**

  run unit tests with template.

  Options:

  ```
  --mode              specify the mode the dev server should run in. (default: development)
  ```

  This command automatically starts a {{cmd}} server in development mode to run the unit tests against.

## Configuration

We've pre-configured {{cmd}} to place most of the unit testing related files under `<projectRoot>/`.

## Installing in an Already Created Project

``` sh
npm install -D {{name}}
```
