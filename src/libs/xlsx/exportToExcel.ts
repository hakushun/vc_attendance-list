import * as XLSX from 'xlsx';

export const exportToExcel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  const target = e.currentTarget.closest('table');
  if (!target) return;
  if (window.confirm('エクセルをダウンロードしますか？')) {
    const workbook = XLSX.utils.table_to_book(target);
    XLSX.writeFile(workbook, '出欠表.xlsx');
  }
};
