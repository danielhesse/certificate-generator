export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World Ignite Serverless!',
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}