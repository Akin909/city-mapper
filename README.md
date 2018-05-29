## Minimapper

The next big thing, thank you very much!.
Using the TFL api Minimapper displays the status of the
London Underground lines. Selecting a line should show the branches and stops
on that line. Selecting a stop should show the next 3 departures for each platform
at that stop.

# Initial Setup:

Using Parcel as opposed to Webpack, for simplicity
added react, prettier (to amazingly autoformat my code), enzyme and jest(so I don't look up in an hour and realise there are no tests).
Added typescript for static type analysis.

Architectural Decisions:

This project uses `react-apollo` with `apollo-link-state` and `apollo-link-rest`
as an alternative to state management solutions such as redux.
Components are organised using atomic design which promotes composability and reusability of the ui.

### Optimisations (Once the app is completed)

*   Improve strategy for querying API i.e. some form of polling but otherwise if no access then use cache data.
*   Make app a Progressive Web App.
