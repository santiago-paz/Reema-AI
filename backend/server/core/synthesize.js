const path = require('path'),
  sdk = require("microsoft-cognitiveservices-speech-sdk"),
  key = process.env.AZURE_KEY,
  region = process.env.AZURE_REGION,
  speechConfig = sdk.SpeechConfig.fromSubscription(key, region),
  { createRandomFilename } = require("./createRandomFilename")

function synthesize(text, callback) {
  const audioFileName = path.join(__dirname, `../voice-audios/${createRandomFilename()}.wav`),
    audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFileName),
    synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  speechConfig.speechSynthesisVoiceName = "es-AR-ElenaNeural";
  synthesizer.speakTextAsync(text,
    result => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log(`synthesis finished: ${audioFileName}`);
      } else {
        console.error(`Speech synthesis canceled, ${result.errorDetails}
          Did you set the speech resource key and region values?`);
      }
      synthesizer.close();
      callback(
        audioFileName
      );
    },
    err => {
      console.trace(`err - ${err}`);
      synthesizer.close();
    });
}

exports.synthesize = synthesize;
