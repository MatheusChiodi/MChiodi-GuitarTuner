import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PitchDetector } from 'pitchy';

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.css'],
})
export class TunerComponent implements OnInit, OnDestroy {
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private source!: MediaStreamAudioSourceNode;
  private detector!: PitchDetector<Float32Array>;
  private rafId: number = 0;

  note: string = '–';
  detune: number = 0;
  frequency: number | null = null;
  clarity: number = 0;
  pointerRotation: string = 'rotate(0deg)';

  isRunning: boolean = false;
  buttonLabel: string = 'START';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  async toggleTuner() {
    if (this.isRunning) {
      this.stopTuner();
    } else {
      await this.startTuner();
    }
  }

  async startTuner() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const fftSize = 2048;

      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = fftSize;

      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);

      const buffer = new Float32Array(fftSize);

      this.detector = new PitchDetector<Float32Array>(
        fftSize,
        (len) => new Float32Array(len)
      );

      this.isRunning = true;
      this.buttonLabel = 'STOP';

      const update = () => {
        if (!this.isRunning) return;

        this.analyser.getFloatTimeDomainData(buffer);

        const [frequency, clarity] = this.detector.findPitch(
          buffer,
          this.audioContext.sampleRate
        );

        if (clarity > 0.94 && frequency) {
          const { note, detune } = this.getNoteAndDetune(frequency);

          this.ngZone.run(() => {
            this.note = note;
            this.detune = detune;
            this.pointerRotation = `rotate(${Math.max(
              -50,
              Math.min(50, detune)
            )}deg)`;
          });
        } else {
          this.ngZone.run(() => {
            this.detune = 0;
            this.note = '–';
            this.pointerRotation = 'rotate(0deg)';
          });
        }

        this.rafId = window.setTimeout(update, 30);
      };

      update();
    } catch (err) {
      alert(
        '⚠️ Não foi possível acessar o microfone. Verifique se a permissão está ativada.'
      );
      console.error(err);
    }
  }

  stopTuner() {
    this.isRunning = false;
    this.buttonLabel = 'START';
    cancelAnimationFrame(this.rafId);
    this.audioContext?.close();
    this.note = '–';
    this.detune = 0;
    this.pointerRotation = 'rotate(0deg)';
  }

  ngOnDestroy() {
    this.stopTuner();
  }

  private getNoteAndDetune(freq: number): { note: string; detune: number } {
    const A4 = 440;
    const semitone = 69 + 12 * Math.log2(freq / A4);
    const rounded = Math.round(semitone);
    const cent = (semitone - rounded) * 100;

    const notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const noteIndex = (rounded + 1200) % 12;
    const note = notes[noteIndex];

    return { note, detune: cent };
  }
}
