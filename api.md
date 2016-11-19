# API Documentation

## linq.linqrator

### Syntax

```javascript
var linqrator = linq.linqrator(array);
```

### Parameter

A javascipt array.

### Returns

A new linqrator object.

## linqrator.where

### Syntax

```javascript
var linqrator = linqrator.where(callback)
```

### Parameter

A callback function which tests the current item. Must return a boolean value.

### Returns

The same linqrator object.

## linqrator.select

### Syntax

```javascript
var linqrator = linqrator.select(callback)
```

### Parameter

A callback function which transforms each item in the source.

### Returns

The same linqrator object.

## linqrator.concatArray

### Syntax

```javascript
var linqrator = linqrator.concatArray(array)
```

### Parameter

An array to concatenate to the source.

### Returns

The same linqrator object.

## linqrator.concatLinqrator

### Syntax

```javascript
var linqrator = linqrator.concatLinqrator(otherLinqrator)
```

### Parameter

A linqrator to concatenate to the source.

### Returns

The same linqrator object.
