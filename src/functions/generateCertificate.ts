import { document } from "../utils/dynamodbClient"
import chromium from "chrome-aws-lambda"
import * as path from "path"
import * as fs from "fs"
import * as handlebars from "handlebars"
import * as dayjs from "dayjs"

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

export const handler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

  await document.put({
    TableName: 'users_certificates',
    Item: {
      id,
      name,
      grade
    }
  }).promise()

  const medalPath = path.join(process.cwd(), 'src', 'tamplates', 'selo.png')
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