console.log('tracing-ui');

dispatcher_add(function (sammy) {
  sammy.get('#/traces-ui', function () {
    render({}, 'tracing-ui', '#/traces-ui');
  });
});

NAVIGATION['Admin'][0]['Tracing UI'] = ['#/traces-ui', 'administrator'];

