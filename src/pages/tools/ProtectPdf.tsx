import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Lock, Download, CheckCircle, AlertCircle } from "lucide-react";
import { protectPdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const ProtectPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [protecting, setProtecting] = useState(false);

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

  const protectFile = async () => {
    if (!file || !password) {
      toast.error("Please select a PDF file and enter a password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setProtecting(true);
    try {
      const protectedPdf = await protectPdf(file, password);
      const filename = file.name.replace('.pdf', '-protected.pdf');
      downloadPDF(protectedPdf, filename);
      toast.success("PDF protected successfully!");
    } catch (error) {
      toast.error("Failed to protect PDF. Please try again.");
      console.error("Protection error:", error);
    } finally {
      setProtecting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Protect PDF Files</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add password protection to your PDF documents. Secure your files with encryption using our easy-to-use protection tool.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF File to Protect</CardTitle>
            <CardDescription>
              Select a PDF file and set a password to protect it from unauthorized access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF file to protect</p>
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

                  {/* Password Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter a secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={protectFile}
                    disabled={protecting || !password || !confirmPassword}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {protecting ? "Protecting PDF..." : "Protect PDF"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Protector</CardTitle>
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
                <h3 className="font-semibold">Set Password</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a secure password and confirm it to protect your PDF from unauthorized access.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Protect PDF" and download your password-protected PDF file.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Protector?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Strong Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Uses industry-standard encryption to secure your PDF files with password protection.
                  </p>
                </div>
              </div>
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
                  <h3 className="font-semibold">Password Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensures password strength and confirmation to prevent accidental lockouts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Maintains Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserves original document quality and formatting while adding security.
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
              <h3 className="font-semibold mb-2">How secure is the password protection?</h3>
              <p className="text-muted-foreground">
                Our tool uses industry-standard encryption to protect your PDF files. Choose a strong password for maximum security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I forget the password?</h3>
              <p className="text-muted-foreground">
                Make sure to remember your password! If you forget it, you'll need to use our PDF unlocker tool with the correct password.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I protect PDFs that are already password-protected?</h3>
              <p className="text-muted-foreground">
                Yes, you can add additional password protection to already protected PDFs, but you'll need the original password first.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProtectPdf;