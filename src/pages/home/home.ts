import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toTranslate: any; //restrict to int?
  translation: string; 
  translationDone: boolean;
  constructor(public navCtrl: NavController) {
    this.translationDone = false; 
  }
  translate() { //must be under 1000 for now
    let number = this.toTranslate;
    let digits = []; //the array of the digits inputted by the user
    let sNumber = number;
    let kanji = [];
    let kanjiCount = 0;

    for (var i = 0, len = sNumber.length; i < len; i += 1) { //put the number into an array. 
      digits.push(+sNumber.charAt(i));
    }

    kanji[0] = this.digitToKanji(number)
    if (kanji[0] == 'x') { //if it's a number with a set kanji, we are already done.
      if (digits[digits.length - 1] != 0) { //if it's not zero, put the number in the kanji array. 
        kanji[kanjiCount++] = this.digitToKanji(digits[digits.length - 1]);
      }

      if (digits.length - 2 >= 0 && digits[digits.length - 2] != 0) { //if there is a 10's digit, put 10 and the digit in the array
        kanji[kanjiCount++] = '十';
        if (digits[digits.length - 2] != 1)
          kanji[kanjiCount++] = this.digitToKanji(digits[digits.length - 2]);
      }

      if (digits.length - 3 >= 0 && digits[digits.length - 3] != 0) { //if there is a 100's digit, put 100 and the digit in the array
        kanji[kanjiCount++] = '百';
        if (digits[digits.length - 3] != 1)
          kanji[kanjiCount++] = this.digitToKanji(digits[digits.length - 3]);
      }

      kanji.reverse();
    }
    
    this.translation = kanji.join('');
    this.translationDone = true;
    //alert(kanji.join(''));

  }

  digitToKanji(digit: number) { //why does this need 'function'???!!!
    switch (digit = Math.floor(digit)) { //get rid of decimal. Too much for tonight
      case 0:
        return '零';
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 7:
        return '七';
      case 8:
        return '八';
      case 9:
        return '九';
      case 10:
        return '十';
      case 100:
        return '百';
      case 1000:
        return '千';
      case 10000:
        return '一万';
      default:
        return 'x';
    }
  }
}
