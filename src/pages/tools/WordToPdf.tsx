import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, CheckCircle } from "lucide-react";
import { convertWordToPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const WordToPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
          selectedFile.type === 'application/msword' ||
          selectedFile.name.endsWith('.doc') || 
          selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
        toast.success("Word document loaded successfully");
      } else {
        toast.error("Please select a valid Word document (.doc or .docx)");
      }
    }
  };

  const convertFile = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const pdfBytes = await convertWordToPdf(file);
      const filename = file.name.replace(/\.(doc|docx)$/i, '.pdf');
      downloadPDF(pdfBytes, filename);
      toast.success("Word document converted to PDF successfully!");
    } catch (error) {
      toast.error("Failed to convert Word to PDF. Please try again.");
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
            <FileText className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Word to PDF Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert your Word documents to PDF format quickly and easily. Our tool supports DOC and DOCX files with perfect formatting preservation.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Word Document to Convert</CardTitle>
            <CardDescription>
              Select a Word document (.doc or .docx) to convert to PDF format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select Word document to convert</p>
                  <p className="text-muted-foreground">Choose a .doc or .docx file from your device</p>
                </div>
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Word File
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
                    {converting ? "Converting to PDF..." : "Convert to PDF"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use Word to PDF Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload Document</h3>
                <p className="text-sm text-muted-foreground">
                  Select your Word document (.doc or .docx) by clicking "Select Word File" or drag and drop it into the upload area.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Convert</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Convert to PDF" and our tool will process your Word document and convert it to PDF format.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download your converted PDF file instantly. The formatting and layout will be preserved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our Word to PDF Converter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Format Preservation</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintains original formatting, fonts, images, and layout structure from your Word document.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Multiple Formats</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports both .doc and .docx file formats for maximum compatibility.
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
              <h3 className="font-semibold mb-2">What Word formats are supported?</h3>
              <p className="text-muted-foreground">
                We support both .doc (Microsoft Word 97-2003) and .docx (Microsoft Word 2007+) file formats.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will the formatting be preserved?</h3>
              <p className="text-muted-foreground">
                Yes, our converter maintains the original formatting, fonts, images, and layout structure from your Word document.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
              <p className="text-muted-foreground">
                No, there are no file size limits. You can convert Word documents of any size to PDF format.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WordToPdf;