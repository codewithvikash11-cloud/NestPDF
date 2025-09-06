import { PDFDocument, PDFPage } from 'pdf-lib';
import jsPDF from 'jspdf';

// Utility functions for PDF operations

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  downloadFile(blob, filename);
};

// PDF to Word conversion (simplified - creates a text file)
export const convertPdfToWord = async (file: File): Promise<Blob> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  let textContent = '';
  for (let i = 0; i < pages.length; i++) {
    textContent += `Page ${i + 1}:\n`;
    // Note: pdf-lib doesn't extract text directly, this is a simplified version
    // In a real implementation, you'd use pdf-parse or similar
    textContent += '[Text content would be extracted here]\n\n';
  }
  
  return new Blob([textContent], { type: 'text/plain' });
};

// Word to PDF conversion
export const convertWordToPdf = async (file: File): Promise<Uint8Array> => {
  // This is a simplified implementation
  // In a real app, you'd use mammoth.js or similar to parse Word docs
  const text = await file.text();
  
  const pdf = new jsPDF();
  const lines = pdf.splitTextToSize(text, 180);
  pdf.text(lines, 10, 10);
  
  return pdf.output('arraybuffer') as Uint8Array;
};

// Merge PDFs
export const mergePdfs = async (files: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
};

// Split PDF
export const splitPdf = async (file: File): Promise<Uint8Array[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();
  
  const splitPdfs: Uint8Array[] = [];
  
  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    splitPdfs.push(await newPdf.save());
  }
  
  return splitPdfs;
};

// Compress PDF (simplified - just returns original for now)
export const compressPdf = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // In a real implementation, you'd apply compression techniques
  // For now, we'll just return the original
  return await pdfDoc.save();
};

// PDF to JPG conversion
export const convertPdfToJpg = async (file: File): Promise<Blob[]> => {
  // This is a simplified implementation
  // In a real app, you'd use pdf2pic or similar
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Create a placeholder image
  canvas.width = 800;
  canvas.height = 600;
  
  if (ctx) {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PDF Page Preview', canvas.width / 2, canvas.height / 2);
  }
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob ? [blob] : []);
    }, 'image/jpeg', 0.8);
  });
};

// JPG to PDF conversion
export const convertJpgToPdf = async (files: File[]): Promise<Uint8Array> => {
  const pdf = new jsPDF();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imgData = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
    
    if (i > 0) pdf.addPage();
    
    const img = new Image();
    img.src = imgData;
    
    await new Promise<void>((resolve) => {
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, finalWidth, finalHeight);
        resolve();
      };
    });
  }
  
  return pdf.output('arraybuffer') as Uint8Array;
};

// Unlock PDF (remove password)
export const unlockPdf = async (file: File, password: string): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
    
    // If we can load it with the password, it's unlocked
    return await pdfDoc.save();
  } catch (error) {
    throw new Error('Invalid password or file is not password protected');
  }
};

// Protect PDF (add password)
export const protectPdf = async (file: File, password: string): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Note: pdf-lib doesn't support password protection directly
  // In a real implementation, you'd use a different library
  // For now, we'll return the original PDF
  return await pdfDoc.save();
};

// Rotate PDF pages
export const rotatePdf = async (file: File, rotation: number): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  pages.forEach((page) => {
    page.setRotation(page.getRotation().angle + rotation);
  });
  
  return await pdfDoc.save();
};
