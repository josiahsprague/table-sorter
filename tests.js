QUnit.module('SortableTable');

function setupFixture(id) {
  var table = document.getElementById(id);
  document.getElementById('qunit-fixture').appendChild(table.cloneNode(true));
  return table;
}

function click(el) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // LOL
  el.dispatchEvent(evt);
}

function dumpTable(table) {
  return [].map.call(table.querySelectorAll('tbody tr'), function(tr) {
    return [].map.call(tr.querySelectorAll('td'), function(td) {
      return td.textContent;
    })
  });
}

//Load the test table into QUnit
var table = setupFixture('sortable-table');
SortableTable.init(table);

test('reading table data', function() {
  deepEqual(dumpTable(table), 	
[
  [
    "Tale of Two Cities",
    "Charles Dickens",
    "1859",
    "932",
    "B84gaw935"
  ],
  [
    "Antes de ser libres",
    "Julia Alvarez",
    "2004",
    "871",
    "bE09rtc42"
  ],
  [
    "Stranger in a Strange Land",
    "Robert Heinlein",
    "1961",
    "712",
    "0s9q39Da3"
  ],
  [
    "Design Is a Job",
    "Mike Monteiro",
    "2012",
    "124",
    "afSAdsw30"
  ],
  [
    "Orthodoxy",
    "GK Chesterton",
    "1908",
    "452",
    "gfs933g3K"
  ]
], 'The table data should be correctly converted into the array');
});

test('basic sorting', function() {
  click(table.querySelectorAll('th')[0]);
  deepEqual(dumpTable(table), 	
[
  [
    "Antes de ser libres",
    "Julia Alvarez",
    "2004",
    "871",
    "bE09rtc42"
  ],
  [
    "Design Is a Job",
    "Mike Monteiro",
    "2012",
    "124",
    "afSAdsw30"
  ],
  [
    "Orthodoxy",
    "GK Chesterton",
    "1908",
    "452",
    "gfs933g3K"
  ],
  [
    "Stranger in a Strange Land",
    "Robert Heinlein",
    "1961",
    "712",
    "0s9q39Da3"
  ],
  [
    "Tale of Two Cities",
    "Charles Dickens",
    "1859",
    "932",
    "B84gaw935"
  ]
], 'The table should be sorted by column 1 in ascending order');

  click(table.querySelectorAll('th')[0]);
  deepEqual(dumpTable(table), [
  [
    "Tale of Two Cities",
    "Charles Dickens",
    "1859",
    "932",
    "B84gaw935"
  ],
  [
    "Stranger in a Strange Land",
    "Robert Heinlein",
    "1961",
    "712",
    "0s9q39Da3"
  ],
  [
    "Orthodoxy",
    "GK Chesterton",
    "1908",
    "452",
    "gfs933g3K"
  ],
  [
    "Design Is a Job",
    "Mike Monteiro",
    "2012",
    "124",
    "afSAdsw30"
  ],
  [
    "Antes de ser libres",
    "Julia Alvarez",
    "2004",
    "871",
    "bE09rtc42"
  ]
], 'The table should be sorted by column 1 in descending order');
});