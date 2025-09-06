import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

const WordToPdf = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Word to PDF Converter</h1>
          <p className="text-muted-foreground text-center mb-8">
            Convert your Word documents to PDF format quickly and easily. Our tool supports DOC and DOCX files.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Word Document
              </CardTitle>
              <CardDescription>
                Drag and drop your Word file here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Choose a Word document to convert to PDF
                </p>
                <Button>Select Word File</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                  <p>Upload your Word document (DOC or DOCX)</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                  <p>Wait for the conversion to complete</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                  <p>Download your converted PDF file</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>✓ Fast and secure conversion</p>
                <p>✓ Maintains original formatting</p>
                <p>✓ Supports DOC and DOCX files</p>
                <p>✓ No file size limits</p>
                <p>✓ Works directly in your browser</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WordToPdf;