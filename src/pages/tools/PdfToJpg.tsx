import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, Download, CheckCircle } from "lucide-react";
import { convertPdfToJpg, downloadFile } from "@/lib/pdf-utils";
import { toast } from "sonner";
import JSZip from "jszip";

const PdfToJpg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        toast.success("PDF file loaded successfully");
      } else {
        toast.error("Please select a valid PDF file");
      }
    }
  };

  const convertFile = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const jpgBlobs = await convertPdfToJpg(file);
      
      if (jpgBlobs.length === 1) {
        // Single image - download directly
        downloadFile(jpgBlobs[0], `${file.name.replace('.pdf', '')}.jpg`);
      } else {
        // Multiple images - create ZIP file
        const zip = new JSZip();
        
        jpgBlobs.forEach((blob, index) => {
          zip.file(`page-${index + 1}.jpg`, blob);
        });
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.replace('.pdf', '')}-converted.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      toast.success(`PDF converted to ${jpgBlobs.length} JPG image(s) successfully!`);
    } catch (error) {
      toast.error("Failed to convert PDF to JPG. Please try again.");
      console.error("Conversion error:", error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">PDF to JPG Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert PDF pages to high-quality JPG images. Perfect for presentations and web use with our easy-to-use converter.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF File to Convert</CardTitle>
            <CardDescription>
              Select a PDF file to convert its pages to JPG images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF file to convert</p>
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
                          Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={convertFile}
                    disabled={converting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {converting ? "Converting to JPG..." : "Convert to JPG Images"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF to JPG Converter</CardTitle>
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
                <h3 className="font-semibold">Convert</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Convert to JPG Images" and our tool will process your PDF and convert each page to a JPG image.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download individual JPG files or a ZIP archive containing all converted images.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF to JPG Converter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">High Quality Output</h3>
                  <p className="text-sm text-muted-foreground">
                    Converts PDF pages to high-quality JPG images suitable for presentations and web use.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">ZIP Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Download all converted images as individual JPG files in a convenient ZIP archive.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">All Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert all pages in your PDF document to JPG images with a single operation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert PDF pages to JPG images quickly with our optimized processing engine.
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
              <h3 className="font-semibold mb-2">What image quality will I get?</h3>
              <p className="text-muted-foreground">
                Our converter produces high-quality JPG images that maintain the visual fidelity of your original PDF pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I convert specific pages only?</h3>
              <p className="text-muted-foreground">
                Currently, our tool converts all pages in the PDF. For specific pages, you can split the PDF first, then convert the desired pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How are multiple images delivered?</h3>
              <p className="text-muted-foreground">
                Multiple images are packaged in a ZIP file for easy download and organization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PdfToJpg;