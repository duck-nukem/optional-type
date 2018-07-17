# Optional.ts 🤷‍♂️

A wrapper class similar to Java's Optional.

## Docs
[Link](/docs/modules/_index_.html)

## Why

Your application might need to add special meaning to null values.
For example, your search might return `[]` or `null` depending if the
filters yielded no results, or if you have no data yet in the system.

This is where `Optional` can be helpful, as you can avoid doing 
`if (result === null) { ... }` every time you work with a nullable type.
 