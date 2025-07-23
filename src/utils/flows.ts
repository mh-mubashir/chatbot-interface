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
      { label: "Academic Advising and Support Resources", next: "advising_support" },
      { label: "Course Registration", next: "course_registration" }
    ]
  },
  // --- NEW TIER 1: COURSE REGISTRATION ---
  course_registration: {
    id: "course_registration",
    type: "sub_option",
    message: "What do you need help with regarding course registration?",
    options: [
      { label: "Registration Preparation", next: "registration_preparation" },
      { label: "Registration Process and Errors", next: "registration_process" }
    ]
  },
  registration_preparation: {
    id: "registration_preparation",
    type: "sub_option",
    message: "Select a topic:",
    options: [
      { label: "Making registration plans", next: "making_registration_plans" },
      { label: "Locating your time ticket", next: "locating_time_ticket" },
      { label: "Finding NUpath courses", next: "finding_nupath_courses" },
      { label: "Enrolling in a graduate level course", next: "enrolling_graduate_course" },
      { label: "Petitioning for an overload", next: "petitioning_overload" }
    ]
  },
  making_registration_plans: {
    id: "making_registration_plans",
    type: "response",
    message: "You can create up to three course plans per term in the Student Hub. Instructions on how to make a plan. Use your curriculum planner and degree audit when selecting courses. Contact COE Undergraduate Academic Advising for questions.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  locating_time_ticket: {
    id: "locating_time_ticket",
    type: "response",
    message: "A time ticket indicates when a student will be able to register in Eastern Standard Time. Students will not be able to register for classes until the date and time of their time ticket. However, students can search the schedule of classes via the Student Hub three weeks prior to registration and can plan their schedules before registration begins. You can view your time ticket in the Student Hub > Resources Tab > Academic Classes & Registration > Course Registration > Prepare for Registration. Time tickets will be available to view by the Thursday before registration begins.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  finding_nupath_courses: {
    id: "finding_nupath_courses",
    type: "response",
    message: "COE students are expected to fulfill all NUpath requirements for degree completion. Most major requirements will satisfy NUpath requirements except for DD (Differences in Diversity), IC (Interpreting Culture), SI (Societies and Institutions) and EX (Integration Experience). Searching for courses with specific NUpath attributes.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  enrolling_graduate_course: {
    id: "enrolling_graduate_course",
    type: "response",
    message: "Students planning to enroll in a COE graduate level course should follow the instructions provided Here. NOTE: Enrollment instructions differ depending on whether the course is being used toward the PlusOne program or undergraduate degree only.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  petitioning_overload: {
    id: "petitioning_overload",
    type: "response",
    message: "COE students can petition to overload in a term if they meet eligibility criteria. The form is located on the COE Advising Sharepoint site. Overloading in any term will result in additional tuition fees. Contact Student Financial Services for questions.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  registration_process: {
    id: "registration_process",
    type: "sub_option",
    message: "Select a topic:",
    options: [
      { label: "Adding/dropping courses", next: "adding_dropping_courses" },
      { label: "Closed courses & Waitlist", next: "closed_courses_waitlist" },
      { label: "Resolving holds", next: "resolving_holds" },
      { label: "Registering for research", next: "registering_research" },
      { label: "Receiving an error", next: "receiving_error" }
    ]
  },
  adding_dropping_courses: {
    id: "adding_dropping_courses",
    type: "response",
    message: "Students can add or drop classes via the Student Hub by the applicable deadlines. For information on adding and dropping classes, visit: https://service.northeastern.edu/registrar?id=kb_article_view&sysparm_article=KB000020009&sys_kb_id=1b17b4d197215a1066d1b83e6253af8a&spa=1 An account hold will prohibit a student from making any schedule adjustments until the hold is resolved. Important: Consult your academic advisor before making any schedule changes.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  closed_courses_waitlist: {
    id: "closed_courses_waitlist",
    type: "response",
    message: "Some courses may offer a waitlist option. If you join a waitlist and a spot becomes available in the class, your Northeastern email will receive a Registrar notification instructing you to add the course within 24 hours of receiving the email. If no action is taken, you will lose your spot on the waitlist. Find instructions on how to register for a waitlisted course. If no waitlists are available, select another section or a different course. Contact COE Undergraduate Academic Advising for questions.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  resolving_holds: {
    id: "resolving_holds",
    type: "response",
    message: "To resolve a hold, you will need to contact the appropriate department or office based on the type of hold you have. For example, if you have a financial hold, you will need to contact Student Financial Services. A list of contacts for each hold type can be found here.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  registering_research: {
    id: "registering_research",
    type: "response",
    message: "After confirming with the professor and your academic advisor, students can enroll in research (0-4 semester hours) through the Individual Instruction form located on the Student Hub > Resources tab > Academics, Classes & Registration > Registrar Forms.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  receiving_error: {
    id: "receiving_error",
    type: "sub_option",
    message: "What type of error did you receive?",
    options: [
      { label: "ENCP2000/3000", next: "error_encp" },
      { label: "Level", next: "error_level" },
      { label: "Pre-requisite/test score", next: "error_prereq" },
      { label: "Program", next: "error_program" },
      { label: "Repeat", next: "error_repeat" },
      { label: "Time conflict", next: "error_time_conflict" },
      { label: "Other error", next: "error_other" }
    ]
  },
  error_encp: {
    id: "error_encp",
    type: "response",
    message: "When receiving an error, check the course’s restrictions such as level, program, and pre- and co-requisites. ENCP courses are restricted by major. If all sections for your major are closed or conflict with a required course, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_level: {
    id: "error_level",
    type: "response",
    message: "When receiving an error, check the course’s restrictions such as level, program, and pre- and co-requisites. If the course has a College of Engineering Graduate level restriction, please follow these instructions: https://coe.northeastern.edu/academicsexperiential-learning/graduate-school-ofengineering/graduate-studentservices/graduate-forms/ If you believe you received this message in error, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_prereq: {
    id: "error_prereq",
    type: "response",
    message: "When receiving an error, check the course’s restrictions such as level, program, and pre- and co-requisites. Students are expected to adhere to the pre- and co-requisite listed for each course. If you believe you received this message in error, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_program: {
    id: "error_program",
    type: "response",
    message: "When receiving an error, check the course’s restrictions such as level, program, and pre- and co-requisites. Some courses are restricted by major or program. Search for other sections of the course first before contacting the college-specific undergraduate academic advising office.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_repeat: {
    id: "error_repeat",
    type: "response",
    message: "If you receive a Repeat error, it means that you already have credit for that course or a designated equivalent course. Without an override, the Registration system will prohibit you from enrolling in the course. If you believe you received this message in error or want to request a repeat override, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_time_conflict: {
    id: "error_time_conflict",
    type: "response",
    message: "If you receive a Time Conflict error, it means the course you are trying to register for overlaps with a course you’re already enrolled in. You’ll need to choose a different section or course. If you believe you received this message in error, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  error_other: {
    id: "error_other",
    type: "response",
    message: "A list of error messages, an explanation of the error message, and the appropriate contact office for each error message type can be found here. If you are not sure why you received an error message, contact COE Undergraduate Academic Advising.",
    options: [{ label: "Continue", next: "satisfaction" }]
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