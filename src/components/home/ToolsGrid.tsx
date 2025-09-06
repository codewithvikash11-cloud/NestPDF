import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Merge, 
  Split, 
  Minimize2, 
  Image, 
  Camera, 
  Unlock, 
  Shield, 
  RotateCw 
} from "lucide-react";

const tools = [
  {
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word files instantly",
    icon: FileText,
    href: "/pdf-to-word",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Word to PDF",
    description: "Transform Word documents into PDF format",
    icon: Download,
    href: "/word-to-pdf",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into a single document",
    icon: Merge,
    href: "/merge-pdf",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Split PDF",
    description: "Split large PDF files into smaller, manageable parts",
    icon: Split,
    href: "/split-pdf",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    icon: Minimize2,
    href: "/compress-pdf",
    color: "from-red-500 to-red-600"
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages to high-quality JPG images",
    icon: Image,
    href: "/pdf-to-jpg",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "JPG to PDF",
    description: "Convert JPG images into PDF documents",
    icon: Camera,
    href: "/jpg-to-pdf",
    color: "from-pink-500 to-pink-600"
  },
  {
    title: "Unlock PDF",
    description: "Remove passwords and restrictions from PDF files",
    icon: Unlock,
    href: "/unlock-pdf",
    color: "from-teal-500 to-teal-600"
  },
  {
    title: "Protect PDF",
    description: "Add password protection to your PDF documents",
    icon: Shield,
    href: "/protect-pdf",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Rotate PDF",
    description: "Rotate PDF pages to the correct orientation",
    icon: RotateCw,
    href: "/rotate-pdf",
    color: "from-cyan-500 to-cyan-600"
  }
];

const ToolsGrid = () => {
  return (
    <section id="tools" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PDF Tool</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade PDF tools that work directly in your browser. No downloads, no registration, completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.title} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20"
              >
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  >
                    <Link to={tool.href}>
                      Use Tool
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;