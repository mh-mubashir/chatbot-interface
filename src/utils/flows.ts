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
      { label: "Course Registration", next: "course_registration" },
      { label: "Degree Audit, Grades, and Transcripts", next: "degree_audit_grades_transcripts" }
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
  },
  // --- NEW TIER 1: DEGREE AUDIT, GRADES, AND TRANSCRIPTS ---
  degree_audit_grades_transcripts: {
    id: "degree_audit_grades_transcripts",
    type: "sub_option",
    message: "What do you need help with?",
    options: [
      { label: "Degree Audit", next: "degree_audit" },
      { label: "Grades", next: "grades" },
      { label: "Transcripts", next: "transcripts" }
    ]
  },
  // DEGREE AUDIT
  degree_audit: {
    id: "degree_audit",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where can I find my degree audit?", next: "find_degree_audit" },
      { label: "How can I run a degree audit with a different major?", next: "run_degree_audit_different_major" },
      { label: "How will I know which degree requirements are left?", next: "degree_requirements_left" }
    ]
  },
  find_degree_audit: {
    id: "find_degree_audit",
    type: "response",
    message: "Log into the Student Hub and take one of the following actions:<br>1. Click 'Services & Links' and scroll through the list to find 'My Degree Audit'<br>2. Type 'degree audit' into the search bar.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  run_degree_audit_different_major: {
    id: "run_degree_audit_different_major",
    type: "response",
    message: "You can run a degree audit to include your current program, or you can run one with a different program. View instructions here: https://registrar.northeastern.edu/wp-content/uploads/sites/9/How-to-Run-an-Audit.pdf",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  degree_requirements_left: {
    id: "degree_requirements_left",
    type: "response",
    message: "Your degree audit will indicate incomplete requirements with a red X. Requirements with a green check box are complete. Requirements with blue ellipses are complete with in-progress courses. Contact your academic advisor for any degree audit questions.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // GRADES
  grades: {
    id: "grades",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where can I find my final grades for the term?", next: "find_final_grades" },
      { label: "Where can I find my GPA?", next: "find_gpa" },
      { label: "How can I calculate my GPA?", next: "calculate_gpa" },
      { label: "What is the grade appeal process?", next: "grade_appeal_process" },
      { label: "What happens if I failed a course?", next: "failed_course" },
      { label: "What happens if I withdraw from a class?", next: "withdraw_class" }
    ]
  },
  find_final_grades: {
    id: "find_final_grades",
    type: "response",
    message: "Once final grades have been submitted, students can view their final grades by accessing the 'My grades' section in the Student Hub.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  find_gpa: {
    id: "find_gpa",
    type: "response",
    message: "Access your cumulative and term GPAs through your academic transcript in the Student Hub. Major and minor GPAs are displayed on your degree audit.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  calculate_gpa: {
    id: "calculate_gpa",
    type: "response",
    message: "GPA calculation instructions can be found here: https://service.northeastern.edu/registrar?id=kb_article_view&sysparm_article=KB000019928&sys_kb_id=b5d5e017877382143b170e96cebb3559&spa=1",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grade_appeal_process: {
    id: "grade_appeal_process",
    type: "response",
    message: "The grade appeal process varies by college. For COE courses, use the process found here: https://coe.northeastern.edu/academics-experiential-learning/undergraduate-studies/undergraduate-academic-advising/academic-standards-and-appeals/ For other colleges, check their advising websites for guidance.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  failed_course: {
    id: "failed_course",
    type: "response",
    message: "An F grade indicates failing a course, meaning you did not meet the minimum requirements to pass and will not receive credit. This grade will be calculated into your GPA and may impact your academic standing. If this was a required course for your program, you'll need to retake it. Contact your academic advisor to discuss retake options, timing, and any potential impact on your degree timeline.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  withdraw_class: {
    id: "withdraw_class",
    type: "response",
    message: "Before dropping a course, schedule a meeting with your academic advisor to review how this decision may affect your full-time enrollment status, financial aid eligibility, and graduation timeline. International students on F-1 visas must maintain compliance with enrollment requirements. For detailed withdrawal policies and deadlines, visit: https://catalog.northeastern.edu/undergraduate/academic-policies-procedures/registration-taking-courses/#text",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // TRANSCRIPTS
  transcripts: {
    id: "transcripts",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "How can I request my official transcript?", next: "request_official_transcript" },
      { label: "How can I review my unofficial transcript?", next: "review_unofficial_transcript" }
    ]
  },
  request_official_transcript: {
    id: "request_official_transcript",
    type: "response",
    message: "You can request an official transcript through Parchment. More information about transcripts and Parchment can be found here: https://service.northeastern.edu/registrar?id=kb_article_view&sysparm_article=KB000019947&sys_kb_id=ad4c9a7c9775de504b5736d11153af91&spa=1",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  review_unofficial_transcript: {
    id: "review_unofficial_transcript",
    type: "response",
    message: "Current students can view and print unofficial transcripts on the Student Hub.",
    options: [{ label: "Continue", next: "satisfaction" }]
  }
}; 