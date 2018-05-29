# Minimapper

The next big thing, thank you very much!.
Using the TFL api Minimapper displays the status of the
London Underground lines. Selecting a line should show the branches and stops
on that line. Selecting a stop should show the next 3 departures for each platform
at that stop.

## Initial Setup:

Using Parcel as opposed to Webpack, for simplicity
added react, prettier (to amazingly autoformat my code), enzyme and jest(so I don't look up in an hour and realise there are no tests).
Added typescript for static type analysis.

Architectural Decisions:

This project uses `react-apollo` with `apollo-link-state` and `apollo-link-rest`
as an alternative to state management solutions such as redux.
Components are organised using atomic design which promotes composability and reusability of the ui.

## Instructions to Run Project

*   Unzip the project
*   Run `yarn/npm` install
*   Create a .env file and add a TFL APP_ID and APP_KEY env vars as well as a TFL endpoint
    *   if running this locally i.e. via local host use `TFL_API=https://cors-anywhere.herokuapp.com/https://api.tfl.gov.uk`
    *   this endpoint uses the cors-anywhere project to bypass CORS issue trying to contact the tfl api from localhost
    *   it works as a proxy for the requests.
*   Run yarn start

## Future Work/Improvements

*   Tests!! - despite adding the infrastructure time got the better of me and I didn't manage to add any :sad:
*   Write data into the cache so though each call is cached I could re-use some of the data on other pages
*   Add animations using pose.
