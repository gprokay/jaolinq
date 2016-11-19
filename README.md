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

```javascript
    var persons = [
        { id: 1, name: 'john', gender: 'male' },
        { id: 2, name: 'carl', gender: 'male' },
        { id: 3, name: 'kate', gender: 'female' },
        { id: 4, name: 'judy', gender: 'female' }];

    //Simple filtering
    var males = linq.linqrator(persons)
        .where(p => { return p.gender === 'male' })
        .toArray();
    
    //Filter then select
    var femaleNames = linq.linqrator(persons)
        .where(p => { return p.gender === 'female' })
        .select(p => { return p.name })
        .toArray();

    //Count
    var count = linq.linqrator(persons)
        .count(p => { return p.name === 'john'; );
    
    var marriedMap = [
        { husbandId: 1, wifeId: 3 },
        { husbandId: 2, wifeId: 4 }];
    
    //Join by a matching map
    var marriedCouples = linq.linqrator(persons)
        .joinArray(marriedMap, (person, map) => { return person.id === map.wifeId })
        .joinArray(persons, (left, person) => { return left[1].husbandId === person.id })
        .select(couple => { return { wife: couple[0], husband: couple[2] } })
        .toArray();
```
