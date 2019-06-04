/**
 * @flow
 */

import Router from 'koa-router'
import formidable from 'koa2-formidable'
import { generatePDF, generateSourceCode } from '../generator'
import { sanitizer, jsonResume } from '../middleware'

const router = new Router({ prefix: '/api' })

/**
 * Router middleware
 */

router.use('/generate', sanitizer()) // Remove falsy values and empty objects/arrays from request body
router.use('/upload', formidable(), jsonResume()) // Parse multipart/form-data

/**
 * Generate PDF from form data
 */

router.post('/generate/resume', async ({ request, response }) => {
  response.body = generatePDF((request.body: any))
  response.type = 'application/pdf'
})

/**
 * Generate TeX source from form data
 */

router.post('/generate/source', async ({ request, response }) => {
  response.body = generateSourceCode((request.body: any))
  response.type = 'application/zip'
})

/**
 * Version 2
 * Generate PDF from form data
 */

router.post('/v2/generate/resume', async ({ request, response }) => {
    response.body = generatePDF((request.body: any), 'v2')
    response.type = 'application/pdf'
})

/**
 * Version 2
 * Generate TeX source from form data
 */

router.post('/v2/generate/source', async ({ request, response }) => {
    response.body = generateSourceCode((request.body: any), 'v2')
    response.type = 'application/zip'
})

/**
 * Handle JSON upload from input file
 */

router.post('/upload', async ({ request, response }) => {
  response.body = (request.jsonResume: any)
  response.type = 'application/json'
})

router.get('/test', ({request, response}) => {
  response.body="Engine is running";
})

export default router
