import ChatbotWidgetClient from "../components/chatbot/ChatbotWidgetClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NEU</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  College of Engineering
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Northeastern University
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Engineering Advising Assistant
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get quick answers to your academic advising questions, 24/7. 
            Our AI assistant helps both undergraduate and graduate students 
            with common academic queries.
          </p>
        </div>

        {/* What the Chatbot Is */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            What the Chatbot Is
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Our intelligent chatbot helps answer frequent advising questions for both 
              graduate and undergraduate students in the College of Engineering.
            </p>
            <p>
              It's designed to reduce routine workload for advisors, allowing them to 
              focus on more complex, personalized queries while providing you with 
              immediate assistance.
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              For Students
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-2xl">📚</span>
                <span>Supports students 24/7</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🧭</span>
                <span>Covers common questions for both UG & Grad programs</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <span>Instant answers to routine questions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              For Advisors
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <span>Reduces repetitive workload for advising staff</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <span>Continuously improved based on feedback</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">🎨</span>
                <span>Focus on complex, personalized queries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Who Developed It */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Who Developed It
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            This chatbot is an internal pilot project developed by the College of Engineering, 
            with input and representation from both Graduate and Undergraduate Advising Offices.
          </p>
        </div>

        {/* Where to Access It */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Where to Access It
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">💬</div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Have a question? Chat with us using the bubble below!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The chatbot is located in the bottom-right corner of this page.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback & Testing Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Help Improve the Chatbot
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We value your feedback to continuously improve our service. 
            Advisors can submit feedback and tickets through our internal system.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> The feedback system is only accessible to internal staff. 
              Students won't be able to change ticket status.
            </p>
          </div>
          <a
            href="https://northeastern.sharepoint.com/sites/Polinapersonal/SitePages/Advising-Chatbot-Testing-Page.aspx?promotedState=0&source=FromAppBar&Mode=Edit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Advisor Feedback & Tickets Page (SharePoint)
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
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
