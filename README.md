# Optional.ts 🤷‍♂️
[![Maintainability](https://api.codeclimate.com/v1/badges/702b920220cbcf5e8894/maintainability)](https://codeclimate.com/github/kreatemore/optional-ts/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/kreatemore/optional-ts/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kreatemore/optional-ts?targetFile=package.json)

A wrapper class trying to be Java's Optional.

## Docs
[Link](https://kreatemore.github.io/optional-ts/index.html)

Then navigate using the right hand side of the page. 

## Why

Your application might need to add special meaning to null values.
For example, your search might return `[]` or `null` depending if the
filters yielded no results, or if you have no data yet in the system.

This is where `Optional` can be helpful, as you can avoid doing 
`if (result === null) { ... }` every time you work with a nullable type.
 
 ## Examples
 
Some very good examples can be found [here](http://www.baeldung.com/java-optional).
The examples are written in Java, but the concept should get across regardless.

## Contributing

To get the project running locally:

1. clone
2. npm install
3. npm run test to run jest

Before committing, please recompile the docs using `npm run docs`.
