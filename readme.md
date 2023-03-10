# RabbitMQ plugin to view and filter traces

## Installation

- Download plugin zip [from here](https://github.com/Polezky/rabbitmq-tracing-ui/raw/master/dist/rabbitmq_tracing_ui.zip)

### Windows installation

- stop RabbitMQ. E.g. in cmd with administrator privileges run:

```console
net stop RabbitMQ
```

- navigate to RabbitMQ installation folder. Default is C:\Program Files\RabbitMQ Server\rabbitmq_server-{x.y.z}
- navigate to plugins folder inside the RabbitMQ folder
- unzip the content of the downloaded rabbitmq_tracing_ui.zip to rabbitmq_tracing_ui folder
- navigate back to the RabbitMQ folder and then navigate to the 'sbin' folder
- open cmd for that folder with administrator privileges and run:

```console
rabbitmq-plugins enable rabbitmq_management rabbitmq_tracing rabbitmq_tracing_ui
```

- start RabbitMQ. E.g. in the same cmd run:

```console
net start RabbitMQ
```
