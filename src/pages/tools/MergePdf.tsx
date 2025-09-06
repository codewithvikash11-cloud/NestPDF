import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Combine, Download, Trash2, ArrowUp, ArrowDown, CheckCircle } from "lucide-react";
import { mergePdfs, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const MergePdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} PDF file(s) added`);
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

  const mergeFiles = async () => {
    if (files.length < 2) {
      toast.error("Please select at least 2 PDF files to merge");
      return;
    }

    setMerging(true);
    try {
      const mergedPdf = await mergePdfs(files);
      const filename = `merged-${Date.now()}.pdf`;
      downloadPDF(mergedPdf, filename);
      setMerged(true);
      toast.success("PDFs merged successfully!");
    } catch (error) {
      toast.error("Failed to merge PDFs. Please try again.");
      console.error("Merge error:", error);
    } finally {
      setMerging(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Combine className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Merge PDF Files</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combine multiple PDF files into one single document. Arrange pages in any order you want with our easy-to-use merge tool.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF Files to Merge</CardTitle>
            <CardDescription>
              Select multiple PDF files and arrange them in your desired order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF files to merge</p>
                  <p className="text-muted-foreground">Choose multiple PDF files from your device</p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select PDF Files
                  </label>
                </Button>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Files to merge ({files.length})</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
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
                    onClick={mergeFiles}
                    disabled={merging || files.length < 2}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {merging ? "Merging PDFs..." : `Merge ${files.length} PDF Files`}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Merger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload PDFs</h3>
                <p className="text-sm text-muted-foreground">
                  Select multiple PDF files by clicking "Select PDF Files" or drag and drop them into the upload area.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Arrange Order</h3>
                <p className="text-sm text-muted-foreground">
                  Use the up/down arrows to arrange your PDF files in the desired order before merging.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Merge & Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Merge PDF Files" and download your combined PDF document instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Merger?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Unlimited Files</h3>
                  <p className="text-sm text-muted-foreground">
                    Merge as many PDF files as you need without any limitations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Drag & Drop Reorder</h3>
                  <p className="text-sm text-muted-foreground">
                    Easily reorder your PDF files using intuitive controls.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Merge your PDFs quickly with our optimized processing engine.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing happens in your browser - your files never leave your device.
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
              <h3 className="font-semibold mb-2">How many PDF files can I merge at once?</h3>
              <p className="text-muted-foreground">
                You can merge unlimited PDF files at once. There are no restrictions on the number of files or pages.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will the quality of my PDFs be affected?</h3>
              <p className="text-muted-foreground">
                No, our merger preserves the original quality of all your PDF files without any compression or quality loss.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I reorder the pages after uploading?</h3>
              <p className="text-muted-foreground">
                Yes, you can easily reorder your PDF files using the up/down arrow buttons before merging.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MergePdf;