import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileImage, Download, CheckCircle, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { convertJpgToPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const JpgToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} JPG file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < files.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const convertFiles = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one JPG file");
      return;
    }

    setConverting(true);
    try {
      const pdfBytes = await convertJpgToPdf(files);
      const filename = `converted-${Date.now()}.pdf`;
      downloadPDF(pdfBytes, filename);
      toast.success("JPG images converted to PDF successfully!");
    } catch (error) {
      toast.error("Failed to convert JPG to PDF. Please try again.");
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
            <FileImage className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">JPG to PDF Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert JPG images to PDF documents. Combine multiple images into one PDF file with our easy-to-use converter.
          </p>
        </div>

        {/* Tool Interface */}
          <Card className="mb-8">
            <CardHeader>
            <CardTitle>Upload JPG Images to Convert</CardTitle>
              <CardDescription>
              Select one or multiple JPG images and arrange them in your desired order
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select JPG images to convert</p>
                  <p className="text-muted-foreground">Choose one or multiple JPG files from your device</p>
                </div>
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select JPG Files
                  </label>
                </Button>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Images to convert ({files.length})</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <FileImage className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(index, 'down')}
                            disabled={index === files.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={convertFiles}
                    disabled={converting || files.length === 0}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {converting ? "Converting to PDF..." : `Convert ${files.length} Images to PDF`}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use JPG to PDF Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload Images</h3>
                <p className="text-sm text-muted-foreground">
                  Select one or multiple JPG images by clicking "Select JPG Files" or drag and drop them into the upload area.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Arrange Order</h3>
                <p className="text-sm text-muted-foreground">
                  Use the up/down arrows to arrange your images in the desired order before converting to PDF.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Convert & Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Convert Images to PDF" and download your PDF document with all images combined.
                </p>
              </div>
              </div>
            </CardContent>
          </Card>

        {/* Features */}
        <Card className="mb-8">
              <CardHeader>
            <CardTitle>Why Choose Our JPG to PDF Converter?</CardTitle>
              </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Multiple Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert single or multiple JPG images into one PDF document seamlessly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">High Quality Output</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintains original image quality and resolution in the PDF output.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Easy Reordering</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or use arrows to arrange images in your preferred order.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert multiple images to PDF quickly with our optimized processing engine.
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
              <h3 className="font-semibold mb-2">What image formats are supported?</h3>
              <p className="text-muted-foreground">
                We support JPG and JPEG image formats. You can upload multiple images at once.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will the image quality be preserved?</h3>
              <p className="text-muted-foreground">
                Yes, our converter maintains the original quality and resolution of your images in the PDF output.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I change the order of images?</h3>
              <p className="text-muted-foreground">
                Yes, you can easily reorder images using the up/down arrow buttons before converting to PDF.
              </p>
            </div>
              </CardContent>
            </Card>
      </div>
    </Layout>
  );
};

export default JpgToPdf;