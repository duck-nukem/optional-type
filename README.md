
# Optional-type 🤷‍♂️

[![Maintainability](https://api.codeclimate.com/v1/badges/14424b3dc99cc590b30b/maintainability)](https://codeclimate.com/github/kreatemore/optional-type/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/14424b3dc99cc590b30b/test_coverage)](https://codeclimate.com/github/kreatemore/optional-type/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kreatemore/optional-ts/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kreatemore/optional-ts?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/kreatemore/optional-type.svg?style=svg)](https://circleci.com/gh/kreatemore/optional-type)
[![Greenkeeper badge](https://badges.greenkeeper.io/kreatemore/optional-type.svg)](https://greenkeeper.io/)

A Typescript class trying to be Java's Optional.

## Resources

* [docs](https://kreatemore.github.io/optional-type/index.html)
(navigate using the right hand side)
* [github repository](https://github.com/kreatemore/optional-type)
* [issue tracker](https://github.com/kreatemore/optional-type/issues)
* [create issue](https://github.com/kreatemore/optional-type/issues/new/choose)
* [npm package](https://www.npmjs.com/package/optional-type)

## Why

* Your application might need to add special meaning to `null` values.
* Avoid repeating `if(expr === null)`
* Avoid `cannot read property prop of null`

## Examples

Some very good examples can be found [here](http://www.baeldung.com/java-optional).
The examples are written in Java, but the concept should get across regardless.

Sample code:
```
Optional.ofNullable(response)
        .map(response => response.data)
        .filter(data => !!data.length)
        .ifPresent(data => serialize(data))
        .orElse([]);
```

Now has support for pivoting on both `undefined` & `null` if you
don't want to differentiate in JS, just expect it to work.

```
Optional.ofUndefinable(response);
```

## Contributing

To get the project running locally:

1. `git clone`
2. `npm install`
3. `npm run test` to run jest

Before committing, please recompile the docs using `npm run docs`.
