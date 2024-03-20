from loguru import logger
import boto3


AWS_BUCKET = "chat-with-pdf-divyansh"
REGION = "ap-south-1"

session = boto3.Session(
    aws_access_key_id = 'AKIATCKAQ7K54MD5P7SF',
    aws_secret_access_key = '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',
)
s3 = session.resource('s3')
bucket = s3.Bucket(AWS_BUCKET)

async def s3_upload(contents: bytes, key: str):
    logger.info(f'Uploading {key} to S3, Bucket: {AWS_BUCKET}')  # Debug print
    try:
        bucket.put_object(Key=key, Body=contents, Bucket=AWS_BUCKET)
        object_url = f"https://s3.{REGION}.amazonaws.com/{AWS_BUCKET}/{key}"
        return object_url
        
    except Exception as e:  # Add a general exception handler for further debugging
        logger.error(f"Error uploading to S3: {e}")
        raise # Re-raise to propagate
