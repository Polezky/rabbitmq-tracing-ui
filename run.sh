#!/bin/bash
set -e

pluginName=rabbitmq_tracing_ui
rabbitmqPluginPath="/lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/$pluginName"
currentScriptPath=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

function run() {
  action=$1
  password=$2

  if [[ $action == "copy-front" ]]; then
    copyFrontend "$password"
    return
  fi

  if [[ $action == *"front"* ]]; then
    buildFrontend "$password"
  fi

  if [[ $action == *"plugin"* ]]; then
    rebuildPlugin "$password"
  fi

  if [[ $action == *"zip"* ]]; then
    zipPlugin
  fi
}

function buildFrontend() {
  password=$1
  npm run --prefix "$currentScriptPath/src-frontend" build
}

function copyFrontend() {
  password=$1
  updateTracingUiHtml &&
    rm -rf "$currentScriptPath/priv/www/js/ui" &&
    cp -r "$currentScriptPath/src-frontend/build/_app/immutable" "$currentScriptPath/priv/www/js/ui" &&
    echo "$password" | sudo -S rm -rf "$rabbitmqPluginPath/priv" &&
    echo "$password" | sudo -S cp -r "$currentScriptPath/priv" "$rabbitmqPluginPath/priv"
}

function updateTracingUiHtml() {
  script=$(sed -n '/<script>/,/<\/script>/{ /script>/d; p }' "$currentScriptPath/src-frontend/build/index.html")
  script=${script/'{'/''}
  script=${script/'__sveltekit_'/'window.__sveltekit_'}
  script=${script/'document.currentScript.parentElement'/'document.getElementById("tracing-ui")'}
  script="${script::-1}"

  html="<div id=\"tracing-ui\"><script type=\"module\">$script</script></div>"
  source="_app/immutable"
  target="js/ui"
  html=${html//$source/$target}
  echo "$html" >"$currentScriptPath/priv/www/js/tmpl/tracing-ui.ejs"
}

function zipPlugin() {
  currentPath=$(pwd)
  pluginPath=$(find "$currentScriptPath/plugins" -name "*$pluginName*" -type d)
  cd "$pluginPath" &&
    zip -r - . >"$currentScriptPath/dist/$pluginName.zip" &&
    cd "$currentPath"
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
