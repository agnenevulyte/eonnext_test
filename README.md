# Meter Readings

For this exercise, we would like you to create an app to collect customer's meter readings.

Customers read the numbers from their electricity meter, and send them to us so we can properly bill them for their electricity and gas usage.

We need this app to do the following:

## Adding new readings

We want to allow users to add new meter readings using the input box.

New meter readings should be displayed in the section marked "previous meter readings", ordered from most to least recent.

## Validating meter readings

New readings should be validated against the following rules:
a. They must be a 5 digit number between 00000 and 99999.
b. A new reading must be higher than the last _customer_ reading.

When a customer enters an invalid meter, we should apply the `error` class to the input field, and show an error message.

## Predicted usage

We want to predict the customer's upcoming usage and show it on the page. We predict future usage by taking the last four meter readings, taking the average distance between them, and adding that to the latest reading.

For example, if the customers' readings were (in descending order):

00400
00350
00250
00100

The average distance between each of these is:

00400 - 00350 = 50
00350 - 00250 = 100
00250 - 00100 = 150

(150 + 100 + 50) / 3 = 100

Predicted usage = 00400 + 100 = 00500

## Development

Prior to running any development commands, dependencies will need to be installed. This can be done via the command `npm i`.

## Running

In order to run the app locally, this can be started via the command:

```sh
npm start
```

The server operates on a hot-reloading pattern, so changes may be made whilst the server is running, and immediately viewable in the browser.

## Testing

## Unit

The project is tested using [`jest`](https://jestjs.io/) (for unit tests) and [`testing-library`](https://testing-library.com/) (for component tests). The tests can be run via the command:

```sh
npm test
```
