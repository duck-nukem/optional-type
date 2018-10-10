import { InvalidValueException } from './exceptions';

type JavascriptRepresentation = string;
type InvalidType = JavascriptRepresentation | 'null' | 'undefined';
type Nullable<T> = T | null;
type Undefinable<T> = Nullable<T> | undefined;

export class Optional<T> {
  private readonly value: Nullable<T> | Undefinable<T>;
  private readonly invalidTypes = new Set<InvalidType>();
  private readonly allowedInvalidTypes = new Set<InvalidType>();

  constructor(
      value?: Nullable<T> | Undefinable<T>,
      invalidTypes: InvalidType[] = [],
      allowedInvalidTypes: InvalidType[] = [],
  ) {
    this.invalidTypes = new Set<InvalidType>(invalidTypes);
    this.allowedInvalidTypes = new Set<InvalidType>(allowedInvalidTypes);

    if (this.isTypeInvalid(value)) {
      throw new InvalidValueException();
    }

    this.value = value;
  }

  /**
   * Returns an `Optional` describing the given non-`null`
   * value.
   *
   * @apiNote
   * Though it may be tempting to do so, avoid testing if an object is empty by
   * comparing with `==` against instances returned by `Optional.empty()`,
   * use {@link isPresent} instead.
   *
   * @param value the value to describe, which must be non-`null`
   * @param <T> the type of the value
   * @return an `Optional` with the value present
   * @throws `InvalidValueException` if value is `null`
   */
  static of<T>(value: T): Optional<T> {
    const disallow = ['null', 'undefined'];

    return new Optional(value, disallow);
  }

  /**
   * Returns an `Optional` describing the given value, if
   * non-`null`, otherwise returns an empty `Optional`.
   *
   * @param value the possibly-`null` value to describe
   * @param <T> the type of the value
   * @return an `Optional` with a present value if the specified value
   *         is non-`null`, otherwise an empty `Optional`
   */
  static ofNullable<T>(value: Nullable<T>): Optional<T> {
    const typeConfig = ['null'];

    return new Optional<T>(value, typeConfig, typeConfig);
  }

  /**
   * Returns an `Optional` describing the given value, if
   * non-`undefined` or non-`null`, otherwise returns an empty `Optional`.
   *
   * @param value the possibly-`undefined` or `null` value to describe
   * @param <T> the type of the value
   * @return an `Optional` with a present value if the specified value
   *         is non-`null` and non-`undefined`, otherwise an empty `Optional`
   */
  static ofUndefinable<T>(value: Undefinable<T>): Optional<T> {
    const typeConfig = ['null', 'undefined'];

    return new Optional<T>(value, typeConfig, typeConfig);
  }

  /**
   * Returns an empty `Optional` instance.  No value is present for this
   * `Optional`.
   *
   * @param <T> The type of the non-existent value
   * @return an empty `Optional`
   */
  static empty<T>(): Optional<T> {
    return new Optional<T>();
  }

  /**
   * Returns a non-empty string representation of this `Optional`
   * suitable for debugging.  The exact presentation format is unspecified and
   * may vary between implementations and versions.
   *
   * @return the string representation of this instance
   */
  toString(): string {
    let stringValue = '.empty';

    if (this.value) {
      stringValue = `[${this.value.toString()}]`;
    }

    return `Optional${stringValue}`;
  }

  /**
   * If a value is present, returns `true`, otherwise `false`.
   *
   * @return `true` if a value is present, otherwise `false`
   */
  isPresent(): boolean {
    const valueType = String(this.value) as JavascriptRepresentation;

    return !this.invalidTypes.has(valueType);
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise does nothing.
   *
   * @param action the action to be performed, if a value is present
   */
  ifPresent(action: (value?: T) => void): void {
    if (this.isPresent()) {
      action(this.value);
    }
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise performs the given empty-based action.
   *
   * @param action the action to be performed, if a value is present
   * @param emptyAction the empty-based action to be performed, if no value is
   *        present
   */
  ifPresentOrElse(
      action: (value: T) => void,
      emptyAction: () => T | void,
  ): void {
    if (this.isPresent()) {
      action(this.value);
    } else {
      emptyAction();
    }
  }

  /**
   * If a value is present, returns the value, otherwise returns
   * `other`.
   *
   * @param other the value to be returned, if no value is present.
   *        May be `null`.
   * @return the value, if present, otherwise `other`
   */
  orElse(other: Nullable<T>): T {
    return this.isPresent() ? this.value : other;
  }

  /**
   * If a value is present, returns the value, otherwise returns the result
   * produced by the supplying function.
   *
   * @param supplier the supplying function that produces a value to be returned
   * @return the value, if present, otherwise the result produced by the
   *         supplying function
   */
  orElseGet(supplier: () => T): T {
    return this.isPresent() ? this.value : supplier();
  }

  /**
   * If a value is present, returns the value, otherwise throws an exception
   *
   * @param <X> Type of the exception to be thrown
   * @param error the exception to be thrown
   * @return the value, if present
   * @throws X if no value is present
   */
  orElseThrow<X extends Error>(error: X): T | X {
    if (!this.isPresent()) {
      throw error;
    }

    return this.value;
  }

  /**
   * If a value is present, returns the value, otherwise throws
   * `InvalidValueException`.
   *
   * @deprecated this is counter intuitive for `Optional`,
   * since it throws an error if the value is `null`, recommended to
   * use {@link isPresent} or {@link ifPresent}, etc instead
   * @return the non-`null` value described by this `Optional`
   * @throws `InvalidValueException` if no value is present
   */
  get(): T {
    if (!this.isPresent()) {
      throw new InvalidValueException();
    }

    return this.value;
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * returns an `Optional` describing the value, otherwise returns an
   * empty `Optional`.
   *
   * @param predicate the predicate to apply to a value, if present
   * @return an `Optional` describing the value of this
   *         `Optional`, if a value is present and the value matches the
   *         given predicate, otherwise an empty `Optional`
   */
  filter(predicate: (value: T) => boolean): Optional<T> {
    const result = predicate(this.value);

    return result && this.isPresent() ? this : Optional.empty();
  }

  /**
   * If a value is present, returns an `Optional` describing (as if by
   * {@link ofNullable} or {@link ofUndefinable}, depending on the source)
   * the result of applying the given mapping function to
   * the value, otherwise returns an empty `Optional`.
   *
   * <p>If the mapping function returns a `null` result then this method
   * returns an empty `Optional`.
   *
   * @param mapper the mapping function to apply to a value, if present
   * @param <U> The type of the value returned from the mapping function
   * @return an `Optional` describing the result of applying a mapping
   *         function to the value of this `Optional`, if a value is
   *         present, otherwise an empty `Optional`
   */
  map<U>(mapper: (value: T) => U): Optional<U> {
    const value = mapper(this.value);

    if (!this.isPresent() || this.isTypeInvalid(value)) {
      return Optional.empty();
    }

    return this.mapToOptional(value);
  }

  private mapToOptional<T>(value: T): Optional<T> {
    const invalidTypes = Array.from(this.invalidTypes.values());
    const allowedInvalidTypes = Array.from(this.allowedInvalidTypes.values());

    return new Optional(value, invalidTypes, allowedInvalidTypes);
  }

  /**
   * If a value is present, returns the result of applying the given
   * `Optional`-bearing mapping function to the value, otherwise returns
   * an empty `Optional`.
   *
   * This method is similar to {@link map}, but the mapping
   * function is one whose result is already an `Optional`, and if
   * invoked, `flatMap` does not wrap it within an additional `Optional`.
   *
   * @param <U> The type of value of the `Optional` returned by the
   *            mapping function
   * @param mapper the mapping function to apply to a value, if present
   * @return the result of applying an `Optional`-bearing mapping
   *         function to the value of this `Optional`, if a value is
   *         present, otherwise an empty `Optional`
   */
  flatMap<U>(mapper: (value: T) => U): U | Optional<T> {
    const value = mapper(this.value);

    if (!this.isPresent() || this.isTypeInvalid(value)) {
      return Optional.empty();
    }

    return value;
  }

  private isTypeInvalid<T>(value: Undefinable<T>): boolean {
    const valueType = String(value) as JavascriptRepresentation;
    const isInvalidType = this.invalidTypes.has(valueType);
    const isNotWhiteListed = !this.allowedInvalidTypes.has(valueType);

    return isInvalidType && isNotWhiteListed;
  }
}
