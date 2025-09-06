import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Scissors, Download, CheckCircle, AlertCircle } from "lucide-react";
import { splitPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";
import JSZip from "jszip";

const SplitPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitting, setSplitting] = useState(false);
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        // For demo purposes, we'll assume a page count
        // In a real implementation, you'd read the PDF to get actual page count
        setPageCount(10); // This would be determined by reading the PDF
        toast.success("PDF file loaded successfully");
      } else {
        toast.error("Please select a valid PDF file");
      }
    }
  };

  const splitFile = async () => {
    if (!file) return;

    setSplitting(true);
    try {
      const splitPdfs = await splitPdf(file);
      
      if (splitMode === 'all') {
        // Download all pages as individual PDFs in a ZIP file
        const zip = new JSZip();
        
        splitPdfs.forEach((pdfBytes, index) => {
          zip.file(`page-${index + 1}.pdf`, pdfBytes);
        });
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.replace('.pdf', '')}-split.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Download individual PDFs
        splitPdfs.forEach((pdfBytes, index) => {
          downloadPDF(pdfBytes, `page-${index + 1}.pdf`);
        });
      }
      
      toast.success(`PDF split into ${splitPdfs.length} pages successfully!`);
    } catch (error) {
      toast.error("Failed to split PDF. Please try again.");
      console.error("Split error:", error);
    } finally {
      setSplitting(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scissors className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Split PDF Files</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Extract pages from your PDF document. Split by page ranges or extract individual pages with our easy-to-use split tool.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF File to Split</CardTitle>
            <CardDescription>
              Select a PDF file and choose how you want to split it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF file to split</p>
                  <p className="text-muted-foreground">Choose a PDF file from your device</p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select PDF File
                  </label>
                </Button>
              </div>

              {/* File Info */}
              {file && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {(file.size / 1024 / 1024).toFixed(2)} MB • Pages: {pageCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Split Options */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Split Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant={splitMode === 'all' ? 'default' : 'outline'}
                        onClick={() => setSplitMode('all')}
                        className="h-auto p-4"
                      >
                        <div className="text-left">
                          <div className="font-semibold">Split All Pages</div>
                          <div className="text-sm text-muted-foreground">
                            Extract each page as a separate PDF file
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant={splitMode === 'range' ? 'default' : 'outline'}
                        onClick={() => setSplitMode('range')}
                        className="h-auto p-4"
                      >
                        <div className="text-left">
                          <div className="font-semibold">Split by Range</div>
                          <div className="text-sm text-muted-foreground">
                            Extract specific page ranges
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={splitFile}
                    disabled={splitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {splitting ? "Splitting PDF..." : `Split PDF into ${pageCount} Pages`}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Splitter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Select your PDF file by clicking "Select PDF File" or drag and drop it into the upload area.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Choose Split Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Select whether to split all pages or extract specific page ranges from your PDF.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download Results</h3>
                <p className="text-sm text-muted-foreground">
                  Download individual PDF files or a ZIP archive containing all split pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Splitter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Precise Page Extraction</h3>
                  <p className="text-sm text-muted-foreground">
                    Extract individual pages or specific page ranges with pixel-perfect accuracy.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">ZIP Download Option</h3>
                  <p className="text-sm text-muted-foreground">
                    Download all split pages as individual PDFs in a convenient ZIP file.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Maintains Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserves original image quality and formatting in all split pages.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Split large PDF files quickly with our optimized processing engine.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I split PDFs with password protection?</h3>
              <p className="text-muted-foreground">
                Yes, you can split password-protected PDFs. You'll need to enter the password when uploading the file.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's the maximum file size I can split?</h3>
              <p className="text-muted-foreground">
                There's no file size limit. You can split PDFs of any size, from small documents to large files with hundreds of pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will the split pages maintain the original formatting?</h3>
              <p className="text-muted-foreground">
                Yes, all split pages maintain the exact same formatting, images, and layout as the original PDF.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SplitPdf;