#!/bin/bash
set -e

rm -rf /home/polezky/rabbitmq/deps/rabbitmq_tracing_ui/ebin

make dist

rm -rf /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracing_ui
cp -r /home/polezky/rabbitmq/deps/rabbitmq_tracing_ui/plugins/rabbitmq_tracing_ui-3.11.0+rc.2.444.g6bbaadd /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracing_ui

rabbitmq-plugins disable rabbitmq_tracing_ui
rabbitmq-plugins enable rabbitmq_tracing_ui

systemctl stop rabbitmq-server
systemctl start rabbitmq-server
# rabbitmq-diagnostics status

# cp -r /home/polezky/rabbitmq/deps/rabbitmq_tracing_ui /home/polezky/rabbitmq_tracing_ui_4
# cp -r /home/polezky/rabbitmq_tracing_ui_2 /home/polezky/rabbitmq/deps/rabbitmq_tracing_ui

# cp -r /home/polezky/rabbitmq/deps/rabbitmq_tracing/plugins/rabbitmq_tracing-3.11.0+rc.2.444.g6bbaadd /lib/rabbitmq/lib/rabbitmq_server-3.11.9/plugins/rabbitmq_tracing

# cp -rf /home/polezky/rabbitmq/deps/rabbitmq_tracing_ui/* /home/polezky/rabbitmq-tracing-ui/*