const template1 = require(".");

const data =  {
    headings: {},
    sections: [
        "profile",
        "education",
        "work",
        "skills",
        "projects",
        "volunteer",
        "awards",
        "interests",
        "por",
        "publications",
        "extraCurricular"
    ],
    basics: {
        name: "Rajat Raj",
        location: "Bangalore",
        website: "www.rajatraj.co.in",
        email: "rajatraj733@gmail.com",
        phone: '+91-8101451009'
    },
    education: [
        {
            institution: 'Indian Institute of Technology',
            location: 'Kharagpur',
            studyType: 'B. Tech',
            area: 'Civil Engineering',
            gpa: '8.17 out of 10',
            startDate: 'July 2012',
            endDate: 'April 2016'
        },
        {
            institution: 'Chinmaya Vidyalaya',
            location: 'Bokaro',
            studyType: 'AISSCE',
            area: null,
            gpa: '93.4 percent',
            startDate: 'July 2010',
            endDate: 'April 2012'
        }
    ],
    work: [
        {
            company: 'Seven Lakes Technology',
            positions: [
                {
                    role: 'Software Engineer',
                    startDate: 'October 2018',
                    endDate: 'October 2019',
                    highlights: [
                        "First time started working in an iOS project named AFE. Designed a few screens and built it with intuitive interactions within 2 months",
                        "Supported a legacy iOS project FDG where I got opportunity to build many features which helped me understand nuances of iOS programming",
                        "Got opportunity to work in a flagship Project of SLT from scratch where I created web app using ReactJS and also helped building middle tier stack in aws"
                    ],
                },
                {
                    role: 'Senior Software Engineer',
                    startDate: 'October 2019',
                    highlights: [
                        "Led a team of 4 members to build the JOYN Analytics",
                        "Used python and C combined to reduce the latency"
                    ],
                }
            ],
            location: 'Bangalore',
            website: 'www.sevenlakestechnologies.com',
            summary: 'some company summary',
        },
        {
            company: 'CitiCorps Private Limited',
            positions: [
                {
                    role: 'Assistant Manager',
                    startDate: 'July 2016',
                    endDate: 'October 2018',
                    highlights: [
                        'Worked on an alternate investment platform GDR where worked in middle tier using JAVA and Spring Framework',
                        'Using OCR library, created an desktop Java app to create a product which can extract text out of images containing pdf to help the operations team',
                        'Worked on a scratch platform to create workflow controller engine using Java and queues within micro-architecture'
                    ],
                }
            ],
            location: 'Pune',
        }
    ],
    volunteer: [
        {
            organization: 'Organization',
            position: 'Volunteer',
            website: 'www.volunteer-at-organization.com',
            startDate: 'Start Date',
            endDate: 'End Date',
            summary: 'Volunteer summary at organization',
            highlights: [
                'Got awarded for this position in this organization'
            ]
        },
        {
            organization: 'Bhumi NGO',
            position: 'Teacher',
            website: 'www.bhumi-ngo.org',
            startDate: 'May 2018',
            endDate: 'October 2018',
            summary: null,
            highlights: [
                'Took responsibility to design computer courses for class 3 till 7',
                'Had some interactive sessions with children to teach them fundamentals of computer'
            ],
        }
    ],

    skills: [
        {
            name: 'Sports',
            level: 'Medium',
            keywords: [
                'Volleyball',
                'Basketball'
            ]
        },
        {
            keywords: [
                'Binge watching'
            ]
        }],
    projects: [
        {
            name: 'Punching Shear Force Modelling on Pillar',
            description: 'Created a model using Gene Expression Programming to predict shear force using different properties of pillar',
            keywords: [
                "gep",
                "modelling",
                "soft computing"
            ],
            url: 'http://www.punching-shear.com',
            guide: 'Prof. S. K. Barai',
            highlights: [
                'Created a model using Gene Expression Programming to predict shear force using different properties of pillar',
                'Created a model using Gene Expression Programming to predict shear force using different properties of pillar',
            ],
            startDate: 'July 2015',
            endDate: 'April 2016',
        }
    ],
    awards: [
        {
            title: 'Ashutosh Mukherjee Award',
            date: '2016',
            awarder: 'IIT Kharagpur',
            summary: 'Was awarded for being overall active member in the committee',
        }
    ],
    publications: [
        {
        name: "Publication",
        publisher: "Publisher",
        releaseDate: "2014-10-01",
        website: "http://publication.com",
        summary: "Description..."
        },
        {
            name: "Publication",
            publisher: "Publisher",
            releaseDate: "2014-10-01",
            website: "http://publication.com",
            summary: "Description..."
        }],
    interests: ["Dance", "Boxing"],
    extraCurricular: [
        {
            activityName: 'Dance',
            role: 'Front Lead',
            highlights: [
                'Performed in Inter-IIT stage',
                'Mob flash'
            ]
        }
    ],
    por: [
        {
            organization: 'Spring Fest',
            positions: [
                {
                    role: 'Web Sub Head',
                    startDate: 'October 2018',
                    endDate: 'October 2019',
                    highlights: [
                        "First time started working in an iOS project named AFE. Designed a few screens and built it with intuitive interactions within 2 months",
                        "Supported a legacy iOS project FDG where I got opportunity to build many features which helped me understand nuances of iOS programming",
                        "Got opportunity to work in a flagship Project of SLT from scratch where I created web app using ReactJS and also helped building middle tier stack in aws"
                    ],
                },
                {
                    role: 'Web Head',
                    startDate: 'October 2019',
                    endDate: 'October 2020',
                    highlights: [
                        "Led a team of 4 members to build the JOYN Analytics",
                        "Used python and C combined to reduce the latency"
                    ],
                }
            ],
        }
    ],
};

console.log(template1.default(data));