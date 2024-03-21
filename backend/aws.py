from loguru import logger
import aioboto3
import os

AWS_BUCKET = os.getenv("AWS_BUCKET")
REGION = os.getenv("AWS_REGION")

session = aioboto3.Session(
    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY"),
)


async def s3_upload(contents: bytes, key: str):
    async with session.client('s3') as s3_client:
        logger.info(f'Uploading {key} to S3, Bucket: {AWS_BUCKET}')  # Debug print
        try:
            await s3_client.put_object(Key=key, Body=contents, Bucket=AWS_BUCKET)
            object_url = f"https://s3.{REGION}.amazonaws.com/{AWS_BUCKET}/{key}"
            return object_url
            
        except Exception as e:  # Add a general exception handler for further debugging
            logger.error(f"Error uploading to S3: {e}")
            raise # Re-raise to propagate
