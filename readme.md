# RabbitMQ plugin to view and filter traces

## Features
tbd



## Installation

- Download plugin zip [from here](https://github.com/Polezky/rabbitmq-tracing-ui/raw/master/dist/rabbitmq_tracing_ui.zip)
- Navigate to RabbitMQ installation folder.

Linux, Mac OS
```shell
cd /usr/lib/rabbitmq # default path
```
Windows
```shell
cd C:\Program Files\RabbitMQ Server\rabbitmq_server-{x.y.z} # default path
```

- Navigate to 'plugins' folder inside the RabbitMQ folder
- Unzip the content of the downloaded rabbitmq_tracing_ui.zip to rabbitmq_tracing_ui folder
- Navigate back to the RabbitMQ folder and then navigate to the 'sbin' folder
- Enable plugin:

```shell
rabbitmq-plugins enable rabbitmq_management rabbitmq_tracing rabbitmq_tracing_ui
```

- Restart RabbitMQ:

Linux, Mac OS
```console
sudo systemctl stop rabbitmq-server
sudo systemctl start rabbitmq-server
```

Windows
```console
net stop RabbitMQ
net start RabbitMQ
```

## How to use
tbd


