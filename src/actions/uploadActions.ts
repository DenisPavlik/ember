"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

export async function uploadToS3(formData: FormData) {
  const file = formData.get("file") as File;

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP and GIF images are allowed");
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size must be under ${MAX_SIZE_MB}MB`);
  }

  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
    },
  });

  const ext = file.name.split(".").pop() || "jpg";
  const newFileName = uniqid() + "." + ext;
  const bucket = process.env.AWS_BUCKET;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: newFileName,
    ACL: "public-read",
    Body: buffer,
    ContentType: file.type,
  }));

  return {
    newFileName,
    ext,
    url: `https://${bucket}.s3.amazonaws.com/${newFileName}`,
  };
}
