import speech_recognition as sr
from gtts import gTTS
import os
from playsound import playsound

def recognize_speech_from_audio(audio_path):
    """
    Converts speech from an audio file into text.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            return "Sorry, I couldn't understand the audio."
        except sr.RequestError:
            return "There was an issue connecting to the speech recognition service."

def text_to_speech(response_text, output_path="temp/response.mp3"):
    """
    Converts text into speech and saves it as an audio file.
    """
    tts = gTTS(text=response_text, lang="en")
    tts.save(output_path)
    playsound(output_path)
    os.remove(output_path)