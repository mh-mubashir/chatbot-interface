import Image from "next/image";
import ChatbotWidgetClient from "../components/chatbot/ChatbotWidgetClient";
import OpenChatbotButton from "../components/OpenChatbotButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Northeastern University College of Engineering"
                width={300}
                height={90}
                className="h-16 w-auto transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-8">
            <span className="text-red-600 text-sm font-medium">24/7 Advising Resources</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            COE Advising Bot
            <span className="block text-red-600 text-4xl md:text-5xl mt-4">Resource Navigator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Get immediate answers to some of your academic advising questions anytime, day or night. 
            Our COE Advising Bot provides instant support for undergraduate and graduate students 
            navigating academic resources, policies, and procedures.
          </p>
          <div className="flex justify-center">
            <OpenChatbotButton />
          </div>
        </div>

        {/* What the Chatbot Is - Completely Revised */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Navigating the COE Advising Bot</h2>
            <div className="text-xl text-gray-600 max-w-4xl mx-auto space-y-6 text-left">
              <p>
                Our advising bot is designed to help you navigate the most common academic advising questions as a College of Engineering student. 
                Get answers to your questions anytime, anywhere. No waiting for office hours or scheduling appointments for common inquiries. 
                More personalized questions related to curriculum planning are best addressed by your academic advisor.
              </p>
              <p>
                To get started, click the bot icon located in the bottom left corner of your screen and select your student status 
                (undergraduate or graduate). Then follow the prompts to find the information you need. If you select the wrong option 
                or want to return to the main menu, click &ldquo;back&rdquo; or &ldquo;start over.&rdquo;
              </p>
              <p>
                <strong className="text-gray-900">The Future of Advising Support:</strong> This advising bot currently uses a guided navigation system 
                to help you find resources quickly. Behind the scenes, our department is actively developing a full AI-powered implementation 
                that will offer more conversational and intelligent interactions. This advanced system is currently in testing and will be 
                released soon to provide an even more enhanced advising experience.
              </p>
              <p>
                This bot is an internal pilot program developed by the College of Engineering through the vision of the College Dean, 
                in collaboration with both Graduate and Undergraduate Advising Offices. With students located around the globe, 
                we wanted to ensure 24/7 access to essential resources regardless of time zone.
              </p>
              <p>
                This is just one of many COE-specific resources available to support students in meeting their academic goals; 
                the bot is designed to address the most common questions students ask, but it is not meant to replace our 
                advising services - you can schedule a meeting with an academic advisor anytime for personalized guidance. 
                Our collective mission is to provide equitable access to advising support and enhance the overall college experience.
              </p>
              <p>
                This advising bot is in its initial development phase, and we welcome student feedback to improve its usability and content. 
                Students can submit feedback by visiting our feedback form.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Need More Help?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Still not finding what you are looking for? Contact your academic advisor or stop by the academic advising office for support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Undergraduate Academic Advising</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center">
                  <span className="text-red-600 mr-3">📍</span>
                  <span>Office: 147 Snell Engineering Center</span>
                </p>
                <p className="flex items-center">
                  <span className="text-red-600 mr-3">✉️</span>
                  <span>Email: coeadvising@northeastern.edu</span>
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Graduate Academic Advising</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center">
                  <span className="text-red-600 mr-3">📍</span>
                  <span>Office: 130 Snell Engineering Center</span>
                </p>
                <p className="flex items-center">
                  <span className="text-red-600 mr-3">✉️</span>
                  <span>Email: COE-gradadvising@northeastern.edu</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Where to Access It */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-12 mb-16 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <span className="mr-3">💬</span>
              Where to Access It
            </h2>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <Image src="/coe_logo.png" alt="COE Bot" width={80} height={80} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-2xl font-semibold mb-2">
                  Have a question? Find the COE Bot logo to start chatting!
                </p>
                <p className="text-red-100 text-lg">
                  Look for the COE Bot logo in the bottom-right corner of this page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback & Testing Links */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-12 mb-16 border-2 border-red-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full mb-6">
              <span className="text-xl mr-2">🎯</span>
              <span className="font-bold text-lg">Help Improve the Advising Bot</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">We Value Your Feedback</h2>
          <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Your input helps us continuously improve our service. 
            Students can submit feedback through our feedback form to help enhance the advising bot experience.
          </p>
          <div className="text-center">
            <a
              href="https://northeastern.sharepoint.com/sites/Polinapersonal/SitePages/Advising-Chatbot-Testing-Page.aspx?promotedState=0&source=FromAppBar&Mode=Edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-red-500"
            >
              <span className="mr-3">📝</span>
              Submit Feedback (SharePoint)
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600 text-lg">
            This project is a collaboration between the College of Engineering&apos;s 
            advising offices and internal development teams.
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidgetClient />
    </div>
  );
}
