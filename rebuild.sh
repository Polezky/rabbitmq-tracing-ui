#!/bin/bash
set -e

# make dist

rm -rf /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracing_ui/*
cp -r /home/polezky/rabbitmq-tracing-ui/plugins/rabbitmq_tracing_ui-75c30ff+dirty/* /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracing_ui/

rabbitmq-plugins disable rabbitmq_tracing_ui
rabbitmq-plugins enable rabbitmq_tracing_ui

systemctl stop rabbitmq-server
systemctl start rabbitmq-server

rabbitmq-diagnostics status