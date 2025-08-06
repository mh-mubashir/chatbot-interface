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
    type: "category",
    message: "Please select a resource:",
    options: [
      { label: "Course Registration and Planning", next: "grad_course_registration" },
      { label: "Meet with an academic advisor", next: "grad_academic_advisor" },
      { label: "Forms", next: "grad_forms" },
      { label: "Graduation", next: "grad_graduation" },
      { label: "Student Employment", next: "grad_student_employment" },
      { label: "Co-op", next: "grad_coop" },
      { label: "Frequently Asked Questions", next: "grad_faq" },
      { label: "Who is my Advisor", next: "grad_who_is_my_advisor" }
    ]
  },
  // --- GRADUATE GRADUATION ---
  grad_graduation: {
    id: "grad_graduation",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where can I find information about graduation?", next: "grad_graduation_info" }
    ]
  },
  grad_graduation_info: {
    id: "grad_graduation_info",
    type: "response",
    message: "Any questions you may have regarding applying to graduate, your diploma, ceremony information, deadlines, parking, accessible seating, tickets, and regalia can be found on the official Northeastern Commencement website FAQ page. [Home - Northeastern Commencement](https://commencement.northeastern.edu/)<br><br>Find out everything you need to do in the months, weeks, and days leading up to graduation—and tips for the day itself. If you have any remaining questions, please reach out to your academic advisor.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GRADUATE STUDENT EMPLOYMENT ---
  grad_student_employment: {
    id: "grad_student_employment",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where can I find information about student employment/on-campus job opportunities?", next: "grad_student_employment_info" }
    ]
  },
  grad_student_employment_info: {
    id: "grad_student_employment_info",
    type: "response",
    message: "Once you are registered as a student at Northeastern, you can access hourly on-campus job postings through Northeastern’s Student Employment, Graduate Assistantships, and Fellowships (SEGAF) Office web service. The SEGAF Office manages all student employment on campus. Students interested in applying for an on-campus job must log into the SEGAF web service through the “Self-Service” tab in their myNortheastern portal.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GRADUATE CO-OP ---
  grad_coop: {
    id: "grad_coop",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Where can I find information about co-op?", next: "grad_coop_info" }
    ]
  },
  grad_coop_info: {
    id: "grad_coop_info",
    type: "response",
    message: "[Graduate Co-op FAQ page](https://coe.northeastern.edu/academics-experiential-learning/co-op-experiential-learning/co-op/graduate-co-op/co-op-faqs/)",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GRADUATE FAQ ---
  grad_faq: {
    id: "grad_faq",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Not sure what to ask? Here is a link to our FAQs (Frequently Asked Questions)", next: "grad_faq_link" }
    ]
  },
  grad_faq_link: {
    id: "grad_faq_link",
    type: "response",
    message: "https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/faqs-for-newly-admitted-and-current-students/",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GRADUATE WHO IS MY ADVISOR ---
  grad_who_is_my_advisor: {
    id: "grad_who_is_my_advisor",
    type: "sub_option",
    message: "Are you asking about your Academic Advisor, PhD Faculty Advisor, Co-op Advisor, MS Thesis Advisor, or Program Contact?",
    options: [
      { label: "MS Thesis Advisor", next: "grad_ms_thesis_advisor" },
      { label: "Co-op Advisor", next: "grad_coop_advisor" },
      { label: "PhD Faculty Advisor", next: "grad_phd_faculty_advisor" },
      { label: "Academic Advisor", next: "grad_academic_advisor_who" },
      { label: "Program Contact", next: "grad_program_contact" }
    ]
  },
  grad_ms_thesis_advisor: {
    id: "grad_ms_thesis_advisor",
    type: "response",
    message: "To find your MS Thesis Advisor, please reach out to your [Program Contact](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/)",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_coop_advisor: {
    id: "grad_coop_advisor",
    type: "response",
    message: "To find information about your Co-op advisor, please visit the [Co-op contacts page](https://coe.northeastern.edu/academics-experiential-learning/co-op-experiential-learning/co-op/co-op-coordinators/)",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_phd_faculty_advisor: {
    id: "grad_phd_faculty_advisor",
    type: "response",
    message: "If you are a new student, a PhD Faculty Advisor was assigned to you at the time of admission. Please refer to your admissions letter to find the name of your PhD Faculty Advisor. If you have any further questions, feel free to contact your [Program Contact](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/) or email {gradadvising@northeastern.edu}.<br><br>If you are a continuing student and are not currently working with a PhD Faculty Advisor, please reach out to your Program Contact or email coe-phd-{gradadvising@northeastern.edu} for assistance.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_academic_advisor_who: {
    id: "grad_academic_advisor_who",
    type: "response",
    message: "Academic advisor are assigned to new students following the end of the add/drop period. If you are a continuing students you should see your advisor on your student hub. If you are a new student or do not see your advisor in your Student Hub, please reach out to {CoE-GradAdvising@northeastern.edu}.<br><br>You may also want to attend our [virtual office hours](Virtual Drop-In Advising link.) to meet with an advisor or schedule a 20 minute virtual or in-person appointment to meet with an academic advisor via [Navigate](https://northeastern.campus.eab.com/). ([See Navigate Instructions](https://coe.northeastern.edu/wp-content/uploads/pdfs/coe/gse/navigate-instructions.pdf)).",
    options: [ { label: "Are you a student on the Boston campus or a campus outside of Boston?", next: "grad_boston_or_not" }, { label: "Continue", next: "satisfaction" } ]
  },
  grad_program_contact: {
    id: "grad_program_contact",
    type: "response",
    message: "To find your Program Contact, please visit the [Grad Student Services](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/) page.",
    options: [ { label: "Are you a student on the Boston campus or a campus outside of Boston?", next: "grad_boston_or_not" }, { label: "Continue", next: "satisfaction" } ]
  },
  grad_boston_or_not: {
    id: "grad_boston_or_not",
    type: "sub_option",
    message: "Are you a student on the Boston campus or a campus outside of Boston?",
    options: [
      { label: "Student outside of Boston", next: "grad_outside_boston" },
      { label: "Boston Student", next: "grad_boston_student" }
    ]
  },
  grad_outside_boston: {
    id: "grad_outside_boston",
    type: "response",
    message: "You can find your Program Contact name and contact information on the [Grad Student Services](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/) page under the Global Campus Network Tab as organized by major.<br><br>You may want to reach out to your Program Contact regarding:<br>- Specific questions about courses (content, assignments, grading, etc.)<br>- Signatures for Standard Petition forms and Registration Override Request forms<br>- Questions about directed study, Master’s Thesis/Project, Dissertation<br>- Advice on course selection for a particular career path or area of interest",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_boston_student: {
    id: "grad_boston_student",
    type: "response",
    message: "You can find your Program Contact name and contact information on the [Grad Student Services](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/) page under the Boston Tab as organized by major.<br><br>You may want to reach out to your Program Contact regarding:<br>- Specific questions about courses (content, assignments, grading, etc.)<br>- Signatures for Standard Petition forms and Registration Override Request forms<br>- Questions about directed study, Master’s Thesis/Project, Dissertation<br>- Advice on course selection for a particular career path or area of interest",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GRADUATE COURSE REGISTRATION ---
  grad_course_registration: {
    id: "grad_course_registration",
    type: "sub_option",
    message: "What do you need help with regarding course registration?",
    options: [
      { label: "Global Campus Network", next: "grad_global_campus" },
      { label: "Registration Issues and Support", next: "grad_registration_issues" },
      { label: "Registration Requirements", next: "grad_registration_requirements" }
    ]
  },
  // --- GRADUATE ACADEMIC ADVISOR ---
  grad_academic_advisor: {
    id: "grad_academic_advisor",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "What can my academic advisor help me with?", next: "grad_advisor_help" },
      { label: "How do I schedule an appointment with my academic advisor?", next: "grad_schedule_advisor" },
      { label: "Where can I find who my academic advisor is?", next: "grad_find_advisor" }
    ]
  },
  // --- GRADUATE FORMS ---
  grad_forms: {
    id: "grad_forms",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "I have a form that needs to be signed by my academic advisor/instructor/program contact.", next: "grad_form_signing" }
    ]
  },
  grad_form_signing: {
    id: "grad_form_signing",
    type: "response",
    message: "To see information about graduate forms, please visit the [graduate forms website](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/graduate-forms/). You may also want to visit the [New Student FAQ](https://service.northeastern.edu/registrar?id=kb_article_view&sysparm_article=KB000020032&sys_kb_id=57dc77d487089e143b170e96cebb35a6&spa=1) page for more information about common registration errors that may require a graduate form. Please contact {coe-gradadvising@northeastern.edu} if you have additional questions about your forms.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_advisor_help: {
    id: "grad_advisor_help",
    type: "response",
    message: "The Academic Advisors in the Graduate Student Services office can help with various concerns regarding your program and student record, including registering for classes, reviewing degree requirements, and more. See this page for more details.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_schedule_advisor: {
    id: "grad_schedule_advisor",
    type: "response",
    message: "You can schedule a 20-minute virtual or in-person appointment to meet with an academic advisor via [Navigate](https://northeastern.campus.eab.com/). ([See Navigate Instructions](https://coe.northeastern.edu/wp-content/uploads/pdfs/coe/gse/navigate-instructions.pdf)).",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_find_advisor: {
    id: "grad_find_advisor",
    type: "response",
    message: "Academic advisor are assigned to new students following the end of the add/drop period. If you are a continuing students you should see your advisor on your student hub. If you are a new student or do not see your advisor in your Student Hub, please reach out to {CoE-GradAdvising@northeastern.edu}",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- GLOBAL CAMPUS NETWORK ---
  grad_global_campus: {
    id: "grad_global_campus",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "Can I take a class at another campus?", next: "grad_take_class_other_campus" },
      { label: "How can I transfer to another campus?", next: "grad_transfer_campus" }
    ]
  },
  grad_take_class_other_campus: {
    id: "grad_take_class_other_campus",
    type: "response",
    message: "No, if you wish to enroll in a Livecast or on-ground course, they must be offered on your designated campus. Please refer to the courses' attributes as listed in the [Dynamic Schedule](https://bnrordsp.neu.edu/ssb-prod/NEUCLSS.p_disp_dyn_sched).",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_transfer_campus: {
    id: "grad_transfer_campus",
    type: "response",
    message: "Please review the Campus Transfer and Location Change Policy for MS Students and contact your academic advisor if you have any questions.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- REGISTRATION ISSUES AND SUPPORT ---
  grad_registration_issues: {
    id: "grad_registration_issues",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "How can I register for a full class?", next: "grad_register_full_class" },
      { label: "I'm receiving an error when I try to register", next: "grad_registration_error" },
      { label: "Can I register for two courses that are offered at the same time?", next: "grad_same_time_courses" },
      { label: "Can I be added to a class after the university-established add date?", next: "grad_add_after_deadline" }
    ]
  },
  grad_register_full_class: {
    id: "grad_register_full_class",
    type: "response",
    message: "Please join the [waitlist](https://registrar.northeastern.edu/article/class-waitlist/). If the waitlist is full (e.g. max 15 students), please watch the waitlist but do not plan on taking the course. Please register for another course that meets your degree requirements. Students will not be overridden into a full class under any circumstances. When you are trying to add yourself to a waitlist for a course and receive the error of \"Closed-waitlist\", this means that the waitlist is at capacity and no additional names can be added to the list at that time.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_registration_error: {
    id: "grad_registration_error",
    type: "response",
    message: "To view common registration errors, please see [this Registrar knowledge base article](https://service.northeastern.edu/registrar?id=kb_article_view&sysparm_article=KB000020032&sys_kb_id=57dc77d487089e143b170e96cebb35a6&spa=1). You may also want to visit our [Graduate Form Center](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/graduate-forms/) or [New Student FAQ.](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/faqs-for-newly-admitted-and-current-students/). We recommend that you connect with your academic advisor to discuss any registration errors, you can find your advisor on the student hub or reach out to {coe-gradadvising@northeastern.edu}",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_same_time_courses: {
    id: "grad_same_time_courses",
    type: "response",
    message: "No. The days and times of courses cannot be changed to accommodate specific student registration conflicts. Classes are scheduled at particular times for a variety of reasons, including but not limited to classroom availability, instructor availability, etc. Additionally, the days and times of courses each semester may and will vary semester to semester.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_add_after_deadline: {
    id: "grad_add_after_deadline",
    type: "response",
    message: "No. Any requests will be denied. If you receive an email from a University entity after the add deadline about enrolling in a course, per department policy, you will not be permitted to register. Please review the [university's academic calendar](https://registrar.northeastern.edu/article/academic-calendar/) for any and all applicable deadlines.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  // --- REGISTRATION REQUIREMENTS ---
  grad_registration_requirements: {
    id: "grad_registration_requirements",
    type: "sub_option",
    message: "Select your question:",
    options: [
      { label: "What are the requirements for summer registration?", next: "grad_summer_registration" },
      { label: "What are the registration requirements for international students?", next: "grad_international_requirements" },
      { label: "Can a student take more credits apart from the degree requirements?", next: "grad_extra_credits" },
      { label: "Can I take a course outside of my approved electives?", next: "grad_outside_electives" }
    ]
  },
  grad_summer_registration: {
    id: "grad_summer_registration",
    type: "response",
    message: "During the summer sessions, students can ONLY register for two courses (8 Semester Hours), not taking more than 4 Semester Hours in either Summer I or Summer II. Students cannot enroll in 3 courses (12 Semester Hours) during any summer sessions and are not required to register in summer classes as it is considered an optional semester for international students.<br><br>Below you will find the possible enrollment options that the department approves:<br><br>- Option 1: One Full Summer course (4SH) & One Summer I (4SH)<br>- Option 2: One Full Summer course (4SH) & One Summer II (4SH)<br>- Option 3: One Summer I course (4SH) & One Summer II (4SH)<br>- Option 4: Two Full Summer courses (4SH, each)<br>- Option 5: One course in either Summer I, Summer II, or Full Summer<br>- Option 6: No registration<br><br>Please note: In a case where a course is offered that is not 4SH, please contact your [Academic Advisor](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/advising-team/) to discuss further.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_international_requirements: {
    id: "grad_international_requirements",
    type: "response",
    message: "You must be enrolled as a full-time graduate student, enrolled in 8 semester credit hours (4 semester credit hours of which must be on-ground), to comply with a J1 or F1 Visa or Study Permit. See OGS information on [maintaining status](https://international.northeastern.edu/ogs/current-students/understanding-visa-requirements/guidelines-on-maintaining-status/).<br><br>If you are in your last semester and have one course to complete your degree requirements, you must enroll in 4 semester credit hours on-ground. See OGS information on the [final term](https://international.northeastern.edu/ogs/current-students/understanding-visa-requirements/final-term/).",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_extra_credits: {
    id: "grad_extra_credits",
    type: "response",
    message: "If you have available space in your final term, you can take classes depending on availability. International students taking courses that do not count towards your degree requirements or are considered \"extra\" courses could impact your visa status. Please contact Graduate Student Services for any questions: coe-gradadvising@northeastern.edu.",
    options: [{ label: "Continue", next: "satisfaction" }]
  },
  grad_outside_electives: {
    id: "grad_outside_electives",
    type: "response",
    message: "First, check the program requirements listed in your [catalog year](https://registrar.northeastern.edu/group/catalog/). If the course you are interested in is NOT on the list, then you need a [Standard Petition form](https://coe.northeastern.edu/academics-experiential-learning/graduate-school-of-engineering/graduate-student-services/graduate-forms/) to count it towards your program.<br><br>1. Check \"elective outside of approved curriculum\"<br>2. Explain why you feel this course is relevant to your field of study.<br>3. Obtain the necessary signatures stated in the instructions on the form.<br><br>*If your program is part of the Mechanical and Industrial Engineering Department, please fill of the form found under the MIE Course Registration Forms section on the above forms website.",
    options: [{ label: "Continue", next: "satisfaction" }]
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