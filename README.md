## Minimapper

The next big thing, thank you very much!
Using the TFL api Minimapper displays the status of the
London Underground lines. Selecting a line should show the branches and stops
on that line. Selecting a stop should show the next 3 departures for each platform
at that stop.

Initial Setup:

Using parcel to as opposed to webpack, for simplicity
added react, prettier (to amazingly autoformat my code), enzyme and jest(so I don't look up in an hour and realise there are no tests).
Added typescript for static type analysis.

Architectural Decisions:

This project uses React-apollo with apollo link state as an alternative to state management solutions such as redux as
well as the now stable react `context` api to manage application state.

Components are organised using atomic design which promotes composability and reusability of the ui.
