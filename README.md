# Currency Exchange App - Server

Please see main app documentation here - https://github.com/igalbo/chainwire

This is the server side of the currency exchange app. It receives GET requests for exchange rates for currency pairs in a given range, and returns a json object with an array of the requested dates.

# Preview

![ezgif-3-204070dc99](https://user-images.githubusercontent.com/68712178/173563622-7c29aa24-cd49-4b0d-9cfd-353aa183b6ab.gif)

# Usage

Send GET requests to https://chainwire-server.herokuapp.com/rates/ with the following headers: start_date, end_date, base_currency (in CAPS), currency (in CAPS).

The response will have an object that includes an array of rates for the given range and currency pair.

If an invalid range/pair is given, the server will return an error message: "Can't fetch data for selected range"

(I also added a POST functionality, but it's for testing purposes only)

# Packages used

- Express JS - for easier routing and middleware usage
- Axios - for fetching data
- MongoDB Atlas - database
- Dotenv - to store api keys and sensitive data as environment variables
