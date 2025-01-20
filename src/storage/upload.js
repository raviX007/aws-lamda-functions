const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client();
//const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_NAME = "r-bucket2025";
console.log("BUCKET_NAME is : ", BUCKET_NAME)

const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'No file content provided'
        })
      };
    }

    const fileContent = Buffer.from(event.body, 'base64');
    const fileName = event.headers['file-name'] || `document-${Date.now()}.pdf`;
    const fileType = event.headers['content-type'] || 'application/pdf';

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: fileType
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'File uploaded successfully',
        fileName,
        bucket: BUCKET_NAME
      })
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error uploading file'
      })
    };
  }
};

module.exports.handler = handler;
