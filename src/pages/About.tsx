import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">About PDFNest</Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Making PDF Tools <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Accessible to Everyone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PDFNest was created with a simple mission: to provide powerful, professional-grade PDF tools that are completely free and work directly in your browser.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We believe that everyone should have access to professional PDF tools without barriers. Whether you're a student, professional, or business owner, 
              our comprehensive suite of PDF tools is designed to help you work more efficiently. No downloads, no subscriptions, no hidden fees – just powerful 
              tools that work when you need them.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Speed & Efficiency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our tools are optimized for speed, processing your files quickly and efficiently without compromising quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                All processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>User-Centric Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Every tool is designed with simplicity and usability in mind, making complex PDF operations accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <span>Quality Focus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                We're committed to providing high-quality results that maintain the integrity of your original documents.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              PDFNest was born from frustration with expensive PDF software and online tools that required uploads to unknown servers. 
              Our team of developers and designers came together to create a solution that puts user privacy and accessibility first.
            </p>
            <p className="text-muted-foreground">
              Using cutting-edge web technologies, we've built a comprehensive suite of PDF tools that run entirely in your browser. 
              This means faster processing, better security, and no need to worry about file size limits or monthly subscriptions.
            </p>
            <p className="text-muted-foreground">
              Today, PDFNest serves thousands of users worldwide, from students working on assignments to businesses processing important documents. 
              We're proud to offer a service that's not only free but also respects your privacy and delivers professional results.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose PDFNest?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">10+ Professional PDF Tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Completely Free Forever</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">No Registration Required</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Works Offline</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Mobile Friendly</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Open Source Technology</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;