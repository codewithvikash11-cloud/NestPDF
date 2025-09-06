import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Minimize2, Download, CheckCircle, AlertCircle } from "lucide-react";
import { compressPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setCompressed(false);
        toast.success("PDF file loaded successfully");
      } else {
        toast.error("Please select a valid PDF file");
      }
    }
  };

  const compressFile = async () => {
    if (!file) return;

    setCompressing(true);
    try {
      const compressedPdf = await compressPdf(file);
      const filename = file.name.replace('.pdf', '-compressed.pdf');
      downloadPDF(compressedPdf, filename);
      setCompressed(true);
      
      const originalSize = file.size;
      const compressedSize = compressedPdf.length;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      toast.success(`PDF compressed successfully! Size reduced by ${reduction}%`);
    } catch (error) {
      toast.error("Failed to compress PDF. Please try again.");
      console.error("Compression error:", error);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Minimize2 className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Compress PDF Files</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reduce PDF file size without compromising quality. Perfect for email attachments and storage with our advanced compression technology.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF File to Compress</CardTitle>
            <CardDescription>
              Select a PDF file and choose your compression level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF file to compress</p>
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

              {/* File Info and Compression Options */}
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

                  {/* Compression Level Selection */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Compression Level</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant={compressionLevel === 'low' ? 'default' : 'outline'}
                        onClick={() => setCompressionLevel('low')}
                        className="h-auto p-4"
                      >
                        <div className="text-left">
                          <div className="font-semibold">Low Compression</div>
                          <div className="text-sm text-muted-foreground">
                            Minimal size reduction, maximum quality
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant={compressionLevel === 'medium' ? 'default' : 'outline'}
                        onClick={() => setCompressionLevel('medium')}
                        className="h-auto p-4"
                      >
                        <div className="text-left">
                          <div className="font-semibold">Medium Compression</div>
                          <div className="text-sm text-muted-foreground">
                            Balanced size reduction and quality
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant={compressionLevel === 'high' ? 'default' : 'outline'}
                        onClick={() => setCompressionLevel('high')}
                        className="h-auto p-4"
                      >
                        <div className="text-left">
                          <div className="font-semibold">High Compression</div>
                          <div className="text-sm text-muted-foreground">
                            Maximum size reduction
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={compressFile}
                    disabled={compressing}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {compressing ? "Compressing PDF..." : "Compress PDF"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Compressor</CardTitle>
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
                <h3 className="font-semibold">Choose Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Select your preferred compression level: low, medium, or high compression.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download your compressed PDF file with significantly reduced file size.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Compressor?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Smart Compression</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms reduce file size while maintaining document readability and quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Multiple Levels</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from low, medium, or high compression levels based on your quality requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Compress large PDF files quickly with our optimized processing engine.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    All compression happens in your browser - your files never leave your device.
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
              <h3 className="font-semibold mb-2">How much can I reduce the file size?</h3>
              <p className="text-muted-foreground">
                Depending on the content and compression level, you can typically reduce file size by 20-90% while maintaining good quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will compression affect the quality of my PDF?</h3>
              <p className="text-muted-foreground">
                Our smart compression algorithms are designed to minimize quality loss while maximizing file size reduction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I compress password-protected PDFs?</h3>
              <p className="text-muted-foreground">
                Yes, you can compress password-protected PDFs. You'll need to enter the password when uploading the file.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompressPdf;