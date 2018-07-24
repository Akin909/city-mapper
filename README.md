# Minimapper

The next big thing, thank you very much!.
Using the TFL API Minimapper displays the status of the
London Underground lines. Selecting a line should show the branches and stops
on that line. Selecting a stop should show the next 3 departures for each platform
at that stop.

## Initial Setup:

Using Parcel as opposed to Webpack, for simplicity
added react, prettier (to amazingly autoformat my code),
enzyme and jest(so I don't look up in an hour and realise there are no tests, EDIT: it happened anyway...).
Added typescript for static type analysis.

### Architectural Decisions:

This project uses `react-apollo` with `apollo-link-state` and `apollo-link-rest`
as an alternative to state management solutions such as redux.
Components are organised using atomic design which promotes composability and reusability of the ui.

## Instructions to Run Project

*   Unzip the project
*   Run `yarn/npm` install
*   Create a .env file in the root of the project and add a TFL `APP_ID` and `APP_KEY` env vars as well as a TFL endpoint -
    example:

    ```
        APP_ID=myAppId
        APP_KEY=myAppKey
        TFL_API=TFL_API=https://cors-anywhere.herokuapp.com/https://api.tfl.gov.uk
    ```

    NOTE: Please make sure to complete this step BEFORE building the app (`yarn/npm start`) as `parcel`'s HMR can be a picky about detecting
    this after the app is initially built.

*   if running this locally i.e. via local host use `TFL_API=https://cors-anywhere.herokuapp.com/https://api.tfl.gov.uk`
*   this endpoint uses the cors-anywhere project to proxy the API requests to bypass CORS issues contacting the endpoint
    from local host.
*   Run yarn start

## Future Work/Improvements

*   Find a more elegant solution for accessing the TFL api on local host than using cors anywhere - ideas: create my own very light
    weight proxy server so I don't have to compete with all the traffic of `cors-anywhere` or maybe convert the app to `next.js`.
*   Write specific pertinent data into the cache so though each call is cached I could re-use some of the specific page data on other pages
*   Add animations using pose.
*   Use a theme i.e. rather than hard coding color values styled components allows for creating a theme object which
    all styled components get access to via context I could have then used this to make reference to the theme making
    it easier to change or dynamically update maybe.
