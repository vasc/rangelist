# RangeList

Implements list of ranges data sctructure to represent a non contiguous integer range.

Allows building a non contiguous range by adding and removing contiguous ranges
iteratively.

## Example

```js
const { RangeList } = require('./lib/RangeList')

const rl = new RangeList()
rl.add([1, 5]);
rl.print();
// [1, 5)

rl.add([10, 20]);
rl.print();
// [1, 5) [10, 20)

rl.remove([3, 12]);
rl.print();
// [1, 3) [12, 20)
```

Check the [implementation](lib/RangeList.js) for method documentation and the
[test file](test/rangeList.test.js) for more usage examples.

