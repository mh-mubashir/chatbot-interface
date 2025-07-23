export type NodeType = "entry" | "category" | "sub_option" | "response" | "satisfaction" | "end";

export interface FlowNode {
  id: string;
  type: NodeType;
  message: string;
  options?: { label: string; next: string }[];
  parent?: string;
}

export const chatbotFlow: Record<string, FlowNode> = {
  entry: {
    id: "entry",
    type: "entry",
    message: "Welcome! Are you an undergraduate or graduate student?",
    options: [
      { label: "Undergraduate", next: "undergrad_main" },
      { label: "Graduate", next: "grad_under_dev" }
    ]
  },
  grad_under_dev: {
    id: "grad_under_dev",
    type: "response",
    message: "Graduate flows are under development.",
    options: [{ label: "Back", next: "entry" }]
  },
  undergrad_main: {
    id: "undergrad_main",
    type: "category",
    message: "Please select the area you need help with:",
    options: [
      { label: "Course Registration and Scheduling", next: "course_reg" },
      { label: "Academic Support", next: "academic_support" },
      { label: "Degree Audit, Grades, Transcripts", next: "degree_audit" },
      { label: "Meet with an Academic Advisor", next: "advisor_meeting" },
      { label: "Academic Planning and Major/Minor Exploration", next: "academic_planning" }
    ]
  },
  course_reg: {
    id: "course_reg",
    type: "sub_option",
    message: "What specific help do you need with course registration?",
    options: [
      { label: "How to Add/Drop a course?", next: "add_drop" },
      { label: "How many courses can I take in a semester?", next: "course_limit" },
      { label: "When can I register for classes?", next: "registration_timing" },
      { label: "I have a hold preventing me from registering", next: "hold" },
      { label: "How does the waitlist process work?", next: "waitlist" }
    ]
  },
  academic_support: {
    id: "academic_support",
    type: "sub_option",
    message: "The team is actively working to complete this flow. Please check back soon or contact academic support directly.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  degree_audit: {
    id: "degree_audit",
    type: "sub_option",
    message: "The team is actively working to complete this flow. Please check back soon or contact the registrar's office directly.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  advisor_meeting: {
    id: "advisor_meeting",
    type: "sub_option",
    message: "How can we help you connect with an Academic Advisor?",
    options: [
      { label: "How can my Academic Advisor help me?", next: "advisor_help" },
      { label: "How do I schedule an appointment with my Academic Advisor?", next: "advisor_schedule" },
      { label: "Where can I find who my Academic Advisor is?", next: "find_advisor" }
    ]
  },
  academic_planning: {
    id: "academic_planning",
    type: "sub_option",
    message: "The team is actively working to complete this flow. Please check back soon or contact academic planning services directly.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  add_drop: {
    id: "add_drop",
    type: "response",
    message: `For information on adding and dropping classes, visit: <a href=\"https://service.northeastern.edu/registration\" target=\"_blank\">Registration Service</a>.<br/>Important: Consult your academic advisor before making any schedule changes.`,
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  course_limit: {
    id: "course_limit",
    type: "response",
    message: `During a fall or spring term, students are expected to take between 4-5 courses per semester with required labs/recitations (minimum 12 credit hours for full-time status).<br/>In the summer, students can enroll in 2 lecture courses plus any required labs/recitation in a term.<br/>For further questions, email or schedule an appointment with your academic advisor.`,
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  registration_timing: {
    id: "registration_timing",
    type: "response",
    message: "The team is actively working to complete this specific response.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  hold: {
    id: "hold",
    type: "response",
    message: "The team is actively working to complete this specific response.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  waitlist: {
    id: "waitlist",
    type: "response",
    message: `Please direct any curriculum specific questions to your academic advisor.<br/>Waitlist information: <a href=\"https://service.northeastern.edu/registration\" target=\"_blank\">Registration Service</a>.<br/>Important: Joining a waitlist doesn't guarantee enrollment. Have backup courses ready to maintain full-time status.`,
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  advisor_help: {
    id: "advisor_help",
    type: "response",
    message: `Students can schedule in-person or virtual appointments with their Academic Advisor through the StudentHub.<br/>Additionally, daily drop-in sessions are available Monday-Friday, 9:00am-4:00pm in room 147 of the Snell Engineering Center when the university is open.`,
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  advisor_schedule: {
    id: "advisor_schedule",
    type: "response",
    message: "The team is actively working to complete this specific response.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  find_advisor: {
    id: "find_advisor",
    type: "response",
    message: "Students can find who their assigned Academic Advisor is in the Student Hub.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  satisfaction: {
    id: "satisfaction",
    type: "satisfaction",
    message: "Did this solve your problem?",
    options: [
      { label: "Yes", next: "satisfaction_yes" },
      { label: "No", next: "satisfaction_no" },
      { label: "I need more help", next: "satisfaction_more_help" }
    ]
  },
  satisfaction_yes: {
    id: "satisfaction_yes",
    type: "end",
    message: "Great! Is there anything else I can help you with?",
    options: [
      { label: "Yes, start over", next: "undergrad_main" },
      { label: "No, thank you", next: "end" }
    ]
  },
  satisfaction_no: {
    id: "satisfaction_no",
    type: "end",
    message: "I'm sorry this didn't solve your problem. Would you like to:",
    options: [
      { label: "Try a different option", next: "undergrad_main" },
      { label: "Contact support directly", next: "contact_support" }
    ]
  },
  satisfaction_more_help: {
    id: "satisfaction_more_help",
    type: "end",
    message: "Would you like to explore other options or contact support?",
    options: [
      { label: "Explore other options", next: "undergrad_main" },
      { label: "Contact support", next: "contact_support" }
    ]
  },
  contact_support: {
    id: "contact_support",
    type: "end",
    message: "Please contact [support contact information].",
    options: [{ label: "End", next: "end" }]
  },
  end: {
    id: "end",
    type: "end",
    message: "Thank you for using our service. Have a great day!",
    options: []
  }
}; 