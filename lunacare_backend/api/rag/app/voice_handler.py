import speech_recognition as sr
from gtts import gTTS
import os
from playsound import playsound

def recognize_speech_from_audio(audio_path):
    """Convert speech in audio to text."""
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)  # Replace with preferred API
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


def record_audio(temp_file="temp_input.wav", duration=5):
    """Record audio from the microphone."""
    import sounddevice as sd
    from scipy.io.wavfile import write

    print("Recording...")
    fs = 44100  # Sample rate
    audio_data = sd.rec(int(duration * fs), samplerate=fs, channels=2)
    sd.wait()  # Wait until recording is finished
    write(temp_file, fs, audio_data)  # Save as WAV file
    print(f"Audio recorded to {temp_file}")
    return temp_file

