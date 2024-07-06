import json
from faster_whisper import WhisperModel

def transcribe_and_save(audio_file, output_file):
    model_size = "base.en"
    model = WhisperModel(model_size, device="cpu", compute_type="int8")

    segments, info = model.transcribe(audio_file, beam_size=5, word_timestamps=True)

    result = {
        "language": info.language,
        "language_probability": info.language_probability,
        "segments": []
    }

    for segment in segments:
        segment_data = {
            "id": segment.id,
            "start": segment.start,
            "end": segment.end,
            "text": segment.text,
            "words": [{"word": word.word, "start": word.start, "end": word.end} for word in segment.words]
        }
        result["segments"].append(segment_data)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Transcription saved to {output_file}")

# Usage
audio_file = "text2speech.wav"
output_file = "transcription.json"
transcribe_and_save(audio_file, output_file)

# Print a sample of the result
with open(output_file, 'r', encoding='utf-8') as f:
    data = json.load(f)
    print("\nSample of the JSON output:")
    print(json.dumps(data["segments"][0], indent=2))