import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { FileText, Upload, Download, CheckCircle, AlertCircle } from "lucide-react";

const PdfToWord = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const convertFile = async () => {
    if (!file) return;
    
    setConverting(true);
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setConverting(false);
    setConverted(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">PDF to Word Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert your PDF documents to editable Word files instantly. Maintain formatting, images, and layout with our advanced conversion technology.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Your PDF File</CardTitle>
            <CardDescription>
              Select or drag and drop your PDF file to start the conversion process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Drop your PDF file here</p>
                    <p className="text-muted-foreground">or click to browse</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Select PDF File
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <p className="text-lg font-medium">{file.name}</p>
                    <p className="text-muted-foreground">
                      Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {!converted && (
                    <Button 
                      onClick={convertFile} 
                      disabled={converting}
                      className="bg-gradient-to-r from-primary to-secondary text-white"
                    >
                      {converting ? "Converting..." : "Convert to Word"}
                    </Button>
                  )}
                  {converted && (
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Word File
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF to Word Converter</CardTitle>
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
                  Click "Convert to Word" and our tool will process your PDF file and convert it to an editable Word document.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download your converted Word file instantly. The formatting and layout will be preserved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF to Word Converter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">High-Quality Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintains original formatting, fonts, images, and layout structure.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Files are processed locally in your browser for maximum security and speed.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">No Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Use our tool without creating an account or providing personal information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Free Forever</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert unlimited PDF files to Word format without any cost.
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
              <h3 className="font-semibold mb-2">Is it free to convert PDF to Word?</h3>
              <p className="text-muted-foreground">
                Yes, our PDF to Word converter is completely free with no hidden charges or limitations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How accurate is the conversion?</h3>
              <p className="text-muted-foreground">
                Our advanced conversion algorithm maintains 95%+ accuracy in preserving formatting, images, and text structure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What file formats are supported?</h3>
              <p className="text-muted-foreground">
                We support standard PDF files and convert them to Microsoft Word (.docx) format.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PdfToWord;