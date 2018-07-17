import { NullValueException, Optional } from '../index';

describe('Optional', () => {
  it('should create a new Optional from a source value', () => {
    const optional = Optional.of('str');
    expect(optional.toString()).toEqual('Optional[str]');
  });

  it('should throw an error if the value is null', () => {
    expect(() => Optional.of(null)).toThrow(new NullValueException());
  });

  it('should not throw an error if the value is null', () => {
    expect(() => Optional.ofNullable(null)).not.toThrow();
  });

  describe('.isPresent', () => {
    it('should be true, if has a value', () => {
      const optional = Optional.of('any');
      expect(optional.isPresent()).toBeTruthy();
    });

    it('should be false, if value is null', () => {
      const optional = Optional.ofNullable(null);
      expect(optional.isPresent()).toBeFalsy();
    });
  });

  describe('.ifPresent', () => {
    it('should accept & execute an action if value is present', () => {
      const optional = Optional.of(5);
      let result = 0;
      optional.ifPresent(num => result = num * 2);
      expect(result).toBe(10);
    });

    it('should accept & execute an action if value is present', () => {
      const optional = Optional.ofNullable(null);
      let result = 0;
      optional.ifPresent(num => result = num * 2);
      expect(result).toBe(0);
    });
  });

  describe('.ifPresentOrElse', () => {
    it('should accept & execute an action if value is present', () => {
      const optional = Optional.of(5);
      let result = 0;
      optional.ifPresentOrElse(num => result = num * 2, () => {});
      expect(result).toBe(10);
    });

    it('should execute an empty action', () => {
      const optional = Optional.ofNullable(null);
      let result = 0;
      optional.ifPresentOrElse(() => {}, () => result++);
      expect(result).toBe(1);
    });
  });

  describe('.orElse', () => {
    it('should return a default value', () => {
      const optional = Optional.ofNullable(null).orElse('str');
      expect(optional.toString()).toEqual('str');
    });

    it('should return original value if not null', () => {
      const optional = Optional.ofNullable('str').orElse(null);
      expect(optional.toString()).toEqual('str');
    });
  });

  describe('.orElseGet', () => {
    it('should get a default if value is null', () => {
      const optional = Optional.ofNullable(null).orElseGet(() => 'str');
      expect(optional.toString()).toEqual('str');
    });

    it('should return the actual value if not null', () => {
      const optional = Optional.ofNullable('str').orElseGet(() => null);
      expect(optional.toString()).toEqual('str');
    });
  });

  describe('.orElseThrow', () => {
    const error = new Error('expected');

    it('should throw the configured error if null', () => {
      expect(() => Optional.ofNullable(null).orElseThrow(error))
          .toThrow(error);
    });

    it('should return the Optional if value is not null', () => {
      const value = Optional.ofNullable('str').orElseThrow(error);
      expect(value).toEqual('str');
    });
  });

  describe('.get', () => {
    it('should return the value', () => {
      const optional = Optional.of('str');
      expect(optional.get()).toEqual('str');
    });

    it('should throw NullValueException if value is null', () => {
      const optional = Optional.ofNullable(null);
      expect(() => optional.get()).toThrow(new NullValueException());
    });
  });

  describe('.empty', () => {
    it('should create an empty Optional', () => {
      const empty = Optional.empty();
      expect(empty.toString()).toEqual('Optional.empty');
    });
  });

  describe('.filter', () => {
    it('should return the Optional if the predicate evaluates to true', () => {
      const value = 'str';
      const optional = Optional.of(value);
      expect(optional.filter(v => v === value)).toBeTruthy();
    });

    it('should return an empty Optional if the predicate is falsey', () => {
      const optional = Optional.of('str');
      expect(optional.filter(v => v !== 'str')).toEqual(Optional.empty());
    });
  });

  describe('.map', () => {
    it('should transform the Optional value', () => {
      const optional = Optional.of('5').map(v => parseInt(v));
      expect(optional.get()).toEqual(5);
    });

    it('should return an empty Optional if value is null', () => {
      const optional = Optional.ofNullable(null).map(() => 'str');
      expect(optional).toEqual(Optional.empty());
    });

    it('should return an empty Optional if mapper result is null', () => {
      const optional = Optional.of('str').map(() => null);
      expect(optional).toEqual(Optional.empty());
    });
  });

  describe('.flatMap', () => {
    it('should return the value without wrapping as Optional', () => {
      const optional = Optional.of('str');
      expect(optional.flatMap(v => v)).toEqual('str');
    });

    it('should return Optional.empty() if value is null', () => {
      const optional = Optional.ofNullable(null);
      expect(optional.flatMap(v => v)).toEqual(Optional.empty());
    });
  });
});