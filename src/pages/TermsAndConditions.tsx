import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertTriangle, Shield } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">Terms & Conditions</Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Terms of <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using PDFNest services.
          </p>
        </div>

        {/* Last Updated */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Terms and Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">
              These Terms and Conditions ("Terms") govern your use of PDFNest ("we", "our", or "us") website and services. 
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-blue-500" />
              <span>Acceptance of Terms</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              By accessing and using PDFNest, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-muted-foreground text-sm">
              These Terms apply to all visitors, users, and others who access or use the service.
            </p>
          </CardContent>
        </Card>

        {/* Description of Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">PDF Tools</h3>
              <p className="text-muted-foreground text-sm">
                PDFNest provides a suite of PDF manipulation tools including conversion, merging, splitting, compression, 
                rotation, and protection features. All tools operate locally in your browser.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Free Service</h3>
              <p className="text-muted-foreground text-sm">
                Our services are provided free of charge. We reserve the right to modify or discontinue the service 
                (or any part thereof) temporarily or permanently with or without notice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Registration Required</h3>
              <p className="text-muted-foreground text-sm">
                You may use our services without creating an account or providing personal information. 
                However, some features may require basic information for functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>User Responsibilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Lawful Use</h3>
              <p className="text-muted-foreground text-sm">
                You agree to use our services only for lawful purposes and in accordance with these Terms. 
                You will not use the service for any illegal or unauthorized purpose.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">File Content</h3>
              <p className="text-muted-foreground text-sm">
                You are responsible for ensuring that any files you process through our tools do not contain 
                copyrighted material that you do not have permission to use, or any illegal content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prohibited Activities</h3>
              <p className="text-muted-foreground text-sm">
                You may not use our services to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm ml-4 mt-2 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or viruses</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for commercial purposes without permission</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Privacy and Data Handling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Local Processing</h3>
              <p className="text-muted-foreground text-sm">
                All file processing occurs locally in your browser. We do not upload, store, or have access to your files. 
                This ensures maximum privacy and security for your documents.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Data Collection</h3>
              <p className="text-muted-foreground text-sm">
                We do not collect personal information unless you voluntarily provide it through our contact forms. 
                Any information provided is used solely to respond to your inquiries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cookies</h3>
              <p className="text-muted-foreground text-sm">
                We may use cookies to enhance your experience and maintain your preferences. 
                You can disable cookies in your browser settings if you prefer.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Disclaimers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Service Availability</h3>
              <p className="text-muted-foreground text-sm">
                We strive to maintain high service availability, but we do not guarantee uninterrupted access. 
                The service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">File Processing</h3>
              <p className="text-muted-foreground text-sm">
                While we strive for accuracy, we cannot guarantee that all file conversions or manipulations will be perfect. 
                Complex documents may not convert exactly as expected. Always verify results before relying on them.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Browser Compatibility</h3>
              <p className="text-muted-foreground text-sm">
                Our tools are designed to work with modern browsers. Some features may not be available in older browsers. 
                We recommend using the latest version of Chrome, Firefox, Safari, or Edge.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">No Warranty</h3>
              <p className="text-muted-foreground text-sm">
                Our services are provided "as is" without any warranties, express or implied. We disclaim all warranties 
                including merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Limitation of Damages</h3>
              <p className="text-muted-foreground text-sm">
                In no event shall PDFNest be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, or use, arising out of or relating to your use of our services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Maximum Liability</h3>
              <p className="text-muted-foreground text-sm">
                Our total liability to you for all claims arising from or relating to these Terms or our services 
                shall not exceed the amount you paid us (if any) for the services in the twelve months preceding the claim.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Our Rights</h3>
              <p className="text-muted-foreground text-sm">
                PDFNest and its original content, features, and functionality are owned by us and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-muted-foreground text-sm">
                You retain all rights to your files and content. We do not claim ownership of any files you process through our tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Open Source</h3>
              <p className="text-muted-foreground text-sm">
                Our tools are built using open-source libraries. We respect the licenses of these libraries and contribute back to the community when possible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Termination by You</h3>
              <p className="text-muted-foreground text-sm">
                You may stop using our services at any time. Since no account is required, simply discontinue use of the website.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Termination by Us</h3>
              <p className="text-muted-foreground text-sm">
                We may terminate or suspend your access to our services immediately, without prior notice, 
                for any reason, including if you breach these Terms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Effect of Termination</h3>
              <p className="text-muted-foreground text-sm">
                Upon termination, your right to use the service will cease immediately. The provisions of these Terms 
                that by their nature should survive termination shall survive termination.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our 
              services after such modifications constitutes acceptance of the updated Terms.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which PDFNest operates, 
              without regard to its conflict of law provisions. Any disputes arising from these Terms or our services 
              shall be resolved in the courts of competent jurisdiction in that area.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> legal@pdfnest.com
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

export default TermsAndConditions;
