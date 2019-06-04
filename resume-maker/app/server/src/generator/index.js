/**
 * @flow
 */

import latex from 'node-latex'
import prettify from 'pretty-latex'
import Archiver from 'archiver'
import { stripIndent } from 'common-tags'
import getTemplateDataV1 from './v1/templates'
import getTemplateDataV2 from './v2/templates'
import type { Transform } from 'stream'
import type { SanitizedValues } from '../types'

/**
 * Generates a LaTeX document from the request body,
 * and then generates a PDF from that document.
 *
 * @param formData The request body received from the client.
 *
 * @return The generated PDF.
 */

function generatePDF(formData: SanitizedValues, version?: string = "v1"): Transform {
    let {texDoc, opts} = {};
    if (version === "v1") {
        let templateData = getTemplateDataV1(formData)
        texDoc = templateData.texDoc
        opts = templateData.opts || {}
    } else if(version === "v2") {
        let templateData = getTemplateDataV2(formData)
        texDoc = templateData.texDoc
        opts = templateData.opts || {}
    }
  const pdf = latex(texDoc, opts)

  return pdf
}

/**
 * Generates resume source files from the request body,
 * and then saves it to a zip which is then sent to the client.
 *
 * @param formData The request body received from the client.
 *
 * @return The generated zip.
 */

function generateSourceCode(formData: SanitizedValues, version?: string = "v1"): Transform {
    let {texDoc, opts} = {};
    if (version === "v1") {
        let templateData = getTemplateDataV1(formData)
        texDoc = templateData.texDoc
        opts = templateData.opts || {}
    } else if(version === "v2") {
        let templateData = getTemplateDataV2(formData)
        texDoc = templateData.texDoc
        opts = templateData.opts || {}
    }
    const prettyDoc = prettify(texDoc)
    const zip = Archiver('zip')
    const readme = makeReadme(formData.selectedTemplate, opts.cmd)

    zip.append(prettyDoc, { name: 'resume.tex' })
    zip.append(readme, { name: 'README.md' })

    if (opts.inputs) {
      zip.directory(opts.inputs, '../')
    }

    zip.finalize()

    return zip
}

/**
 * Generates a README to include in the output zip.
 * It details how to use the generated LaTeX source code.
 *
 * @param template The specified resume template.
 * @param cmd The LaTeX command that is used to generate the PDF.
 *
 * @return The generated README text.
 */

function makeReadme(template: number, cmd?: string = 'pdflatex'): string {
  return stripIndent`
    # Resumake Template ${template}
    > LaTeX code generated at [resumake.io](https://resumake.io)

    ## Usage
    To generate a PDF from this LaTeX code, navigate to this folder in a terminal and run:

        ${cmd} resume.tex

    ## Requirements
    You will need to have \`${cmd}\` installed on your machine.

    Alternatively, you can use a site like [ShareLaTeX](https://sharelatex.com) to build and edit your LaTeX instead.
  `
}

export { generatePDF, generateSourceCode, makeReadme }
