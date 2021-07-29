# RangeList

Implements list of ranges data structure to represent a non contiguous range of numbers. 
This can be helpful to represent things like multiple time slots with a break in between or continuous spaces 
that get progressively occupied leaving openings in the middle.

This library allows you to manipulate ranges iteratively gettings consistent results, which can be tricky to do by hand.

## Example

```js
const { 
  addRange, 
  removeRange,  
  format
} = require('./lib/RangeList')

const emptyRange = [];
const oneToFive = addRange(emptyRange, [1, 5]);
// [[1, 5]]

const threeToFive = removeRange(oneToFive, [1, 3]);
// [[3, 5]]

const multipleSegments = addRange(threeToFive, [1, 2]);
// [[1, 2], [3, 5]]

format(multipleSegments);
// [1, 2) [3, 5)
```

Check the [implementation](lib/) for method documentation and the
[test file](test/rangeList.test.js) for more usage examples.

