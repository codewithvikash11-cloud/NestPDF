import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Privacy</span> Matters
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information and files.
          </p>
        </div>

        {/* Last Updated */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Privacy Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">
              This Privacy Policy describes how PDFNest ("we", "our", or "us") collects, uses, and protects your information when you use our website and services.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-500" />
              <span>Information We Collect</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Files You Upload</h3>
              <p className="text-muted-foreground text-sm">
                When you use our PDF tools, you may upload files for processing. <strong>Important:</strong> All file processing happens locally in your browser. 
                Your files are never uploaded to our servers or stored on our systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Information</h3>
              <p className="text-muted-foreground text-sm">
                We may collect anonymous usage statistics such as which tools are used most frequently, browser type, and general geographic location 
                (country level only) to improve our services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground text-sm">
                If you contact us through our contact form, we may collect your name, email address, and message content to respond to your inquiry.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <span>How We Use Your Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service Provision</h3>
              <p className="text-muted-foreground text-sm">
                To provide and maintain our PDF tools and services, ensuring they work properly and efficiently.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Improvement</h3>
              <p className="text-muted-foreground text-sm">
                To analyze usage patterns and improve our tools, user interface, and overall user experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p className="text-muted-foreground text-sm">
                To respond to your inquiries, provide customer support, and communicate important updates about our services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal Compliance</h3>
              <p className="text-muted-foreground text-sm">
                To comply with applicable laws, regulations, and legal processes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-red-500" />
              <span>Data Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Local Processing</h3>
              <p className="text-muted-foreground text-sm">
                All PDF processing happens locally in your browser using client-side JavaScript libraries. Your files never leave your device, 
                ensuring maximum security and privacy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No File Storage</h3>
              <p className="text-muted-foreground text-sm">
                We do not store, save, or retain any files you process through our tools. Once you close your browser tab, all file data is cleared.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Secure Communication</h3>
              <p className="text-muted-foreground text-sm">
                Our website uses HTTPS encryption to protect any data transmitted between your browser and our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground text-sm">
                We may use essential cookies to maintain your preferences (such as dark mode) and ensure the website functions properly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground text-sm">
                We may use anonymous analytics to understand how our website is used and to improve our services. This data is aggregated and cannot identify individual users.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Third-Party Tracking</h3>
              <p className="text-muted-foreground text-sm">
                We do not use third-party tracking services or share your data with advertising networks.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Access and Control</h3>
              <p className="text-muted-foreground text-sm">
                Since we don't store your personal data or files, there's no personal information to access or delete. Your files remain entirely under your control.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Opt-Out</h3>
              <p className="text-muted-foreground text-sm">
                You can disable cookies in your browser settings if you prefer not to have any tracking. This may affect some website functionality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-muted-foreground text-sm">
                If you have any questions about this Privacy Policy or our data practices, please contact us through our contact form.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Privacy Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> privacy@pdfnest.com
              </p>
              <p className="text-sm">
                <strong>Contact Form:</strong> <a href="/contact" className="text-primary hover:underline">Visit our contact page</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
