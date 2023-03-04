-module(rabbit_tracing_ui).

-behaviour(application).

-export([start/2, stop/1]).

start(normal, []) ->
    rabbit_tracing_ui_sup:start_link().

stop(_State) ->
    ok.
