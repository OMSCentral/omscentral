// https://gist.github.com/mikelehen/3596a30bd69384624c11

class IdGenerator {
  static characters =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  private lastPushTime = 0;

  generate = (): string => {
    const { characters } = IdGenerator;

    let now = new Date().getTime();
    const isDuplicateTime = now === this.lastPushTime;
    this.lastPushTime = now;

    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
      timeStampChars[i] = characters.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    if (now !== 0) {
      throw new Error('We should have converted the entire timestamp.');
    }

    const lastRandChars: number[] = [];
    let id = timeStampChars.join('');
    let i: number;

    if (!isDuplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }

    for (i = 0; i < 12; i++) {
      id += characters.charAt(lastRandChars[i]);
    }

    if (id.length !== 20) {
      throw new Error('Length should be 20.');
    }

    return id;
  };
}

const idGenerator = new IdGenerator();

export const id = (): string => idGenerator.generate();
