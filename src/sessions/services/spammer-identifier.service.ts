import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpammerIdentifierService {
  isSpammer(referer: string) {
    const spammerList = this.readFile();
    return referer && spammerList.some((spammer) => referer.includes(spammer));
  }

  private readFile() {
    return fs
      .readFileSync(path.join(__dirname, '../../spammers.txt'), 'utf8')
      .toString()
      .split('\n')
      .filter(Boolean);
  }
}
