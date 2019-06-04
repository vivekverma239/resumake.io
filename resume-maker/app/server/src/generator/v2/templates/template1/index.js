/**
 * @flow
 */

import {stripIndent, source} from 'common-tags'
import {WHITESPACE} from '../constants'
import type {SanitizedValues, Generator} from '../../../../types'

type Template1Generator = Generator & {
    resumeDefinitions: () => string
}

const generator: Template1Generator = {
    profileSection(basics) {
        if (!basics) {
            return ''
        }

        const {name, email, phone, location, website} = basics
        const address = (location && location.address) || ''

        let line1 = name ? `{\\Huge \\scshape {${name}}}` : ''
        let line2 = [address, email, phone, website]
            .filter(Boolean)
            .join(' $\\cdot$ ')

        if (line1 && line2) {
            line1 += '\\\\'
            line2 += '\\\\'
        }

        return stripIndent`
      %==== Profile ====%
      \\vspace*{-10pt}
      \\begin{center}
        ${line1}
        ${line2}
      \\end{center}
    `
    },

    educationSection(education, heading) {
        if (!education) {
            return ''
        }

        return source`
      %==== Education ====%
      \\header{${heading || 'Education'}}
      ${education.map(school => {
            const {
                institution,
                location,
                studyType,
                area,
                gpa,
                startDate,
                endDate
            } = school

            let line1 = ''
            let line2 = ''

            if (institution) {
                line1 += `\\textbf{${institution}}`
            }

            if (location) {
                line1 += `\\hfill ${location}`
            }

            if (studyType) {
                line2 += studyType
            }

            if (area) {
                line2 += studyType ? ` ${area}` : `Degree in ${area}`
            }

            if (gpa) {
                line2 += ` \\textit{GPA: ${gpa}}`
            }

            if (startDate || endDate) {
                const gradLine = `${startDate || ''} - ${endDate || ''}`
                line2 += line2 ? ` \\hfill ${gradLine}` : gradLine
            }

            if (line1) {
                line1 += '\\\\'
            }

            if (line2) {
                line2 += '\\\\'
            }

            return stripIndent`
          ${line1}
          ${line2.trim()}
          \\vspace{2mm}
        `
        })}
    `
    },

    workSection(work, heading) {
        if (!work) {
            return ''
        }

        return source`
      %==== Experience ====%
      \\header{${heading || 'Experience'}}
      \\vspace{1mm}

      ${work.map(job => {
            const {
                company,
                positions,
                location,
            } = job

            let line1 = ''

            if (company) {
                line1 += `\\textbf{${company}}`
            }

            if (location) {
                line1 += ` \\hfill ${location}`
            }
            if (line1) line1 += '\\\\'

            let positionLines = ''


            if (positions) {
                positionLines = positions.map(position => {
                    const {role, startDate, endDate, highlights, summary} = position;
                    let roleLine = ''
                    let summaryLine = ''
                    let highlightLines = ''
                    if (role) {
                        roleLine += `\\textit{${role}} `
                    }
                    if (startDate && endDate) {
                        roleLine += ` \\hfill ${startDate} - ${endDate}`
                    } else if (startDate) {
                        roleLine += ` \\hfill ${startDate} - Present`
                    } else if (endDate) {
                        roleLine += ` \\hfill ${endDate}`
                    }
                    if (roleLine) roleLine += '\\\\'

                    if (summary) {
                        summaryLine = source`
                    \\vspace{-1mm}
                    \\begin{center}
                    ${summary}
                    \\end{center}
                    \\vspace{-3mm}
                    `
                    }
                    if (highlights) {
                        highlightLines += source`
                    \\vspace{-2mm}
                    \\begin{itemize} \\itemsep 1pt
                    ${highlights.map(highlight => {
                            return source`
                        \\item ${highlight}
                        `
                        })}
                    \\end{itemize}
                    `
                    }
                    return source`
                ${roleLine}
                ${summaryLine}
                ${highlightLines}
                `
                }).join(`\n`)
            }

            return stripIndent`
          ${line1}
          ${positionLines}
        `
        })}
    `
    },

    porSection(por, heading) {
        if (!por) {
            return ''
        }

        return source`
      %==== Position of Responsibility ====%
      \\header{${heading || 'Position of Responsibility'}}
      \\vspace{1mm}

      ${por.map(singlePor => {
            const {
                organization,
                positions,
            } = singlePor

            let line1 = ''

            if (organization) {
                line1 += `\\textbf{${organization}}`
            }

            if (line1) line1 += '\\\\'

            let positionLines = ''


            if (positions) {
                positionLines = positions.map(position => {
                    const {role, startDate, endDate, highlights, summary} = position;
                    let roleLine = ''
                    let summaryLine = ''
                    let highlightLines = ''
                    if (role) {
                        roleLine += `\\textit{${role}} `
                    }
                    if (startDate && endDate) {
                        roleLine += ` \\hfill ${startDate} - ${endDate}`
                    } else if (startDate) {
                        roleLine += ` \\hfill ${startDate} - Present`
                    } else if (endDate) {
                        roleLine += ` \\hfill ${endDate}`
                    }
                    if (roleLine) roleLine += '\\\\'

                    if (summary) {
                        summaryLine = source`
                    \\vspace{-1mm}
                    \\begin{center}
                    ${summary}
                    \\end{center}
                    \\vspace{-3mm}
                    `
                    }
                    if (highlights) {
                        highlightLines += source`
                    \\vspace{-2mm}
                    \\begin{itemize} \\itemsep 1pt
                    ${highlights.map(highlight => {
                            return source`
                        \\item ${highlight}
                        `
                        })}
                    \\end{itemize}
                    `
                    }
                    return source`
                ${roleLine}
                ${summaryLine}
                ${highlightLines}
                `
                }).join(`\n`)
            }

            return stripIndent`
          ${line1}
          ${positionLines}
        `
        })}
    `
    },

    skillsSection(skills, heading) {
        if (!skills) {
            return ''
        }

        return source`
      \\header{${heading || 'Skills'}}
      \\begin{tabular}{ l l }
      ${skills.map(skill => {
            const {name = 'Misc', keywords = []} = skill
            return `${name}: & ${keywords.join(', ')} \\\\`
        })}
      \\end{tabular}
      \\vspace{2mm}
    `
    },

    projectsSection(projects, heading) {
        if (!projects) {
            return ''
        }

        return source`
      \\header{${heading || 'Projects'}}
      ${projects.map(project => {
            if (Object.keys(project) === 0) {
                return ''
            }

            const {name, description, keywords, url, guide, highlights, startDate, endDate} = project

            let line1 = ''
            let descriptionLine = description || ''
            let line2 = ''
            let highlightLines = '';

            if (name && url) {
                line1 += `\\href{${url}}{\\textbf{${name}}}`
            } else if (name) {
                line1 += `{\\textbf{${name}}`
            }
            
            if(guide) {
                line1 += `\\hfill ${guide}`
            }

            if (keywords) {
                line2 += `{\\sl ${keywords.join(', ')}}`
            }

            if (startDate && endDate) {
                line2 += ` \\hfill ${startDate} - ${endDate}`
            } else if (startDate) {
                line2 += ` \\hfill ${startDate} - Present`
            } else if (endDate) {
                line2 += ` \\hfill ${endDate}`
            }
            
            if (line1) line1 += '\\\\'
            
            
            if(line2) line2 += '\\\\'

            if (descriptionLine) {
                descriptionLine += '\\\\'
            }
            
            if(highlights) {
                
                highlightLines = source`
                \\begin{itemize} \\itemsep 1pt 
                 ${highlights.map(highlight => 
                    source`
                    \\item ${highlight}
                    `
                )}
                \\end{itemize} 
                `
            }

            return stripIndent`
          ${line1}
          ${line2}
          ${descriptionLine}
          ${highlightLines}
          \\vspace*{2mm}
        `
        })}
    `
    },

    awardsSection(awards, heading) {
        if (!awards) {
            return ''
        }

        return source`
      \\header{${heading || 'Awards'}}
      ${awards.map(award => {
            const {title, summary, date, awarder} = award

            let line1 = ''
            let line2 = summary || ''

            if (title) {
                line1 += `\\textbf{${title}}`
            }

            if (awarder) {
                line1 += ` \\hfill ${awarder}`
            }

            if (date) {
                line2 += ` \\hfill ${date}`
            }

            if (line1) line1 += '\\\\'
            if (line2) line2 += '\\\\'

            return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{2mm}
        `
        })}
    `
    },

    volunteerSection(volunteers, heading) {
        if(!volunteers || volunteers.length===0) return ''

        const headingName = heading || `Volunteer`
        return source`
        \\header{${headingName}}
        ${volunteers.map(volunteer => {
            const {organization,
                position,
                website,
                startDate,
                endDate,
                summary,
                highlights,} = volunteer
            let line1 = ``
            let positionLine = ``
            let hightlightLines = ``
            
            if(organization && website) {
                line1 += `\\href{${website}}{\\textbf{${organization}}}`
            } else if (organization) {
                line1 += `\\textbf{${organization}}`
            }
            if (startDate && endDate) {
                line1 += ` \\hfill ${startDate} - ${endDate}`
            } else if (startDate) {
                line1 += ` \\hfill ${startDate} - Present`
            } else if (endDate) {
                line1 += ` \\hfill ${endDate}`
            }
            
            if(line1) line1 += '\\\\'
            
            if(position) {
                positionLine += `\\textsl{${position}} \\\\`
            }
            
            if(highlights && highlights.length > 0) {
                hightlightLines = source`
                \\begin{itemize} \\itemsep 1pt
                ${highlights.map(highlight => 
                    source`
                    \\item ${highlight}
                    `
                )}
                \\end{itemize}
                `    
            }
            return source`
            ${line1}
            ${positionLine}
            ${hightlightLines}
            `
        })}
        `

    },

    interestsSection(interests, heading) {
        if(!interests || interests.length === 0) return ''

        return source`
        \\header{${heading || 'Interests' }}
        ${interests.join(', ')} \\\\
        \\vspace{3mm}
        `
    },

    publicationsSection(publications, heading) {
        if(!publications || publications.length === 0) return ''

        return source`
        \\header{${heading || 'Publications'}}
        ${publications.map(publication => {
            const {name, publisher, releaseDate, website, summary} = publication
            
            let line1 = ''
            let line2 = ''
            let summaryLine = ''
            
            if(name && website) {
                line1 += `\\href{${website}}{\\textbf{${name}}} `
            } else if(name) {
                line1 += `\\textbf{${name}}`
            }
            
            if(publisher) {
                line1 += `\\hfill ${publisher} `
            }
            if(line1) line1 += `\\\\`
            
            if(releaseDate) {
                line2 += `\\hfill ${releaseDate} \\\\`
            }
            
            if(summary) {
                summaryLine = `${summary} \\\\`
            }
            
            return source`
            ${line1}
            ${line2}
            ${summaryLine}
            `
        }).join('\\vspace{3mm} \n')}
        `
    },
    extraCurricularSection(extraCurricular, heading) {
        if(!extraCurricular || extraCurricular.length === 0) return ''

        return source`
        \\header{${heading || 'Extra Curricular'}}
        ${extraCurricular.map(singleExtraCurricular => {
            const {activityName, role, highlights} = singleExtraCurricular
            
            let line1 = ''
            let highlightLines = ''
            
            if(activityName) {
                line1 += `\\textbf{${activityName}} `
            }
            
            if(role) {
                line1 += `\\hfill ${role}`
            }
            
            if(line1) line1 += '\\\\'
            
            if(highlights && highlights.length > 0) {
                highlightLines = source`
                \\begin{itemize} \\itemsep 1pt
                ${highlights.map(higlight => `\\item ${higlight}`)}
                \\end{itemize}
                `
            }
            return source`
            ${line1}
            ${highlightLines}
            `
        }).join('\\vspace{3mm} \n')}
        `
    },

    resumeDefinitions() {
        return stripIndent`
      %\\renewcommand{\\encodingdefault}{cg}
      %\\renewcommand{\\rmdefault}{lgrcmr}

      \\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

      % DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

      \\newcommand{\\area} [2] {
          \\vspace*{-9pt}
          \\begin{verse}
              \\textbf{#1}   #2
          \\end{verse}
      }

      \\newcommand{\\lineunder} {
          \\vspace*{-8pt} \\\\
          \\hspace*{-18pt} \\hrulefill \\\\
      }

      \\newcommand{\\header} [1] {
          {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
          \\vspace*{-6pt} \\lineunder
      }

      \\newcommand{\\employer} [3] {
          { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
      }

      \\newcommand{\\contact} [3] {
          \\vspace*{-10pt}
          \\begin{center}
              {\\Huge \\scshape {#1}}\\\\
              #2 \\\\ #3
          \\end{center}
          \\vspace*{-8pt}
      }

      \\newenvironment{achievements}{
          \\begin{list}
              {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
          \\end{list}
      }

      \\newcommand{\\schoolwithcourses} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
          \\vspace*{5pt}
      }

      \\newcommand{\\school} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
      }
      % END RESUME DEFINITIONS %%%%%%%%%%%%%%%%%%%%%%%
    `
    }
}

function template1(values: SanitizedValues) {
    const {headings = {}} = values

    return stripIndent`
    \\documentclass[a4paper]{article}
    \\usepackage{hyperref}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\usepackage{textcomp}
    \\usepackage[utf8]{inputenc}
    \\usepackage[T1]{fontenc}
    \\textheight=10in
    \\pagestyle{empty}
    \\raggedright

    ${generator.resumeDefinitions()}

    \\begin{document}
    \\vspace*{-40pt}

    ${values.sections
        .map(section => {
            switch (section) {
                case 'profile':
                    return generator.profileSection(values.basics)

                case 'education':
                case 'work':
                case 'skills':
                case 'projects':
                case 'awards':
                case 'volunteer':
                case 'interests':
                case 'por':
                case 'publications':
                case 'extraCurricular':
                    return generator[`${section}Section`](values[section], headings[section])
                default:
                    return ''
            }
        })
        .join('\n\n')}

    ${WHITESPACE}
    \\end{document}
  `
}

export default template1
