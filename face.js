// Based on https://kylemcdonald.github.io/cv-examples/

const FaceType = {
  none: 'none',
  unknown: 'unknown',
}

Object.keys(emotionModel).forEach(emotion => FaceType[emotion] = emotion);

class FaceDetector {
  constructor(width, height) {
    this.w = width || 640;
    this.h = height || 480;
  }

  setup() {
    this.classifier = new emotionClassifier();
    this.capture = createCapture({
      audio: false,
      video: {
        width: this.w,
        height: this.h
      }
    }, () => {
      console.log('capture ready.');
    });
    this.capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    this.capture.size(w, h);
    this.capture.hide();

    colorMode(HSB);

    this.tracker = new clm.tracker();
    this.tracker.init();
    this.tracker.start(capture.elt);

    classifier.init(emotionModel);
  }

  update() {
    let faceType = FaceType.unknown;

    if (tracker.getCurrentPosition()) {
      let predictions = classifier.meanPredict(tracker.getCurrentParameters());

      if (predictions) {
        faceType = predictions.reduce((mostLikely, prediction) =>
          (mostLikely == null || prediction.value > mostLikely.value) ? prediction : mostLikely
        ).emotion;
      }
    } else {
      faceType = FaceType.none;
    }

    return faceType
  }
}
