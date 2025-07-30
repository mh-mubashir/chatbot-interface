import Image from "next/image";
import ChatbotWidgetClient from "../components/chatbot/ChatbotWidgetClient";

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
            <span className="text-red-600 text-sm font-medium">AI-Powered Advising</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            COE AI Advising
            <span className="block text-red-600">Assistant</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Get instant answers to your academic advising questions, 24/7. 
            Our intelligent assistant helps both undergraduate and graduate students 
            with common academic queries.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Image src="/husky_logo.svg" alt="Husky Bot" width={32} height={32} className="w-8 h-8" />
              <span className="font-semibold text-lg">Find the Husky to Start Chatting</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="group">
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>24/7 support for all your advising questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Covers both undergraduate and graduate programs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Instant answers to routine questions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Advisors</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reduces repetitive workload for staff</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuously improved based on feedback</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Focus on complex, personalized queries</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What the Chatbot Is */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What the Chatbot Is</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent chatbot helps answer frequent advising questions for both 
              graduate and undergraduate students in the College of Engineering.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Assistance</h3>
              <p className="text-gray-600">
                Designed to reduce routine workload for advisors, allowing them to 
                focus on more complex, personalized queries while providing you with 
                immediate assistance.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Available</h3>
              <p className="text-gray-600">
                Get answers to your questions anytime, anywhere. No waiting for office hours 
                or scheduling appointments for common inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Who Developed It */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Who Developed It</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            This chatbot is an internal pilot project developed by the College of Engineering, 
            with input and representation from both Graduate and Undergraduate Advising Offices.
          </p>
          
          {/* Development Team */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <span className="text-red-600 mr-3">🎉</span>
              <span>Development Team</span>
              <span className="text-red-600 ml-3">🎉</span>
            </h3>
            <div className="text-center mb-8">
              <p className="text-gray-600 italic text-lg">Special thanks to our amazing team members who made this project possible</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-4">🌟</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Polina Starobinets</h4>
                    <p className="text-red-600 font-medium">Project Lead</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-4">✨</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Lindsay Werner</h4>
                    <p className="text-red-600 font-medium">Graduate Advising Office Lead</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-4">💫</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Krystal Ristaino</h4>
                    <p className="text-red-600 font-medium">Undergraduate Advising Office Lead</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-4">🚀</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Gunar Shirner</h4>
                    <p className="text-red-600 font-medium">Technical Lead</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full shadow-lg">
                <span className="text-xl">🎊</span>
                <span className="font-semibold text-lg">Thank you for your help and support!</span>
                <span className="text-xl">🎊</span>
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
              <Image src="/husky_logo.svg" alt="Husky Bot" width={80} height={80} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-2xl font-semibold mb-2">
                  Have a question? Find the Husky logo to start chatting!
                </p>
                <p className="text-red-100 text-lg">
                  Look for the Husky logo in the bottom-right corner of this page.
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
              <span className="font-bold text-lg">Help Improve the Chatbot</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">We Value Your Feedback</h2>
          <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Your input helps us continuously improve our service. 
            Advisors can submit feedback and tickets through our internal system.
          </p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 mb-8 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl mr-2">⚠️</span>
              <span className="font-bold text-amber-800 text-lg">Important Note</span>
            </div>
            <p className="text-amber-800 text-center font-medium">
              The feedback system is only accessible to internal staff. 
              Students won't be able to change ticket status.
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://northeastern.sharepoint.com/sites/Polinapersonal/SitePages/Advising-Chatbot-Testing-Page.aspx?promotedState=0&source=FromAppBar&Mode=Edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-red-500"
            >
              <span className="mr-3">📝</span>
              Advisor Feedback & Tickets Page (SharePoint)
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600 text-lg">
            This project is a collaboration between the College of Engineering's 
            advising offices and internal development teams.
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidgetClient />
    </div>
  );
}
