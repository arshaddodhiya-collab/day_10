import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as QRCode from 'qrcode';
import jsPDF from 'jspdf';

interface QRCodeInfo {
  title: string;
  description: string;
  details: string[];
}

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {
  @ViewChild('qrCanvasRef', { static: true })
  qrCanvasRef!: ElementRef<HTMLCanvasElement>;

  qrCodeData: string = 'https://angular.io';

  qrCodeInfo: QRCodeInfo[] = [
    {
      title: 'What is QR Code?',
      description:
        'QR Code stands for Quick Response Code. It is a two-dimensional barcode that can be scanned using a smartphone camera or a QR code reader.',
      details: [
        'Invented in 1994 by Denso Wave in Japan',
        'QR stands for "Quick Response"',
        'Can store up to 4,296 characters',
        'Works in any orientation',
      ],
    },
    {
      title: 'How QR Codes Work',
      description:
        'QR codes use a grid pattern of black and white squares arranged in a specific pattern. The pattern is recognized and decoded by scanning devices.',
      details: [
        'Position markers in three corners help orient the scanner',
        'Timing patterns guide the scanner through the code',
        'Uses Reed-Solomon error correction',
        'Can be scanned from any angle',
      ],
    },
    {
      title: 'Applications of QR Codes',
      description: 'QR codes are widely used across industries.',
      details: [
        'Marketing campaigns',
        'Event ticketing',
        'Digital payments',
        'Inventory tracking',
        'Restaurant menus',
      ],
    },
  ];

  ngOnInit(): void {
    this.generateQRCode(this.qrCodeData);
  }

  generateQRCode(data: string): void {
    this.qrCodeData = data;

    QRCode.toCanvas(
      this.qrCanvasRef.nativeElement,
      data,
      {
        errorCorrectionLevel: 'H',
        width: 300,
        margin: 1,
      },
      (error: Error | null | undefined) => {
        if (error) {
          console.error('QR Code generation failed:', error);
        }
      },
    );
  }

  downloadQRCode(): void {
    const canvas = this.qrCanvasRef.nativeElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
  }

  exportToPDF(): void {
    const canvas = this.qrCanvasRef.nativeElement;
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    let y = margin;

    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('QR Code Report', margin, y);
    y += 10;

    // QR Image
    pdf.addImage(imgData, 'PNG', (pageWidth - 100) / 2, y, 100, 100);
    y += 110;

    // Data text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Data: ${this.qrCodeData}`, margin, y);
    y += 10;

    // Info sections
    this.qrCodeInfo.forEach((info) => {
      if (y > pageHeight - margin - 30) {
        pdf.addPage();
        y = margin;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(info.title, margin, y);
      y += 7;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      const descriptionLines = pdf.splitTextToSize(
        info.description,
        contentWidth,
      );
      pdf.text(descriptionLines, margin, y);
      y += descriptionLines.length * 4 + 2;

      info.details.forEach((detail) => {
        if (y > pageHeight - margin - 10) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(`• ${detail}`, margin + 5, y);
        y += 5;
      });

      y += 4;
    });

    pdf.save('qrcode-report.pdf');
  }
}
