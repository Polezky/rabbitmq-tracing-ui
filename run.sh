#!/bin/bash
set -e

pluginName=rabbitmq_tracing_ui
rabbitmqPluginPath="/lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/$pluginName"

function run() {
  action=$1
  password=$2

  if [[ $action == *"f"* ]]; then
    rebuildFrontend "$password"
  fi

  if [[ $action == *"p"* ]]; then
    rebuildPlugin "$password"
  fi

  if [[ $action == *"z"* ]]; then
    zipPlugin
  fi
}

function rebuildFrontend() {
  password=$1
  rm -rf ./priv/www/js/ui
  cd ./src-frontend
  npm run build &&
    updateTracingUiHtml &&
    cp -r ./build/_app/immutable ../priv/www/js/ui &&
    echo "$password" | sudo -S rm -rf "$rabbitmqPluginPath/priv" &&
    echo "$password" | sudo -S cp -r ../priv "$rabbitmqPluginPath/priv" &&
    cd ..
}

function updateTracingUiHtml() {
  script=$(sed -n '/<script>/,/<\/script>/{ /script>/d; p }' ./build/index.html)
  script=${script/'{'/''}
  script=${script/'__sveltekit_'/'window.__sveltekit_'}
  script=${script/'document.currentScript.parentElement'/'document.getElementById("tracing-ui")'}
  script="${script::-1}"

  html="<div id=\"tracing-ui\"><script type=\"module\">$script</script></div>"
  source="_app/immutable"
  target="js/ui"
  html=${html//$source/$target}
  echo "$html" >"../priv/www/js/tmpl/tracing-ui.ejs"
}

function zipPlugin() {
  pluginPath=$(find plugins -name "*$pluginName*" -type d)
  zip -r dist/$pluginName.zip "$pluginPath"
}

function rebuildPlugin() {
  password=$1
  echo "$password" | sudo -S rm -rf ebin

  echo "$password" | sudo -S make dist

  pluginPath=$(find plugins -name "*$pluginName*" -type d)

  echo "$password" | sudo -S rm -rf "$rabbitmqPluginPath"
  echo "$password" | sudo -S cp -r "$pluginPath" "$rabbitmqPluginPath"

  echo "$password" | sudo -S rabbitmq-plugins disable "$pluginName"
  echo "$password" | sudo -S rabbitmq-plugins enable "$pluginName"

  echo "$password" | sudo -S systemctl stop rabbitmq-server
  echo "$password" | sudo -S systemctl start rabbitmq-server
}

run "$@"

# rabbitmq-diagnostics status
