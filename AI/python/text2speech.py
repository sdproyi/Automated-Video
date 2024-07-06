import sqlite3
from TTS.api import TTS

# Step 1: Initialize TTS to access available models
tts = TTS()

# Step 2: List available TTS models
model_manager = tts.list_models()
available_models = model_manager.list_tts_models()
print("Available TTS Models:")
for model_name in available_models:
    print(model_name)

# Step 3: Connect to the SQLite database
conn = sqlite3.connect('../../db/main.sqlite')
cursor = conn.cursor()

# Step 4: Fetch the text data from the first row of the text2speech table
cursor.execute("SELECT text FROM text2speech LIMIT 1")
text_data = cursor.fetchone()

if text_data:
    text = text_data[0]  # Extract the text content from the fetched data
    
    # Step 5: Initialize TTS with the English VCTK model
    tts = TTS(model_name="tts_models/en/vctk/vits")
    
    # Get the list of available speakers
    speakers = tts.speakers
    
    # Ensure speaker 6 is available
    if len(speakers) > 6:
        chosen_speaker = speakers[6]  # Index 6 corresponds to the 7th speaker (0-based index)
        
        # Step 6: Use the fetched text as input to the TTS function with the specified speaker
        output_file = "../../Video-generator/public/text2speech.wav"
        tts.tts_to_file(text=text, speaker=chosen_speaker, speed=0.8, file_path=output_file)
        
        print(f"Speech generated using speaker {chosen_speaker}. Saved to {output_file}")
    else:
        print(f"Speaker 6 is not available. The model has {len(speakers)} speakers.")
else:
    print("No text found in the database.")

# Close the database connection
conn.close()
