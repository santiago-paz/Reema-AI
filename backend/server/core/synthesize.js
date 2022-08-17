var sdk = require("microsoft-cognitiveservices-speech-sdk");
const key = process.env.AZURE_KEY;
const region = process.env.AZURE_REGION;
const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
speechConfig.speechSynthesisVoiceName = "es-AR-ElenaNeural";

function synthesize(text, callback) {
  const audioFile = "server/voice-audios/YourAudioFile.wav";
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(text,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error("Speech synthesis canceled, " + result.errorDetails +
          "\nDid you set the speech resource key and region values?");
      }
      synthesizer.close();
      callback(result);
    },
    function (err) {
      console.trace("err - " + err);
      synthesizer.close();
    });
}

exports.synthesize = synthesize;
