This is a small JavaScript library I made from scratch to sort HTML tables by clicking on the table headings.

You can use it by including it in the global scope of a page and then initiating it on a `table` element with something like this:

```js
SortableTable.init(document.getElementById('sortable-table'));
```

To run tests, open `index.html` in a browser.