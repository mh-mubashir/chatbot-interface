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
    message: "Please select a resource:",
    options: [
      { label: "Academic Advising and Support Resources", next: "advising_support" }
    ]
  },
  advising_support: {
    id: "advising_support",
    type: "sub_option",
    message: "Which resource do you need help with?",
    options: [
      { label: "Academic Advising", next: "academic_advising" },
      { label: "COE Tutoring Center", next: "coe_tutoring" },
      { label: "Disability Access Services", next: "disability_access" },
      { label: "First Year Engineering Learning & Innovation Center", next: "fyelic" },
      { label: "Knack and Writing Center", next: "knack_writing" },
      { label: "Neurodiversity Initiative", next: "neurodiversity" }
    ]
  },
  academic_advising: {
    id: "academic_advising",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where is the COE Academic Advising Office located?", next: "advising_location" },
      { label: "Where do I find who my academic advisor is?", next: "find_advisor" },
      { label: "How do I schedule an appointment with my academic advisor?", next: "schedule_advisor" },
      { label: "What should I do if I need to cancel or reschedule my advising appointment?", next: "cancel_reschedule" },
      { label: "Can I meet with any academic advisor?", next: "any_advisor" },
      { label: "When are drop-ins?", next: "dropins" }
    ]
  },
  advising_location: {
    id: "advising_location",
    type: "response",
    message: "The COE Academic Advising Office is located in 147 Snell Engineering Center.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  find_advisor: {
    id: "find_advisor",
    type: "response",
    message: "COE students are assigned a major-specific academic advisor to support them with academic-related questions. Students can find their academic advisor's contact information and appointment availability in the Student Hub.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  schedule_advisor: {
    id: "schedule_advisor",
    type: "response",
    message: "Use Navigate on the Student Hub to schedule appointments with your academic advisor. Schedules show availability for the next two weeks only.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  cancel_reschedule: {
    id: "cancel_reschedule",
    type: "response",
    message: "Cancel or reschedule your advising appointment through Navigate located on the Student Hub. Email your advisor directly if you are running late for an appointment.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  any_advisor: {
    id: "any_advisor",
    type: "response",
    message: "It is recommended that you meet with your assigned academic advisor; however you can choose to meet with other major-specific advisors if needed. View the complete advisor list at: https://coe.northeastern.edu/academics-experiential-learning/undergraduate-studies/undergraduate-academic-advising/",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  dropins: {
    id: "dropins",
    type: "response",
    message: "Drop-ins are for quick questions with any available advisor. View the drop-in schedule on the COE Academic Advising Sharepoint site.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  coe_tutoring: {
    id: "coe_tutoring",
    type: "response",
    message: "Free peer tutoring is available in chemistry, physics, mathematics and select departmental courses. The current schedule can be found here: https://coetutoring.sites.northeastern.edu/",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  disability_access: {
    id: "disability_access",
    type: "response",
    message: "Disability Access Services serves students who have documented disabilities as defined by the Americans with Disabilities Act as Amended. Services and registration processes can be found here: https://disabilityaccessservices.northeastern.edu/about/",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  fyelic: {
    id: "fyelic",
    type: "response",
    message: "FYELIC is located on the 3rd floor of Snell Engineering Center and offers academic and Makerspace support to students enrolled in Cornerstone or GE1110/1111. More information can be found here: https://makerspaces.northeastern.edu/spaces/fyelic/",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  knack_writing: {
    id: "knack_writing",
    type: "response",
    message: "Knack and the Writing Center offer additional academic support resources.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  neurodiversity: {
    id: "neurodiversity",
    type: "response",
    message: "Addresses and supports the challenges of the Neurodiverse population by offering valuable resources, tools, and events. More information can be found here: https://neurodiversityinitiative.sites.northeastern.edu/about/",
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