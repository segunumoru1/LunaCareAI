# **LunaCare AI**

LunaCare AI is an intelligent and empathetic postpartum wellness assistant designed to provide emotional support, helpful resources, and personalized wellness solutions for postpartum individuals. The system leverages advanced technologies like AI-powered chatbots, voice sentiment analysis, and a resource aggregation mechanism to enhance the user experience.

---

## **Table of Contents**

1. [Overview](#overview)  
2. [Problem Statement](#problem-statement)  
3. [Technologies Used](#technologies-used)  
4. [Skills and Methodologies](#skills-and-methodologies)  
5. [System Architecture](#system-architecture)  
   - [Architecture Workflow Diagram](#architecture-workflow-diagram)  
6. [Project Limitations](#project-limitations)  
7. [Future Plans](#future-plans)  
8. [Installation and Setup](#installation-and-setup)  
   - [Prerequisites](#prerequisites)  
   - [Clone the Repository](#clone-the-repository)  
   - [Environment Setup](#environment-setup)  
9. [Usage](#usage)  
   - [Running the Application](#running-the-application)  
   - [Voice Sentiment Detection](#voice-sentiment-detection)  
10. [License](#license)
11. [Contact Information](#contact-information)  
12. [Contributors](#contributors)  

---

## **Overview**

**LunaCare AI** is an AI-powered postpartum wellness assistant designed to provide compassionate and empathetic support to new mothers navigating the challenges of postpartum recovery. The system integrates advanced AI technologies for conversation, emotion detection, and resource aggregation to deliver personalized recommendations and emotional support. 

This project combines a user-friendly interface, intelligent backend processing, and cutting-edge voice and text analysis capabilities to create a holistic wellness platform.

---
## **Problem Statement**

Postpartum recovery is a critical period for mothers, yet many struggle with limited access to reliable resources, emotional support, or tailored wellness recommendations. The lack of empathetic and personalized assistance exacerbates feelings of isolation, anxiety, and stress. 

**LunaCare AI** aims to bridge this gap by offering:
- Emotional support via an AI-powered chatbot.
- Resource aggregation for postpartum recovery.
- Emotion and sentiment detection through speech and text analysis.
- Seamless integration of text-to-speech and voice-based interactions.

---

## **Technologies Used**

### **Frontend**
- **React SPA (Single Page Application)**: A dynamic single-page application for user interaction.
- **Webkit Speech Recognition**: Enables real-time speech-to-text capabilities.

### **Backend**
- **Django REST Framework**: Powers API endpoints for communication between frontend and backend.
- **LangChain & OpenAI APIs**: Provides chatbot functionality and emotion-aware NLP.
- **Librosa**: Facilitates speech analysis for emotion detection and voice sentiment analysis.

### **AI Features**
- **LunaBot RAG**: A Retrieval-Augmented Generation (RAG)-based AI assistant for contextual responses.
- **OpenAI Text-to-Speech**: gTTS (Google Text-to-Speech) is used converts chatbot text responses to audio.
- **AI Models**: OpenAI GPT-4, NVIDIA AI models
- **Emotion Detection**: Leverages voice data to understand user sentiment.
- **Database**: Vector stores for document retrieval
- **APIs**: OpenAI Chat API, OpenAI Text-to-Speech API   

---

## **Skills and Methodologies**

- Natural Language Processing (NLP)  
- Voice sentiment analysis
- Agile Development for iterative development cycles  
- Retrieval-Augmented Generation (RAG)  
- AI model integration for personalized responses and real-world applications in wellness 
- RESTful API development  
- Full-stack application development  

---

## **System Architecture**

LunaCare AI follows a modular architecture combining frontend, backend, and AI-based services.

### **Architecture Workflow Diagram**

The system architecture includes the following components:

1. **User Interaction**: Voice or text inputs from the user.  
2. **Frontend**: A React-based SPA that provides an intuitive user interface.  
3. **Speech Recognition**: Real-time voice input converted to text using webkit or SpeechRecognition library.  
4. **Backend (Django REST API)**: Serves as the application’s core logic and integrates LunaBot RAG.  
5. **AI Components**:  
   - LunaBot RAG for conversational AI.  
   - Librosa for detecting emotions from audio.  
6. **Text-to-Speech Output**: Converts AI responses into voice outputs.  

![Architecture Workflow Diagram Placeholder](https://github.com/segunumoru1/LunaCareAI/blob/main/lunarcare-app/public/image.png)

---

## **Project Limitations**

- **Limited Accuracy**: Limited accuracy in voice emotion detection for overlapping emotions.  
- **Internet Connectivity**: Dependency on internet connectivity for AI model interactions.  
- **Library Dependency**: Text-to-speech quality may vary depending on the selected library.
- **Emotion Detection Accuracy**: Emotion analysis from voice data can vary based on input quality and ambient noise.
- **Limited Dataset for RAG**: The chatbot's knowledge is confined to the provided vector store data.
- **Dependency on API Availability**: External APIs like OpenAI and NVIDIA are integral and must remain operational for full functionality.
- **Real-Time Performance**: Processing delays may occur with complex queries or poor internet connectivity.


---

## **Future Plans**

### Short-Term (6–12 months)  
- Enhance AI sentiment detection for better emotion recognition.  
- Expand community features for better user engagement.
- Introduce a robust community platform for peer support.
- Integrate wearable device data for personalized health metrics.
 

### Mid-Term (1–2 years)  
- Integrate wearable devices to provide holistic wellness tracking.  
- Develop personalized wellness plans using machine learning.
- Expand analytics for in-depth health insights.
- Enable integration with electronic health records (EHRs) for holistic health tracking.
- Explore underserved markets, including older adults and chronic condition management.
  

### Long-Term (2–5 years)  
- Broaden the mental health focus to include conditions like anxiety and depression.  
- Expand to global markets with multi-language support.
- Develop AR/VR integrations for immersive wellness experiences.
- Establish LunaCare AI as a global leader in postpartum care across multiple languages and countries.
- Collaborate with researchers to pioneer advancements in postpartum wellness.
  

---

## **Installation and Setup**

### **Prerequisites**

- Python 3.8 or above  
- Node.js and npm (for the React frontend)  
- Git  

### **Clone the Repository**

```bash
git clone https://github.com/segunumoru1/LunaCareAI.git
cd LunaCareAI
```

### **Environment Setup**

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Install frontend dependencies**:
   Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file and add your API keys for OpenAI and NVIDIA.

---

## **Usage**

### **Running the Application**

1. **Start the Backend Server**:
   ```bash
   python manage.py runserver
   ```

2. **Start the Frontend**:
   ```bash
   npm start
   ```

3. Access the app at `http://localhost:3000`.

### **Voice Sentiment Detection**

Run the `minimain.py` script for emotion detection from voice:
```bash
python minimain.py
```

---

## **Contact Information**
For issues, feedback, or contributions, feel free to reach out via the project's [GitHub Issues](https://github.com/segunumoru1/LunaCareAI/issues).

---
## **License**

This project is licensed under the [MIT License](./LICENSE).

---

## **Contributors**

- **Alexander Crabbe** – Backend Development  
- **Segun Umoru** – AI Model Integration  
- **Michael Gold** – Frontend Development 
