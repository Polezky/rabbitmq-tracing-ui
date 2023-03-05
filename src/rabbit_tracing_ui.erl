-module(rabbit_tracing_ui).

-behaviour(application).
-export([start/2, stop/1]).

start(_Type, _StartArgs) ->
    {ok, self()}.

stop(_State) ->
    ok.
