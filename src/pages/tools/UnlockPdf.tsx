import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Unlock, Download, CheckCircle, AlertCircle } from "lucide-react";
import { unlockPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const UnlockPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);

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

  const unlockFile = async () => {
    if (!file || !password) {
      toast.error("Please select a PDF file and enter the password");
      return;
    }

    setUnlocking(true);
    try {
      const unlockedPdf = await unlockPdf(file, password);
      const filename = file.name.replace('.pdf', '-unlocked.pdf');
      downloadPDF(unlockedPdf, filename);
      toast.success("PDF unlocked successfully!");
    } catch (error) {
      toast.error("Failed to unlock PDF. Please check the password and try again.");
      console.error("Unlock error:", error);
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Unlock className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Unlock PDF Files</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Remove password protection from your PDF files. Unlock password-protected PDFs instantly with our secure tool.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Protected PDF File</CardTitle>
            <CardDescription>
              Select a password-protected PDF file and enter the password to unlock it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select protected PDF file</p>
                  <p className="text-muted-foreground">Choose a password-protected PDF file from your device</p>
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

              {/* File Info and Password */}
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

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password">PDF Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter the PDF password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={unlockFile}
                    disabled={unlocking || !password}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {unlocking ? "Unlocking PDF..." : "Unlock PDF"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Unlocker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Select your password-protected PDF file by clicking "Select PDF File" or drag and drop it into the upload area.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Enter Password</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the password for your PDF file in the password field provided.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Unlock PDF" and download your unlocked PDF file without password protection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Unlocker?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Secure Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing happens locally in your browser - your files and passwords never leave your device.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">All PDF Versions</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports unlocking PDFs from all versions and password protection methods.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Maintains Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserves original document quality and formatting after removing password protection.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock password-protected PDFs quickly with our optimized processing engine.
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
              <h3 className="font-semibold mb-2">Is it safe to unlock PDFs?</h3>
              <p className="text-muted-foreground">
                Yes, our tool processes files locally in your browser. Your files and passwords never leave your device, ensuring maximum security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I don't know the password?</h3>
              <p className="text-muted-foreground">
                You need to know the password to unlock the PDF. Our tool cannot crack passwords - it only removes protection when the correct password is provided.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will unlocking affect the PDF quality?</h3>
              <p className="text-muted-foreground">
                No, unlocking only removes the password protection. The document content, formatting, and quality remain exactly the same.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UnlockPdf;