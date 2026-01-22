import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  reportData = [
    {
      id: 1,
      name: 'Product A',
      category: 'Electronics',
      sales: 1500,
      region: 'North',
    },
    {
      id: 2,
      name: 'Product B',
      category: 'Accessories',
      sales: 300,
      region: 'South',
    },
    {
      id: 3,
      name: 'Product C',
      category: 'Electronics',
      sales: 1200,
      region: 'East',
    },
    {
      id: 4,
      name: 'Product D',
      category: 'Clothing',
      sales: 700,
      region: 'West',
    },
    {
      id: 5,
      name: 'Product E',
      category: 'Accessories',
      sales: 250,
      region: 'North',
    },
    {
      id: 6,
      name: 'Product F',
      category: 'Electronics',
      sales: 1800,
      region: 'South',
    },
    {
      id: 7,
      name: 'Product G',
      category: 'Clothing',
      sales: 500,
      region: 'East',
    },
    {
      id: 8,
      name: 'Product H',
      category: 'Clothing',
      sales: 600,
      region: 'West',
    },
  ];

  exportPdf() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // --- Header Section ---
    // Background banner for header
    doc.setFillColor(63, 81, 181); // Primary Blue
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Monthly Sales Report', 14, 20);

    // Subtitle / Date
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.text(`Generated on: ${date}`, 14, 30);

    // Company "Logo" (Text for now)
    doc.setFontSize(16);
    doc.text('ACME Corp', pageWidth - 14, 20, { align: 'right' });
    doc.setFontSize(10);
    doc.text('Confidential', pageWidth - 14, 30, { align: 'right' });

    // --- Content Section ---
    // Summary Text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(
      'This report summarizes the sales performance across different regions and product categories.',
      14,
      50,
    );

    // Table
    const head = [['ID', 'Product Name', 'Category', 'Region', 'Sales ($)']];
    const data = this.reportData.map((product) => [
      product.id,
      product.name,
      product.category,
      product.region,
      product.sales.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }), // Format currency
    ]);

    autoTable(doc, {
      head: head,
      body: data,
      startY: 55,
      theme: 'striped', // Grid is good, but stripped is often cleaner
      headStyles: {
        fillColor: [63, 81, 181], // Match header banner
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 20 }, // ID
        4: { halign: 'right' }, // Sales right aligned
      },
      alternateRowStyles: {
        fillColor: [240, 240, 255],
      },
      margin: { top: 55 },
      didDrawPage: (data) => {
        // --- Footer Section ---
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150);

        // Page Number
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(
          'Page ' + String(data.pageNumber),
          data.settings.margin.left,
          pageHeight - 10,
        );

        // Footer Note
        const text = 'Strictly Confidential - For Internal Use Only';
        const textWidth = doc.getTextWidth(text);
        doc.text(text, pageWidth - 14 - textWidth, pageHeight - 10);
      },
    });

    // --- Summary Section (Below Table) ---
    // Calculate final Y position after table
    // @ts-ignore
    let finalY = doc.lastAutoTable.finalY || 60;

    // Total Sales Calculation
    const totalSales = this.reportData.reduce(
      (acc, curr) => acc + curr.sales,
      0,
    );
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Total Sales: ${totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
      14,
      finalY + 15,
    );

    // Save
    doc.save('monthly-sales-report.pdf');
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.reportData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'monthly-sales-report');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION,
      );
    });
  }
}
