-module(rabbit_tracing_ui_mgmt).

-behaviour(rabbit_mgmt_extension).

-export([dispatcher/0, web_ui/0]).

dispatcher() -> [].

web_ui()     -> [{javascript, <<"tracing-ui.js">>}].
