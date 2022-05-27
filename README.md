# Excersise task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I am using typescript template.

## Important packages

- mui/material - for easier use of some compoenets like Button, Dropdown, Linear progress and Snackbar
- react-table - UI is headless which gives me the ability to design my table how ever I want, but still very powerful with out of the box functionalities
- styled-components - for element styling

## Important links

[CodeSandbox](https://codesandbox.io/s/github/fademovic/pft)

[Forked Sandbox in case something is wrong with first one](https://codesandbox.io/s/youthful-panini-wzg74h)

[Deployed on Vercel](https://pft-finance-app.vercel.app/)

[Demo](https://www.loom.com/share/da692e9866de40c5b8ef4fb1810dad75)

## Important notes

Prettier and ESLint used for code formatting and identifying patern issues.

Expanded app with react-router-dom to show route handling.

Complete app is wrapped with *Root component* and with *Root context*. This approach gives me the ability to easily reuse generic things which are relevant to the ALL components and routes. Like notifications and layout handling based on routes, accessing to the current logged user etc.

Contexts which are specific to few routes/components will be created seperately. Root component and Root context should be **lightweight** and **as simple as possible**.

## How to test

The complete app is based on the content from the expanses.csv

First step is to upload that file through the app.

By clicking on the header cell the data should be sorted.

Filter the data by using the dropdown field. With Select All, filters should be reseted to the initial state.

It is possible to sort the data after filtering also.

**BUG: Sorting by amount** More info in Wishlist.MD

## Challanges

React-table is really powerfull the only objection I have on it is not good out of the box compatibility with typescript.
But at the end everything is fine and smooth.

Importing amount as string, sorting it as number, displaying it again as string with comma separation and currency at the end.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
