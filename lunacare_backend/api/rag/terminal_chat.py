import sys
import os
from time import sleep
from typing import Optional
import threading
from queue import Queue
import readchar
import colorama
from colorama import Fore, Style, Back
from app.chatbot import LunaCareBot
from app.emotion import detect_emotion
from app.voice_handler import text_to_speech, recognize_speech_from_audio

# Initialize colorama for cross-platform colored output
colorama.init()

class TerminalChat:
    def __init__(self):
        self.bot = LunaCareBot(use_nvidia=False)  # Change to False for OpenAI
        self.bot.initialize_vectorstore("data/Features.pdf")
        self.voice_enabled = False
        self.input_queue = Queue()
        self.should_exit = False

    def print_welcome(self):
        """Print welcome message with styling"""
        print(f"\n{Back.BLUE}{Fore.WHITE} Welcome to LunaCare AI Terminal Chat {Style.RESET_ALL}")
        print("\nCommands:")
        print(f"{Fore.CYAN}'/voice' - Toggle voice mode")
        print("'/clear' - Clear screen")
        print("'/exit'  - Exit chat")
        print(f"Just type normally to chat{Style.RESET_ALL}\n")

    def clear_screen(self):
        """Clear the terminal screen"""
        os.system('cls' if os.name == 'nt' else 'clear')

    def print_bot_response(self, response: str, emotion: Optional[str] = None):
        """Print bot response with styling"""
        print(f"\n{Fore.GREEN}🤖 LunaCare AI: {Style.RESET_ALL}", end='')
        
        # Print response word by word for a more natural feel
        words = response.split()
        for word in words:
            print(word, end=' ', flush=True)
            sleep(0.05)  # Adjust timing as needed
        
        if emotion:
            print(f"\n{Fore.YELLOW}Detected emotion: {emotion}{Style.RESET_ALL}")
        print()

    def handle_voice_input(self):
        """Handle voice input in a separate thread"""
        print(f"\n{Fore.CYAN}🎤 Listening... (Press 'q' to stop){Style.RESET_ALL}")
        
        # Save audio to temporary file
        temp_audio = "temp/input.wav"
        # Here you would implement actual audio recording
        # For now, we'll simulate it
        text = recognize_speech_from_audio(temp_audio)
        self.input_queue.put(text)

    def run(self):
        """Main chat loop"""
        self.print_welcome()
        
        while not self.should_exit:
            try:
                print(f"\n{Fore.BLUE}You:{Style.RESET_ALL} ", end='', flush=True)
                
                if self.voice_enabled:
                    self.handle_voice_input()
                    user_input = self.input_queue.get()
                else:
                    user_input = input().strip()

                # Handle commands
                if user_input.lower() == '/exit':
                    print(f"\n{Fore.YELLOW}Goodbye! Take care! 👋{Style.RESET_ALL}")
                    break
                elif user_input.lower() == '/clear':
                    self.clear_screen()
                    self.print_welcome()
                    continue
                elif user_input.lower() == '/voice':
                    self.voice_enabled = not self.voice_enabled
                    status = "enabled" if self.voice_enabled else "disabled"
                    print(f"\n{Fore.YELLOW}Voice mode {status}{Style.RESET_ALL}")
                    continue
                elif not user_input:
                    continue

                # Process input and get response
                print(f"\n{Fore.YELLOW}Processing...{Style.RESET_ALL}")
                emotion, _ = detect_emotion(user_input)
                response = self.bot.generate_response(user_input)
                
                # Print response
                self.print_bot_response(response, emotion)
                
                # Voice output if enabled
                if self.voice_enabled:
                    text_to_speech(response)

            except KeyboardInterrupt:
                print(f"\n\n{Fore.YELLOW}Chat interrupted. Use '/exit' to quit properly.{Style.RESET_ALL}")
            except Exception as e:
                print(f"\n{Fore.RED}Error: {str(e)}{Style.RESET_ALL}")

def main():
    # Ensure temp directory exists
    os.makedirs("temp", exist_ok=True)
    
    # Start chat interface
    chat = TerminalChat()
    chat.run()

if __name__ == "__main__":
    main()