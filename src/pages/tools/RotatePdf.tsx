import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, RotateCw, Download, CheckCircle, RotateCcw } from "lucide-react";
import { rotatePdf, downloadPDF } from "@/lib/pdf-utils";
import { toast } from "sonner";

const RotatePdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotating, setRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState<90 | 180 | 270>(90);

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

  const rotateFile = async () => {
    if (!file) return;

    setRotating(true);
    try {
      const rotatedPdf = await rotatePdf(file, rotationAngle);
      const filename = file.name.replace('.pdf', `-rotated-${rotationAngle}.pdf`);
      downloadPDF(rotatedPdf, filename);
      toast.success(`PDF rotated by ${rotationAngle}° successfully!`);
    } catch (error) {
      toast.error("Failed to rotate PDF. Please try again.");
      console.error("Rotation error:", error);
    } finally {
      setRotating(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <RotateCw className="h-8 w-8 text-primary" />
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Rotate PDF Pages</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rotate PDF pages to the correct orientation. Fix upside-down or sideways pages easily with our rotation tool.
          </p>
        </div>

        {/* Tool Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload PDF File to Rotate</CardTitle>
            <CardDescription>
              Select a PDF file and choose the rotation angle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Select PDF file to rotate</p>
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

              {/* File Info and Rotation Options */}
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

                  {/* Rotation Angle Selection */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Rotation Angle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant={rotationAngle === 90 ? 'default' : 'outline'}
                        onClick={() => setRotationAngle(90)}
                        className="h-auto p-4"
                      >
                        <div className="text-center">
                          <RotateCw className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-semibold">90° Clockwise</div>
                          <div className="text-sm text-muted-foreground">
                            Quarter turn right
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant={rotationAngle === 180 ? 'default' : 'outline'}
                        onClick={() => setRotationAngle(180)}
                        className="h-auto p-4"
                      >
                        <div className="text-center">
                          <RotateCw className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-semibold">180°</div>
                          <div className="text-sm text-muted-foreground">
                            Half turn (upside down)
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant={rotationAngle === 270 ? 'default' : 'outline'}
                        onClick={() => setRotationAngle(270)}
                        className="h-auto p-4"
                      >
                        <div className="text-center">
                          <RotateCcw className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-semibold">90° Counter-clockwise</div>
                          <div className="text-sm text-muted-foreground">
                            Quarter turn left
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={rotateFile}
                    disabled={rotating}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    {rotating ? "Rotating PDF..." : `Rotate PDF by ${rotationAngle}°`}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use PDF Rotator</CardTitle>
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
                <h3 className="font-semibold">Choose Angle</h3>
                <p className="text-sm text-muted-foreground">
                  Select the rotation angle: 90° clockwise, 180°, or 90° counter-clockwise.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Rotate PDF" and download your corrected PDF with properly oriented pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Rotator?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Multiple Angles</h3>
                  <p className="text-sm text-muted-foreground">
                    Rotate pages by 90°, 180°, or 270° to fix any orientation issues.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">All Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    Rotate all pages in your PDF document with a single operation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Maintains Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserves original image quality and text clarity after rotation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Rotate PDF pages quickly with our optimized processing engine.
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
              <h3 className="font-semibold mb-2">Can I rotate individual pages?</h3>
              <p className="text-muted-foreground">
                Currently, our tool rotates all pages in the PDF. For individual page rotation, you can split the PDF first, rotate specific pages, then merge them back.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will rotation affect the quality?</h3>
              <p className="text-muted-foreground">
                No, our rotation tool maintains the original quality of your PDF content without any degradation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What rotation angles are available?</h3>
              <p className="text-muted-foreground">
                You can rotate pages by 90° clockwise, 180° (upside down), or 90° counter-clockwise to fix any orientation issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RotatePdf;