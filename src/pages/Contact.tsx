import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, HelpCircle, Bug } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4">Contact Us</Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or need help? We'd love to hear from you. Our team is here to assist you with any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Send us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your question or feedback..."
                  rows={6}
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-muted-foreground text-sm">
                    For general inquiries and support
                  </p>
                  <a href="mailto:support@pdfnest.com" className="text-primary hover:underline">
                    support@pdfnest.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <span>Common Inquiries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">Technical Support</h4>
                  <p className="text-xs text-muted-foreground">Issues with tools or conversion problems</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">Feature Requests</h4>
                  <p className="text-xs text-muted-foreground">Suggestions for new tools or improvements</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">Business Partnerships</h4>
                  <p className="text-xs text-muted-foreground">Collaboration and integration opportunities</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm">Privacy & Security</h4>
                  <p className="text-xs text-muted-foreground">Questions about data handling and privacy</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-5 w-5 text-primary" />
                  <span>Report a Bug</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Found a bug or experiencing issues? Help us improve by reporting it.
                </p>
                <Button variant="outline" className="w-full">
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Is PDFNest really free?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, PDFNest is completely free to use. All our tools are available without any charges, subscriptions, or hidden fees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How secure are my files?</h3>
              <p className="text-muted-foreground text-sm">
                Your files are processed locally in your browser and never uploaded to our servers. This ensures maximum security and privacy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
              <p className="text-muted-foreground text-sm">
                No registration or account creation is required. You can use all our tools immediately without providing any personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What file formats do you support?</h3>
              <p className="text-muted-foreground text-sm">
                We support standard PDF files and common formats like Word documents, JPG images, and more depending on the specific tool.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;