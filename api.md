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

## linqrator.joinArray

Joins an array to the linqrator using a callback function to determine which items should be joined. This operation transform the items in the source to an array. If it is already an array this will push new items into that. Each new join will increase the size of this array. This array contains the joined elements from each source, in the order of how they applied.

### Syntax

```javascript
var linqrator = linqrator.joinArray(array, callback)
```

### Parameter

#### *array*

A javascript array to join to.

#### *callback*

A callback function which gives the joining condition. It has two parameters, first is an item from the source, second is and item from the array to join. Must return a boolean value.

### Returns

The same linqrator object.
