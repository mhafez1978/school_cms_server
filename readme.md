# This is work in progress please excuse my mess ..
### This is a living doc for this project meaning it will be changing as project is build.

> Project Name: 
- School ERP/CMS All in one management system

> Project Description:
- Node Backend Server for School CMS/ERP system

> Tech Stack
- Node/Express
- MySQL, Sequelize
- dotenv (to protect exposing app settings and configurations).

> Some more details about this project
* This is still a project in the works, I created a test model course and all routes, controllers call to do CRUD working 100%. 
* to install and test please clone or download and launch in vscode, in terminal window switch to dircectory containing app then run : > npm install. 
* Once all dependencies packages are installed , then you can have to modify database settings to match your existing db settings, 

* then run: > npm run dev to start in dev or run: > npm run start.

* Test using postman, for routes to test check app.js for all exposed routes


> See my Beta Database diagram on LucidCharts here:
 - https://lucid.app/lucidchart/943a973f-6601-498b-9000-6604c5b41324/edit?viewport_loc=-1348%2C-893%2C3173%2C1562%2C0_0&invitationId=inv_59f9c443-3f5d-4b34-a1c5-745eeb051418#

> Upcoming Features 
- CRUD API for student, teacher, course, subject, classroom, school, principal, student parents, Exams, grades, scoreCard, attendance, graduation.

> Associations Defined ( this will keep changing )
- Each School has many teachers
- Each School has many Students
- Each Course has many subjects
- Student can register multiple courses and subjects
- Each classroom has many subjects
- Each subject has many teachers
- Each subject has many students
- Each student has a score card
- Each Score card has many marks from exams
- Each subject has a final grade = mark + attendence

> Contributers Needed/Wanted (Unpaid).

* Email: mhafez1978@outlook.com 
* Email me if you'd like to collaborate please.


