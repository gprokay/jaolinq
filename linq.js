; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory()
        : typeof define === 'function' && define.amd
            ? define(factory)
            : global.linq = factory()
} (this, (function () {
    "use strict";

    function createIterator(array) {
        var currentIndex = 0;
        var length = array.length;

        function next() {
            return array[currentIndex++];
        }

        function hasMore() {
            return currentIndex < length;
        }

        function reset() {
            currentIndex = 0;
        }

        return {
            next: next,
            hasMore: hasMore,
            reset: reset
        }
    }

    function createWhereIterator(iterator, whereFunc) {
        var current;

        function next() {
            return current;
        }

        function hasMore() {
            while (iterator.hasMore()) {
                current = iterator.next();
                if (whereFunc(current)) {
                    return true;
                }
            }

            return false;
        }

        return {
            next: next,
            hasMore: hasMore,
            reset: iterator.reset
        };
    }

    function createSelectIterator(iterator, selector) {

        function next() {
            return selector(iterator.next());
        }

        return {
            next: next,
            hasMore: iterator.hasMore,
            reset: iterator.reset
        }
    }

    function createConcatenator(iteratorArray) {
        var currentIndex = 0;

        function hasMore() {
            var i = currentIndex;
            while (i < iteratorArray.length) {
                var current = iteratorArray[i];
                if (current.hasMore()) {
                    currentIndex = i;
                    return true;
                }

                i++;
            }

            return false;
        }

        function next() {
            return iteratorArray[currentIndex].next();
        }

        function reset() {
            currentIndex = 0;
            iteratorArray.forEach(function (iterator) {
                iterator.reset();
            });
        }

        return {
            next: next,
            hasMore: hasMore,
            reset: reset
        }
    }

    function createEmptyIterator() {
        function next() {
            return null;
        }

        function hasMore() {
            return false;
        }

        function reset() {
        }

        return {
            next: next,
            hasMore: hasMore,
            reset: reset
        }
    }

    function createJoinIterator(iteratorLeft, iteratorRight, joinFunc) {

        var current = createEmptyIterator();

        function next() {
            return current.next();
        }

        function hasMore() {
            if (current.hasMore()) {
                return true;
            }

            if (!iteratorLeft.hasMore()) {
                return false;
            }

            iteratorRight.reset();
            var left = iteratorLeft.next();
            var whereRight = createWhereIterator(iteratorRight, function (right) {
                return joinFunc(left, right);
            });

            current = createSelectIterator(whereRight, function (right) {
                var item;

                if (isArray(left)) {
                    item = left.map(function (l) { return l; });
                    item.push(right);
                } else {
                    item = [left, right];
                }

                return item;
            });

            return hasMore();
        }

        function reset() {
            iteratorLeft.reset();
            iteratorRight.reset();
            current = createEmptyIterator();
        }

        function isArray(item) {
            if (Object.prototype.toString.call(item) === '[object Array]') {
                return true;
            }

            return false;
        }

        return {
            next: next,
            hasMore: hasMore,
            reset: reset
        };
    }

    function linqrator(array) {
        var arrayIterator = createIterator(array);

        var module = {
            iterator: arrayIterator,
            where: where,
            select: select,
            any: any,
            all: all,
            firstOrDefault: firstOrDefault,
            toArray: toArray,
            contains: contains,
            concatArray: concatArray,
            concatLinqrator: concatLinqrator,
            count: count,
            forEach: forEach,
            joinArray: joinArray,
            joinLinqrator: joinLinqrator
        };

        function where(func) {
            module.iterator = createWhereIterator(module.iterator, func);
            return module;
        }

        function select(selector) {
            module.iterator = createSelectIterator(module.iterator, selector);
            return module;
        }

        function concatArray(array) {
            return concatIterator(createIterator(array));
        }

        function concatLinqrator(linqrator) {
            return concatIterator(linqrator.iterator);
        }

        function concatIterator(iterator) {
            module.iterator = createConcatenator([module.iterator, iterator]);
            return module;
        }

        function joinArray(array, joinFunc) {
            return joinIterator(createIterator(array), joinFunc);
        }

        function joinLinqrator(linqrator, joinFunc) {
            return joinIterator(linqrator.iterator, joinFunc);
        }

        function joinIterator(iterator, joinFunc) {
            module.iterator = createJoinIterator(module.iterator, iterator, joinFunc);
            return module;
        }

        function toArray() {
            var result = [];
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                result.push(module.iterator.next());
            }

            return result;
        }

        function any(func) {
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                var current = module.iterator.next();

                if (!func) {
                    return true;
                }

                if (func(current)) {
                    return true;
                }
            }

            return false;
        }

        function contains(item) {
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                if (item === module.iterator.next()) {
                    return true;
                }
            }

            return false;
        }

        function all(func) {
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                if (!func(module.iterator.next())) {
                    return false;
                }
            }

            return true;
        }

        function count(func) {
            var result = 0;

            module.iterator.reset();
            while (module.iterator.hasMore()) {
                if (func && func(module.iterator.next())) {
                    result++;
                }

                if (!func) {
                    result++;
                }
            }

            return result;
        }

        function firstOrDefault(func) {
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                var current = module.iterator.next();

                if (!func) {
                    return current;
                }

                if (func(current)) {
                    return current;
                }
            }

            return null;
        }

        function forEach(func) {
            module.iterator.reset();
            while (module.iterator.hasMore()) {
                func(module.iterator.next());
            }
        }

        return module;
    }

    return {
        linqrator: linqrator
    }

})));
