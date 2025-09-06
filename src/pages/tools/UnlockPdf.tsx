import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Unlock } from "lucide-react";

const UnlockPdf = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Unlock PDF Files</h1>
          <p className="text-muted-foreground text-center mb-8">
            Remove password protection from your PDF files. Unlock password-protected PDFs instantly.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Protected PDF
              </CardTitle>
              <CardDescription>
                Select a password-protected PDF file to unlock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Unlock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Choose a protected PDF file to unlock
                </p>
                <Button>Select PDF File</Button>
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
                  <p>Upload your protected PDF file</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                  <p>Enter the PDF password</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                  <p>Download unlocked PDF</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>✓ Remove password protection</p>
                <p>✓ Support all PDF versions</p>
                <p>✓ Secure processing</p>
                <p>✓ Fast unlocking</p>
                <p>✓ Maintain document quality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnlockPdf;