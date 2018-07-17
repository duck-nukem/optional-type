# Optional.ts 🤷‍♂️

A wrapper class trying to be Java's Optional.

## Docs
[Link](https://kreatemore.github.io/optional-ts/modules/_index_.html)

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