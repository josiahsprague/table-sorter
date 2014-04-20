var SortableTable = {

  //Initialize
  init: function (element) {
    this.table = element;
    this.header = this.table.getElementsByTagName('thead')[0];
    this.columnIndex = -1;
    this.readTableData(this.table);
    this.userInteraction();
  },

  //Convert the table into an array
  readTableData: function (table) {
    var rowLength, cellLength, columnHeaders, tableData, rowCellLength, tableRow, rowData, i, j;
    rowLength = table.rows.length;
    rowLength = rowLength--;
    console.log("Rows:", rowLength);
    cellLength = table.rows[0].cells.length;
    columnHeaders = [];
    tableData = [];
    for (i = 0; i < cellLength; i++) {
      columnHeaders[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }
    for (i = 0; i < rowLength; i++) {
      tableRow = table.rows[i];
      rowCellLength = tableRow.cells.length;
      rowData = {};
      for (j = 0; j < rowCellLength; j++) {
        rowData[columnHeaders[j]] = tableRow.cells[j].innerHTML;
      }
      tableData.push(rowData);
    }
    return tableData;
  },

  //Control what happens when user interacts
  userInteraction: function () {
    var tableHeaders, sortDirection, i, j;
    this.header.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === 'th') {
        tableHeaders = e.target.parentNode.children;
        SortableTable.activeHeader = e.target;
        SortableTable.columnIndex = Array.prototype.indexOf.call(tableHeaders, e.target);

        if (SortableTable.columnIndex == SortableTable.table.getAttribute('data-sortedindex')) {
          if (SortableTable.table.getAttribute('data-sortdirection') == 'asc') {
            SortableTable.table.setAttribute('data-sortdirection', 'desc');
          } else { SortableTable.table.setAttribute('data-sortdirection', 'asc'); }
        } else { SortableTable.table.setAttribute('data-sortdirection', 'asc'); }

        for (j = 0; j < tableHeaders.length; j++) {
          tableHeaders[j].className = '';
        }
        SortableTable.activeHeader.className = 'active';

          sortDirection = SortableTable.table.getAttribute('data-sortdirection');
          SortableTable.rowSort(sortDirection);
          SortableTable.table.setAttribute('data-sortedindex', SortableTable.columnIndex);
      }
    }, false);
  },

  //Sort the table array in memory
  rowSort: function (direction) {
    var newRows, cellIndex, rowParent, i;
    newRows = [];
    cellIndex = 0;

    for (i = 1; i < this.table.rows.length; i++) {
      rowParent = this.table.rows[i].parentNode.tagName.toLowerCase();
      if (rowParent === 'tbody') {
        newRows[cellIndex] = this.table.rows[i];
        newRows[cellIndex].initialIndex = cellIndex;
        cellIndex++;
      }
    }

    if (newRows.length === 0) { return; }
    newRows.sort(this.rowCompare);

    if (direction === 'desc') {
      newRows.reverse();
    }

    this.updateTable(this.table, newRows);
  },

  //Compare rows based on current columnIndex
  rowCompare: function (a, b) {
    var rowA, rowB;
    rowA = a.cells[SortableTable.columnIndex].innerHTML.toLowerCase();
    rowB = b.cells[SortableTable.columnIndex].innerHTML.toLowerCase();
    if (rowA === rowB) { return 0; }
    if (rowA < rowB) { return -1; }
    return 1;
  },

  //Replace the table rows with the rows from the table array
  updateTable: function (table, newRows) {
    var i;
    for (i = 0; i < newRows.length; i++) {
      table.tBodies[0].appendChild(newRows[i]);
    }
  }

};