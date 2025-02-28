// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Import other required libraries
const fs = require('node:fs');
const util = require('node:util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function quickStart() {
  // The text to synthesize
  const text = 'hello, world! This is Sam';

  // Construct the request
  const request = {
    input: {text: text},
    // Specify the exact voice you want to use
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-J'
    },
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

quickStart();
