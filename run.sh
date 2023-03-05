#!/bin/bash
set -e

pluginName=rabbitmq_tracing_ui
rabbitmqPluginPath="/lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/$pluginName"

function run() {
  if [[ "$1" == "p" ]]; then
    rebuildPlugin
  elif [[ "$1" == "f" ]]; then
    rebuildFrontend "$2"
  else
    echo "wrong argument"
  fi
}

function rebuildFrontend() {
  rm -rf ./priv/www/js/ui
  cd ./src-frontend
  npm run build &&
    updateTracingUiHtml &&
    cp -r ./build/_app/immutable ../priv/www/js/ui &&
    echo "$1" | sudo -S rm -rf "$rabbitmqPluginPath/priv" &&
    echo "$1" | sudo -S cp -r ../priv "$rabbitmqPluginPath/priv"
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

function rebuildPlugin() {
  rm -rf ebin

  make dist

  distPluginPath=$(find plugins -name "*$pluginName*" -type d)

  rm -rf "$rabbitmqPluginPath"
  cp -r "$distPluginPath" "$rabbitmqPluginPath"

  rabbitmq-plugins disable "$pluginName"
  rabbitmq-plugins enable "$pluginName"

  systemctl stop rabbitmq-server
  systemctl start rabbitmq-server
}

run "$@"

# rabbitmq-diagnostics status
