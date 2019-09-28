// Based on https://kylemcdonald.github.io/cv-examples/

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
    this.capture.size(this.w, this.h);
    this.capture.hide();

    colorMode(HSB);

    this.tracker = new clm.tracker();
    this.tracker.init();
    this.tracker.start(this.capture.elt);

    this.classifier.init(emotionModel);
    this.happinessMeter = 1; // 0 means unhappy, 1 means happy
  }

  update() {
    let happyValue;

    if (this.tracker.getCurrentPosition()) {
      let predictions = this.classifier.meanPredict(this.tracker.getCurrentParameters());

      if (predictions) {
        const happy = predictions.find(prediction => prediction.emotion === 'happy');
        if (happy) {
          // We found a happy prediction, this is our new happyValue
          happyValue = happy.value;
        }
      }
    } else {
      // No faces detected, you're not at the computer, so you must be the happiest!
      happyValue = 1;
    }

    if (happyValue != null) {
      this.happinessMeter = constrain(this.happinessMeter * 0.95 + happyValue * 0.05, 0, 1);
    }
    return this.happinessMeter;
  }
}
