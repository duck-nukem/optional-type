export class Optional<T> {
  private readonly value: T | null;

  constructor(value?: T | null, allowNull = false) {
    if (value === null && !allowNull) {
      throw new NullValueException();
    }

    this.value = value;
  }

  /**
   * Returns an {@code Optional} describing the given non-{@code null}
   * value.
   *
   * @param value the value to describe, which must be non-{@code null}
   * @param <T> the type of the value
   * @return an {@code Optional} with the value present
   * @throws NullValueException if value is {@code null}
   */
  static of<T>(value: T): Optional<T> {
    return new Optional(value);
  }

  /**
   * Returns an {@code Optional} describing the given value, if
   * non-{@code null}, otherwise returns an empty {@code Optional}.
   *
   * @param value the possibly-{@code null} value to describe
   * @param <T> the type of the value
   * @return an {@code Optional} with a present value if the specified value
   *         is non-{@code null}, otherwise an empty {@code Optional}
   */
  static ofNullable<T>(value: T | null): Optional<T> {
    return new Optional<T>(value, true);
  }

  /**
   * Returns an empty {@code Optional} instance.  No value is present for this
   * {@code Optional}.
   *
   * @apiNote
   * Though it may be tempting to do so, avoid testing if an object is empty
   * by comparing with {@code ==} against instances returned by
   * {@code Optional.empty()}.  There is no guarantee that it is a singleton.
   * Instead, use {@link isPresent()}.
   *
   * @param <T> The type of the non-existent value
   * @return an empty {@code Optional}
   */
  static empty<T>(): Optional<T> {
    return new Optional<T>();
  }

  /**
   * Returns a non-empty string representation of this {@code Optional}
   * suitable for debugging.  The exact presentation format is unspecified and
   * may vary between implementations and versions.
   *
   * @implSpec
   * If a value is present the result must include its string representation
   * in the result.  Empty and present {@code Optional}s must be unambiguously
   * differentiable.
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
   * If a value is present, returns {@code true}, otherwise {@code false}.
   *
   * @return {@code true} if a value is present, otherwise {@code false}
   */
  isPresent(): boolean {
    return this.value !== null;
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
   * @since 9
   */
  ifPresentOrElse(action: (value: T) => void, emptyAction: () => any): void {
    if (this.isPresent()) {
      action(this.value);
    } else {
      emptyAction();
    }
  }

  /**
   * If a value is present, returns the value, otherwise returns
   * {@code other}.
   *
   * @param other the value to be returned, if no value is present.
   *        May be {@code null}.
   * @return the value, if present, otherwise {@code other}
   */
  orElse(other: T | null): T {
    return this.isPresent() ? this.value : other;
  }

  /**
   * If a value is present, returns the value, otherwise returns the result
   * produced by the supplying function.
   *
   * @param supplier the supplying function that produces a value to be returned
   * @return the value, if present, otherwise the result produced by the
   *         supplying function
   * @throws NullPointerException if no value is present and the supplying
   *         function is {@code null}
   */
  orElseGet(supplier: () => T): T {
    return this.isPresent() ? this.value : supplier();
  }

  /**
   * If a value is present, returns the value, otherwise throws an exception
   *
   * @param <X> Type of the exception to be thrown
   * @param error the supplying function that produces an
   *        exception to be thrown
   * @return the value, if present
   * @throws X if no value is present
   */
  orElseThrow<X extends Error>(error: X): T | X {
    if (!this.value) {
      throw error;
    }

    return this.value;
  }

  /**
   * If a value is present, returns the value, otherwise throws
   * {@code NullValueException}.
   *
   * @deprecated this is counter intuitive for Optionals,
   * use {@link isPresent()} or {@link ifPresent()}
   * @return the non-{@code null} value described by this {@code Optional}
   * @throws NullValueException if no value is present
   * @see Optional#isPresent()
   */
  get(): T {
    if (!this.value) {
      throw new NullValueException();
    }

    return this.value;
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * returns an {@code Optional} describing the value, otherwise returns an
   * empty {@code Optional}.
   *
   * @param predicate the predicate to apply to a value, if present
   * @return an {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present and the value matches the
   *         given predicate, otherwise an empty {@code Optional}
   */
  filter(predicate: (value?: T) => boolean): Optional<T> {
    const result = predicate(this.value);

    return result && this.isPresent() ? this : Optional.empty();
  }


  /**
   * If a value is present, returns an {@code Optional} describing (as if by
   * {@link ofNullable}) the result of applying the given mapping function to
   * the value, otherwise returns an empty {@code Optional}.
   *
   * <p>If the mapping function returns a {@code null} result then this method
   * returns an empty {@code Optional}.
   *
   * @param mapper the mapping function to apply to a value, if present
   * @param <U> The type of the value returned from the mapping function
   * @return an {@code Optional} describing the result of applying a mapping
   *         function to the value of this {@code Optional}, if a value is
   *         present, otherwise an empty {@code Optional}
   */
  map<U>(mapper: (value?: T) => U): Optional<U> {
    const value = mapper(this.value);

    if (!this.isPresent() || value === null) {
      return Optional.empty();
    }

    return Optional.ofNullable(value);
  }
}

export class NullValueException extends Error {
  constructor() {
    super('Optional received a null value without configuration');
  }
}
