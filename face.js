class FaceDetector {
  constructor(width, height) {
    this.w = width || 640;
    this.h = height || 480;
    this.options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128 });
    this.captureReady = false;
    this.detectorReady = false;
  }

  setup() {
    this.capture = createCapture({
      audio: false,
      video: {
        width: this.w,
        height: this.h
      }
    }, () => {
      console.log('capture ready.');
      this.captureReady = true;
    });
    this.capture.elt.setAttribute('playsinline', '');
    this.capture.size(this.w, this.h);
    this.capture.hide();

    faceapi.nets.tinyFaceDetector.loadFromUri('assets/models').then(() => {
      console.log('face detector ready.');
      this.detectorReady = true;
    })

    this.happinessLevel = 1; // 0 means unhappy, 1 means happy
  }

  update() {
    if (this.captureReady && this.detectorReady) {
      return faceapi.detectSingleFace(this.capture.elt, this.options).then(result => {
        // You're happy only if you aren't looking at the computer.
        const happyValue = result ? 0 : 1;
        this.happinessLevel = this.happinessLevel * 0.98 + happyValue * 0.02;
      });
    }
  }

  getHappinessLevel() {
    return this.happinessLevel;
  }
}
