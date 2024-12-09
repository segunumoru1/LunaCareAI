# **LunaCare AI**

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
- **React SPA**: A dynamic single-page application for user interaction.
- **Webkit Speech Recognition**: Enables real-time speech-to-text capabilities.

### **Backend**
- **Django REST Framework**: Powers API endpoints for communication between frontend and backend.
- **LangChain & OpenAI APIs**: Provides chatbot functionality and emotion-aware NLP.
- **Librosa**: Facilitates speech analysis for emotion detection.

### **AI Features**
- **LunaBot RAG**: A Retrieval-Augmented Generation (RAG)-based AI assistant for contextual responses.
- **OpenAI Text-to-Speech**: Converts chatbot text responses to audio.
- **Emotion Detection**: Leverages voice data to understand user sentiment.

---

## **Skills and Methodologies**

- **Natural Language Processing (NLP)** for sentiment and contextual understanding.
- **Speech Signal Processing** for analyzing voice emotions using `librosa`.
- **Agile Development** for iterative development cycles.
- **RESTful API Design** to ensure smooth integration between system components.
- **AI Model Deployment** for real-world applications in wellness.

---

## **System Architecture**

### **Architecture Workflow Diagram**

This architecture illustrates the integration of various components for a seamless user experience:

1. **User Interaction**: Users interact with the system via a **React SPA**, which uses **Webkit Speech Recognition** for voice input.
2. **Backend Processing**: Voice and text queries are processed by the **Django REST API**, which manages data flow and calls relevant AI modules.
3. **AI Modules**:
   - **LunaBot RAG**: Delivers empathetic and contextually accurate responses.
   - **Emotion Analysis**: Detects user sentiment using voice input and `librosa`.
4. **Output**:
   - Responses are synthesized using **OpenAI Text-to-Speech** for audio feedback.
   - Recommendations are presented via the **React SPA**.

![Architecture Workflow Diagram Placeholder](#)

---

## **Project Limitations**

- **Emotion Detection Accuracy**: Emotion analysis from voice data can vary based on input quality and ambient noise.
- **Limited Dataset for RAG**: The chatbot's knowledge is confined to the provided vector store data.
- **Dependency on API Availability**: External APIs like OpenAI and NVIDIA are integral and must remain operational for full functionality.
- **Real-Time Performance**: Processing delays may occur with complex queries or poor internet connectivity.

---

## **Future Plans**

### **Short-Term (6-12 Months)**
- Enhance the chatbot's NLP capabilities for emotion-based responses.
- Introduce a robust community platform for peer support.
- Integrate wearable device data for personalized health metrics.

### **Mid-Term (1-2 Years)**
- Expand analytics for in-depth health insights.
- Enable integration with electronic health records (EHRs) for holistic health tracking.
- Explore underserved markets, including older adults and chronic condition management.

### **Long-Term (2-5 Years)**
- Develop AR/VR integrations for immersive wellness experiences.
- Establish LunaCare AI as a global leader in postpartum care across multiple languages and countries.
- Collaborate with researchers to pioneer advancements in postpartum wellness.

---

## **How to Clone the Project**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/LunaCareAI.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd LunaCareAI
   ```
3. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate    # For MacOS/Linux
   venv\Scripts\activate       # For Windows
   ```
4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
5. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   OPENAI_API_KEY=<your_openai_api_key>
   NVIDIA_API_KEY=<your_nvidia_api_key>
   ```
6. **Run the Application**
   ```bash
   python minimain.py
   ```
7. **Access the Application**
   Open your browser and navigate to the frontend or test via the terminal.

---

## **Contact Information**
For issues, feedback, or contributions, feel free to reach out via the project's [GitHub Issues](https://github.com/your-username/LunaCareAI/issues).
