
export interface Luckysheet {
  ObjectbuildGridData: Function
  cancelFrozen: Function
  cancelRangeMerge: Function
  changLang: Function
  clearCell: Function
  clearRange: Function
  closeWebsocket: Function
  create: Function
  deleteCell: Function
  deleteColumn: Function
  deleteDataVerification: Function
  deleteImage: Function
  deleteRange: Function
  deleteRangeConditionalFormat: Function
  deleteRow: Function
  deleteRowOrColumn: Function
  destroy: Function
  enterEditMode: Function
  exitEditMode: Function
  find: Function
  flowdata: Function
  frozenColumnRange: Function
  frozenFirstColumn: Function
  frozenFirstRow: Function
  frozenRowRange: Function
  /**
   * 获取工作表所有配置
   */
  getAllSheets: Function
  getCellValue: Function
  getColumnWidth: Function
  getConfig: Function
  getDefaultColWidth: Function
  getDefaultRowHeight: Function
  getGridData: Function
  getImageOption: Function
  getLuckysheetfile: Function
  getRange: Function
  getRangeArray: Function
  getRangeAxis: Function
  getRangeBoolean: Function
  getRangeByTxt: Function
  getRangeDiagonal: Function
  getRangeHtml: Function
  getRangeJson: Function
  getRangeValue: Function
  getRangeValuesWithFlatte: Function
  getRangeWithFlatten: Function
  getRowHeight: Function
  getScreenshot: Function
  /**
   * 返回工作表的配置
   */
  getSheet: Function
  getSheetData: Function
  getTxtByRange: Function
  getWorkbookName: Function
  getcellvalue: Function
  getconfig: Function
  getdatabyselection: Function
  getluckysheet_select_save: Function
  getluckysheetfile: Function
  hideColumn: Function
  hideGridLines: Function
  hideRow: Function
  hideRowOrColumn: Function
  insertColumn: Function
  insertImage: Function
  insertRow: Function
  insertRowOrColumn: Function
  jfrefreshgrid: Function
  luckysheetrefreshgrid: Function
  matrixCalculation: Function
  matrixOperation: Function
  pagerInit: Function
  redo: Function
  refresh: Function
  refreshFormula: Function
  refreshMenuButtonFocus: Function
  replace: Function
  resize: Function
  scroll: Function
  selectHightlightShow: Function
  setBothFrozen: Function
  setCellFormat: Function
  /**
   * 设置单元格
   * @parms {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
   * @parms {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
   * @parms {Object | String | Number} [value]: 要设置的值；
   */
  setCellValue: Function
  setColumnWidth: Function
  setConfig: Function
  setDataVerification: Function
  setHorizontalFrozen: Function
  setRangeConditionalFormat: Function
  setRangeConditionalFormatDefault: Function
  setRangeFilter: Function
  setRangeFormat: Function
  setRangeMerge: Function
  setRangeShow: Function
  setRangeSort: Function
  setRangeSortMulti: Function
  setRangeValue: Function
  setRowHeight: Function
  setSheetActive: Function
  setSheetAdd: Function
  setSheetColor: Function
  setSheetCopy: Function
  setSheetDelete: Function
  setSheetHide: Function
  setSheetMove: Function
  setSheetName: Function
  setSheetOrder: Function
  setSheetShow: Function
  setSheetZoom: Function
  setSingleRangeFormat: Function
  setVerticalFrozen: Function
  setWorkbookName: Function
  setcellvalue: Function
  setluckysheet_select_save: Function
  sheetmanage: object
  showColumn: Function
  showGridLines: Function
  showRow: Function
  showRowOrColumn: Function
  toJson: Function
  transToCellData: Function
  transToData: Function
  undo: Function
}

// https://jsdoc.zcopy.site/
/**
 * 单元格样式
 */
export interface LuckyCellStyle {
  /**
   * 数据模板 
   * @see https://mengshukeji.github.io/LuckysheetDocs/zh/guide/cell.html
   */
  fa?: string,
  /**
   * 数据类型(auto->'g',string->'s',number->'n')
   */
  t?: string,
}
/**
 * 单元格数据
 */
export interface LuckyCellData {
  /**
   * 展示值
   */
  m: string | number,
  /**
   * 原始值
   */
  v: string | number,
  /**
   * 单元格样式
   * @type `{fa?: string|number, t?: string|number}`
   */
  ct?: LuckyCellStyle
}
/**
 * 单元格
 * @type `{c: number, r: number, v: string|number|object}`
 */
export interface LuckyCell {
  /**
   * 列坐标,从0开始
   */
  c: number,
  /**
   * 行坐标,从0开始
   */
  r: number,
  /**
   * 单元格数据
   * @type `{m: string|number, v: string|number, ct?: object}`
   */
  v: string | number | LuckyCellData
}