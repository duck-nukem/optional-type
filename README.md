# Optional-type 🤷‍♂️
[![Maintainability](https://api.codeclimate.com/v1/badges/702b920220cbcf5e8894/maintainability)](https://codeclimate.com/github/kreatemore/optional-ts/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/kreatemore/optional-ts/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kreatemore/optional-ts?targetFile=package.json)

A wrapper class trying to be Java's Optional.

## Docs
[Link](https://kreatemore.github.io/optional-type/index.html)
(navigate using the right hand side) 

## Why

* Your application might need to add special meaning to `null` values.
* Avoid repeating `if(expr === null)`
* Avoid `cannot read property prop of null`

 ## Examples
 
Some very good examples can be found [here](http://www.baeldung.com/java-optional).
The examples are written in Java, but the concept should get across regardless.

```
const results = Optional.ofNullable(response)
                        .map(response => response.data)
                        .filter(data => !!data.length)
                        .ifPresent(data => serialize(data))
                        .orElse([]);
```
 
## Contributing

To get the project running locally:

1. `git clone`
2. `npm install`
3. `npm run test` to run jest

Before committing, please recompile the docs using `npm run docs`.
