# jaolinq
just an other linq for JS

## Usage

First, initialize a linqrator object:

```javascript
var array = [1,2,3];
var arrayLinq = linq.linqrator(array);
```

Second use it like you would use LINQ in C#:

```javascript
var newArray = arrayLinq
                .where(i => {return i>=2;})
                .select(i => {return i*2;})
                .toArray();
// result: [4,6]                
```

The iteration happens when toArray() is called, not a second before.

## Linqrator API

Its a fluent one. Easy to chain operations after each other, then execute it when you need the result.

**Operations:**
* where: filters the source
* select: transforms the source
* joinArray: join source with an array
* joinLinqrator: join source with an other linqrator
* concatArray: concatenate with an array
* concatLinqrator: concatenate with an other linqrator

The above operations will not iterate the source.

**Executions:**
* toArray: iterates the linqrator into an array
* any: true if any item matches
* all: true if all items match
* contains: true if item is in the linqrator
* firstOrDefault: return the first matching item, null if no item matches
* count: counts the matching items

These will iterate the source.

### Samples

Coming soon ...
