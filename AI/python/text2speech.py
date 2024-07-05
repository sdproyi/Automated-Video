import sqlite3
from TTS.api import TTS

# Step 1: Connect to the SQLite database
conn = sqlite3.connect('../../db/main.sqlite')
cursor = conn.cursor()

# Step 2: Fetch the text data from the first row of the text2speech table
cursor.execute("SELECT text FROM text2speech LIMIT 1")
text_data = cursor.fetchone()

if text_data:
    text = text_data[0]  # Extract the text content from the fetched data
    
    # Step 3: Initialize TTS with the English VCTK model
    tts = TTS(model_name="tts_models/en/vctk/vits")
    
    # Get the list of available speakers
    speakers = tts.speakers
    
    # Ensure speaker 4 is available
    if len(speakers):
        #6 is nice 8 sounds like 6
        # 10, 11
        chosen_speaker = speakers[6]  # Index 3 corresponds to the 4th speaker (0-based index)
        
        # Step 4: Use the fetched text as input to the TTS function with the specified speaker
        output_file = "text2speech.wav"
        tts.tts_to_file(text=text, speaker=chosen_speaker, file_path=output_file)
        
        print(f"Speech generated using speaker {chosen_speaker}. Saved to {output_file}")
    else:
        print(f"Speaker ]  is not available. The model has {len(speakers)} speakers.")
else:
    print("No text found in the database.")

# Close the database connection
conn.close()