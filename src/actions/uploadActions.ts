"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function uploadToS3(formData: FormData) {
  const file = formData.get("file") as File;
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
    },
  });

  const ext = file.name.split('.').slice(-1)[0]
  const newFileName = uniqid() + '.' + ext;
  const bucket = process.env.AWS_BUCKET;

  const chunks = []
  //@ts-ignore
  for await (const chunk of file.stream()) {
    chunks.push(chunk)
  }

  const buffer = Buffer.concat(chunks)

  await s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: newFileName,
    ACL: 'public-read',
    Body: buffer,
    ContentType: file.type
  }))

  return {
    newFileName,
    ext,
    url: `https://${bucket}.s3.amazonaws.com/${newFileName}`
  };
}
