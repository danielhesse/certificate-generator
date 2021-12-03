import { document } from "../utils/dynamodbClient"
import chromium from "chrome-aws-lambda"
import path from "path"
import fs from "fs"
import handlebars from "handlebars"
import dayjs from "dayjs"
import { APIGatewayProxyHandler } from "aws-lambda"

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface IHandlebarsTemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const templateCompile = async (data: IHandlebarsTemplate) => {
  const filePath = path.join(process.cwd(), 'src', 'templates', 'certificate.hbs')

  const html = fs.readFileSync(filePath, 'utf-8')

  return handlebars.compile(html)(data)
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

  await document.put({
    TableName: 'users_certificates',
    Item: {
      id,
      name,
      grade
    }
  }).promise()

  const medalPath = path.join(process.cwd(), 'src', 'templates', 'selo.png')
  const medal = fs.readFileSync(medalPath, 'base64')

  // Generate Certificate
  const content = await templateCompile({
    id,
    name,
    grade,
    date: dayjs().format('DD/MM/YYYY'),
    medal
  })

  // Transform to PDF
  const browser = await chromium.puppeteer.launch({
    headless: true,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath
  })

  const page = await browser.newPage()

  await page.setContent(content)

  const pdf = await page.pdf({
    format: 'a4',
    landscape: true,
    path: process.env.IS_OFFLINE ? './certificate.pdf' : null,
    printBackground: true,
    preferCSSPageSize: true
  })

  await browser.close()

  // Save S3

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Certificate created!'
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}