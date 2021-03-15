import * as XLSX from 'xlsx'; 
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'; 

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx'; 

@Injectable({
    providedIn: 'root'
  })
export default class ExcelService {  

    public exportExcel(json: any[], excelFileName: string): void {  
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
        const workbook: XLSX.WorkBook = { Sheets: { 'Issue Details': worksheet }, SheetNames: ['Issue Details'] };  
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
        this.saveAsExcelFile(excelBuffer, excelFileName);  
      }  
      private saveAsExcelFile(buffer: any, fileName: string): void {  
         const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});  
         FileSaver.saveAs(data, 'sonarqube_reports_for_' + fileName + '_' + new  Date().getTime() + EXCEL_EXTENSION);  
      } 
}