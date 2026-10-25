import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const out=path.join(root,'resubmission');
const shots=path.join(out,'screenshots');
fs.mkdirSync(shots,{recursive:true});
const map={
 'appt_search_design.png':'screenshots/doctor-search.png',
 'appt_doccard_design.png':'screenshots/appointments.png',
 'reviews_design.png':'outputs/resubmit/review-form.png',
 'navbar_layout.png':'screenshots/navbar_design.png',
 'signup_form_layout.png':'screenshots/signup_form_design.png',
 'login_form_layout.png':'screenshots/login_form_design.png',
 'react_navbar_folder_struct.png':'outputs/resubmit/navbar-source.png',
 'react_navbar_output.png':'screenshots/navbar_design.png',
 'react_signup_folder_struct.png':'outputs/resubmit/signup-source.png',
 'react_login_folder_struct.png':'outputs/resubmit/login-source.png',
 'react_signup_output.png':'screenshots/signup_form_design.png',
 'react_login_output.png':'screenshots/login_form_design.png',
 'docsearch.png':'screenshots/doctor-search.png',
 'doctor_card.png':'screenshots/appointments.png',
 'apptform.png':'screenshots/appointment-form.png',
 'appttest.png':'screenshots/booking-notification.png',
 'notification_output.png':'screenshots/booking-notification.png',
 'notification_test.png':'outputs/resubmit/profile-saved.png',
 'rating_selector.png':'outputs/resubmit/review-form.png',
 'review_form_style.png':'outputs/resubmit/review-form.png',
 'test_rev.png':'outputs/resubmit/review-submitted.png',
 'profilecard.png':'screenshots/profile-card.png',
 'integration.png':'outputs/resubmit/profile-saved.png',
 'profileform.png':'screenshots/profile-edit.png',
 'profile.png':'screenshots/profile-card.png',
 'reportlayout.png':'outputs/resubmit/reports.png',
 'report.png':'output/pdf/patient_report-preview.png',
 'style.png':'outputs/resubmit/styles-source.png',
 'test_profile.png':'outputs/resubmit/profile-saved.png',
 'test_success.png':'screenshots/registration-success.png',
 'launch.png':'C:/Users/hp/Downloads/launch.png'
};
const missing=[];const provenance=[];
for(const [name,source] of Object.entries(map)){
 const full=path.isAbsolute(source)?source:path.join(root,source);
 if(!fs.existsSync(full)){missing.push(name);continue;}
 fs.copyFileSync(full,path.join(shots,name));
 provenance.push({file:name,source,sha256:crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')});
}
fs.writeFileSync(path.join(out,'screenshot-provenance.json'),JSON.stringify(provenance,null,2));
fs.writeFileSync(path.join(out,'required-screenshots.txt'),Object.keys(map).join('\n')+'\n');
const repo='https://github.com/fat-ma-77/med_appt/blob/main/';
const urls={4:'https://github.com/fat-ma-77/grihf-frontend_capstone_starter_code/blob/main/README.md',5:repo+'components/Sign_Up.jsx',6:repo+'components/Login.jsx',7:repo+'components/Navbar.jsx',8:repo+'components/FindDoctorSearch.jsx',9:repo+'app/App.jsx',10:repo+'components/AppointmentFormIC.jsx',11:repo+'components/GiveReviews.jsx',12:repo+'components/ProfileCard.jsx',14:repo+'index.html',18:repo+'components/AppointmentForm.jsx',19:repo+'components/DoctorCard.jsx'};
fs.writeFileSync(path.join(out,'file-urls.json'),JSON.stringify(urls,null,2));
const lines=['# StayHealthy - corrected resubmission answers','','Keep the screenshots for Questions 1, 2 and 3 and the PDF for Question 20 that already earned full marks. The previous registration output for Question 16 was also accepted.','','Use the exact repository names below. These are real public repositories, not renamed text in the URLs.',''];
for(const [task,url] of Object.entries(urls))lines.push('## Question '+task,'',url,'');
for(const [task,file] of [[13,'build'],[16,'register'],[17,'login']]){
 const input=path.join(root,'evidence',file+'.txt');
 if(fs.existsSync(input)){const text=fs.readFileSync(input,'utf8').replace(/\u001b\[[0-9;?]*[a-zA-Z]/g,'');fs.writeFileSync(path.join(out,file),text);fs.writeFileSync(path.join(out,file+'.txt'),text);lines.push('## Question '+task,'','```text',text,'```','');}
}
lines.push('## Question 15 - replace launch.png','','Open https://stayhealthy-fatma-project.faatum7.chatgpt.site in Chrome. Log out of the StayHealthy app if necessary. Press Ctrl+0 and Ctrl+Home. Capture the address bar, StayHealthy logo/title, tagline and the visible Home, Appointments, Login and Sign Up links together. Save over screenshots/launch.png.','','The launch.png initially copied into this pack is your ORIGINAL submitted screenshot. It has the address bar but its page header is offscreen. It is retained as a genuine file for the folder inventory, not presented as a corrected Question 15 screenshot. Replace it before submitting Question 15.','','## Question 21 - required folder','','The screenshots/ subfolder is prepared with the 31 exact names listed in required-screenshots.txt. Some tasks ask for the same visible UI at design/layout/output stages; those files reuse the corresponding genuine app capture, as recorded in screenshot-provenance.json. No browser address bar, editor window or terminal output has been fabricated. report.png is a rendering of the actual patient report PDF.','','Use screenshots_folder.png when provided, or capture the completed screenshots folder in File Explorer. Make all 31 PNG filenames visible; use Details view and two columns if needed.','','The three original design screenshots already earned full marks. No Figma recapture is needed for the requirements assessed in this feedback.');
fs.writeFileSync(path.join(out,'CORRECTED_ANSWERS.md'),lines.join('\n'));
console.log('Prepared '+provenance.length+' of '+Object.keys(map).length+' required screenshot files.');
if(missing.length)console.log('Still to capture: '+missing.join(', '));
