import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Combine } from "lucide-react";

const MergePdf = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Merge PDF Files</h1>
          <p className="text-muted-foreground text-center mb-8">
            Combine multiple PDF files into one single document. Arrange pages in any order you want.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload PDF Files
              </CardTitle>
              <CardDescription>
                Select multiple PDF files to merge together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Combine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Choose PDF files to merge
                </p>
                <Button>Select PDF Files</Button>
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
                  <p>Upload multiple PDF files</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                  <p>Arrange files in desired order</p>
                </div>
                <div className="flex gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                  <p>Download your merged PDF</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>✓ Merge unlimited PDF files</p>
                <p>✓ Drag and drop to reorder</p>
                <p>✓ Fast processing</p>
                <p>✓ Maintains quality</p>
                <p>✓ Secure and private</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MergePdf;