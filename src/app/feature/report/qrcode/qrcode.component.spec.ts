import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeComponent } from './qrcode.component';

describe('QrcodeComponent', () => {
  let component: QrcodeComponent;
  let fixture: ComponentFixture<QrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrcodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have QR code data', () => {
    expect(component.qrCodeData).toBeTruthy();
  });

  it('should have QR code info', () => {
    expect(component.qrCodeInfo.length).toBeGreaterThan(0);
  });

  it('should display QR code info with title and description', () => {
    const firstInfo = component.qrCodeInfo[0];
    expect(firstInfo.title).toBeTruthy();
    expect(firstInfo.description).toBeTruthy();
    expect(firstInfo.details.length).toBeGreaterThan(0);
  });

  it('should update QR code data on generateQRCode', () => {
    const testData = 'https://example.com';
    component.generateQRCode(testData);
    expect(component.qrCodeData).toBe(testData);
  });
});
