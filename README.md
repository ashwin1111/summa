# Chat with Pdf
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
 ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![LlamaIndex]( https://img.shields.io/badge/LlamaIndex-8A2BE2)


### Youtube Video Link : https://www.youtube.com/watch?v=yazVbILsFco&ab_channel=DivyanshSharma

### Tagline
Intelligent document exploration and conversation powered by AI as an assignment for internship.

## Overview 

This project is a chat application that empowers users to have natural-language conversations about the content of their PDFs, unlocking valuable insights effortlessly. Also user can log in see their saved documents and select a previously uploaded document for prompting.

The application is built using a tech stack that includes React, FastAPI, LlamaIndex2, and AWS.

Key Features

1. **Secure User Authentication**: Robust registration and login with JWT authentication for a protected experience.

2. **Document History**: Easily view and manage a history of past document interactions.

3. **Document Deletion**: Maintain control over your data by deleting documents when needed.

4. **Responsive UI**: The user experience is seamless across all devices

4. **Intuitive Document Selection**: Conveniently choose the PDF you want to converse with.

5. **Natural Language Queries**: Ask questions and gain insights from your PDFs, just like having a conversation.

6. **Global State Management**: Streamlined application state management using Zustand.

7. **Cloud-Based Infrastructure**: Leverages AWS S3 for reliable file storage and AWS RDS (Postgres) for database management.

## Database Schema

The PostgreSQL database includes three tables:

1. `User`: Contains user details including id, username, email, and password (encrypted using bcrypt).
2. `Documents`: Contains document details including id, name, link (link received after uploading the document to AWS S3), and a foreign key from the users table indicating the user the document belongs to.
3. `Requests`: Contains a prompt and response , along with two foreign keys user id from users table and document id from documents table

## Flow

1. User registers and logs in.
2. User can view all the documents they have worked on (history) and can delete documents if desired.
3. User selects a document to retrieve information.
4. User can query as desired.

I have tried my best in the given time frame to handle all cases for seamless user experience

### Tech Stack

- Frontend: React (JavaScript) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- Backend: FastAPI (Python)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
- AI/LLM: Langchain, LlamaIndex2
- Cloud Services: AWS S3, AWS RDS (Postgres)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### How to run

1. Clone the repository
2. Install Dependencies:
- `cd .\chat-with-pdf`
- `yarn install`
3. Install python dependencies (I recommend using a venv)
- first go to root directory, then
- ` cd .\backend`
- `python3 -m venv env`
- `.\env\Scripts\activate`

4. Install python dependencies
- `pip install -r requirements.txt `

### Usage

- Register: Create a new account.
- Login: Log in with your credentials.
- Upload Document: Upload a PDF to start a conversation.
- View History: Access the history of your past interactions.
- Select Document: Choose a document from your history.
- Ask Questions: Engage in a natural conversation with the AI about your chosen document.

### Project Structure

- `chat-with-pdf`: Contains the React frontend code.
- `backend`: Contains the FastAPI backend code.

### Additional Notes

1. ***Security***: I've securely implemented user authentication and password encryption (using bcrypt) to protect user data.
2. ***Data Management***: The utilization of AWS RDS (Postgres) ensures robust and scalable data storage for document metadata and user information.
3. ***Performance***: I'm continually focused on optimizing PDF processing and answer generation to provide a seamless user experience.
