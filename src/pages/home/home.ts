import { Component } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech'; //cordova plugin add cordova-plugin-tts
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  masks: any = {
    toTranslate: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
};
  toTranslate: any; //restrict to int?
  toTranslate_fixed: any;
  translation: string;
  translationDone: boolean;
  
  constructor(public navCtrl: NavController, private tts: TextToSpeech) {
    this.translationDone = false;
  }

  onTranslate(event: Event) {
    let toTranslate = (<HTMLInputElement>event.srcElement).value;
  
    this.toTranslate_fixed = toTranslate;
    this.convert(this.toTranslate_fixed);
  }

  speak(){
    this.tts.speak({text:this.translation, locale: 'ja', rate:1.35});
  }

  specialNames: string[] = [
    '', '万', '億', '兆', '京', '垓', '𥝱', '穣'];

  numNames: string[] = [
    '', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

  convertLessThanTenThousand(number) {
    let current;

    current = this.numNames[number % 10]; // Solve for ones
    number = Math.floor(number / 10);
    if (number === 0) {
      return current;
    } // Check if we're done

    if (number % 10 < 2) { if (number % 10 === 1) { current = '十' + current;}
    } else { // Solve for tens
      current = this.numNames[number % 10] + '十' + current;
    }
    number = Math.floor(number / 10);

    if (number === 0) { return current; } // Check if we're done

    if (number % 10 < 2) { if (number % 10 === 1) { current = '百' + current;}
    } else { // Solve for hundreds
      current = this.numNames[number % 10] + '百' + current;
    }
    number = Math.floor(number / 10);
    if (number === 0) { return current; } // Check if we're done

    return this.numNames[number] + '千' + current; // Return with thousands
  }

  convert(number) {

    if (number === 0) { this.translationDone = true; this.translation = "零"; return; }

    let prefix = '';
    let current = '';
    let place = 0;

    if (number < 0) {
      number = -number;
      prefix = 'マイナス';
    }

    do {
      const n: number = number % 10000;
      if (n !== 0) {
        const s = this.convertLessThanTenThousand(n);
        current = s + this.specialNames[place] + current;
      }
      place++;
      number = Math.floor(number / 10000);
    } while (number > 0);

    this.translationDone = true;
    this.translation = (prefix + current);
    return;
  }
}
