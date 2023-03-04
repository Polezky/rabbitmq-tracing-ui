#!/bin/bash
set -e

make dist

rm -rf /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracingui/*
cp -r /home/polezky/rabbitmq-tracing-ui/plugins/rabbitmq_tracingui-401f278+dirty/* /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracingui/

# rabbitmq-plugins disable rabbitmq_tracing
rabbitmq-plugins enable rabbitmq_tracingui

systemctl stop rabbitmq-server
systemctl start rabbitmq-server