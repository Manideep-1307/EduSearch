// Information Retrieval Preprocessing Engine
// Handles tokenization, case normalization, stop-word elimination, and Porter Stemming

// Comprehensive educational & scientific English stopword list
export const STOP_WORDS = new Set<string>([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't",
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing',
  "don't", 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't",
  'have', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers',
  'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if',
  'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't",
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought',
  'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll",
  "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll",
  "they're", "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
  'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's",
  'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's",
  'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours',
  'yourself', 'yourselves'
]);

/**
 * Porter Stemmer implementation in pure TypeScript.
 * Conforms to Martin Porter's 1980 stemming algorithm for English words.
 */
class PorterStemmer {
  private static isConsonant(str: string, i: number): boolean {
    const ch = str[i];
    if ('aeiou'.includes(ch)) return false;
    if (ch === 'y') {
      return i === 0 ? true : !PorterStemmer.isConsonant(str, i - 1);
    }
    return true;
  }

  private static measure(str: string): number {
    let m = 0;
    let i = 0;
    const len = str.length;
    while (i < len && PorterStemmer.isConsonant(str, i)) i++;
    while (i < len) {
      while (i < len && !PorterStemmer.isConsonant(str, i)) i++;
      if (i >= len) break;
      while (i < len && PorterStemmer.isConsonant(str, i)) i++;
      m++;
    }
    return m;
  }

  private static hasVowel(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (!PorterStemmer.isConsonant(str, i)) return true;
    }
    return false;
  }

  private static endsWithDoubleConsonant(str: string): boolean {
    const len = str.length;
    if (len < 2) return false;
    if (str[len - 1] !== str[len - 2]) return false;
    return PorterStemmer.isConsonant(str, len - 1);
  }

  private static cvc(str: string): boolean {
    const len = str.length;
    if (len < 3) return false;
    if (
      PorterStemmer.isConsonant(str, len - 1) &&
      !PorterStemmer.isConsonant(str, len - 2) &&
      PorterStemmer.isConsonant(str, len - 3)
    ) {
      const ch = str[len - 1];
      if (ch === 'w' || ch === 'x' || ch === 'y') return false;
      return true;
    }
    return false;
  }

  public static stem(word: string): string {
    let w = word.toLowerCase();
    if (w.length < 3) return w;

    // Step 1a
    if (w.endsWith('sses')) w = w.slice(0, -2);
    else if (w.endsWith('ies')) w = w.slice(0, -2);
    else if (w.endsWith('ss')) { /* keep */ }
    else if (w.endsWith('s')) w = w.slice(0, -1);

    // Step 1b
    let step1bExtra = false;
    if (w.endsWith('eed')) {
      const stem = w.slice(0, -3);
      if (PorterStemmer.measure(stem) > 0) w = stem + 'ee';
    } else if (w.endsWith('ed')) {
      const stem = w.slice(0, -2);
      if (PorterStemmer.hasVowel(stem)) {
        w = stem;
        step1bExtra = true;
      }
    } else if (w.endsWith('ing')) {
      const stem = w.slice(0, -3);
      if (PorterStemmer.hasVowel(stem)) {
        w = stem;
        step1bExtra = true;
      }
    }

    if (step1bExtra) {
      if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) {
        w += 'e';
      } else if (
        PorterStemmer.endsWithDoubleConsonant(w) &&
        !w.endsWith('l') && !w.endsWith('s') && !w.endsWith('z')
      ) {
        w = w.slice(0, -1);
      } else if (PorterStemmer.measure(w) === 1 && PorterStemmer.cvc(w)) {
        w += 'e';
      }
    }

    // Step 1c
    if (w.endsWith('y')) {
      const stem = w.slice(0, -1);
      if (PorterStemmer.hasVowel(stem)) {
        w = stem + 'i';
      }
    }

    // Step 2
    const step2Map: [string, string][] = [
      ['ational', 'ate'], ['tional', 'tion'], ['enci', 'ence'], ['anci', 'ance'],
      ['izer', 'ize'], ['abli', 'able'], ['alli', 'al'], ['entli', 'ent'],
      ['eli', 'e'], ['ousli', 'ous'], ['ization', 'ize'], ['ation', 'ate'],
      ['ator', 'ate'], ['alism', 'al'], ['iveness', 'ive'], ['fulness', 'ful'],
      ['ousness', 'ous'], ['aliti', 'al'], ['iviti', 'ive'], ['biliti', 'ble']
    ];
    for (const [suffix, rep] of step2Map) {
      if (w.endsWith(suffix)) {
        const stem = w.slice(0, -suffix.length);
        if (PorterStemmer.measure(stem) > 0) {
          w = stem + rep;
        }
        break;
      }
    }

    // Step 3
    const step3Map: [string, string][] = [
      ['icate', 'ic'], ['ative', ''], ['alize', 'al'], ['iciti', 'ic'],
      ['ical', 'ic'], ['ful', ''], ['ness', '']
    ];
    for (const [suffix, rep] of step3Map) {
      if (w.endsWith(suffix)) {
        const stem = w.slice(0, -suffix.length);
        if (PorterStemmer.measure(stem) > 0) {
          w = stem + rep;
        }
        break;
      }
    }

    // Step 4
    const step4Suffixes = [
      'al', 'ance', 'ence', 'er', 'ic', 'able', 'ible', 'ant', 'ement',
      'ment', 'ent', 'ou', 'ism', 'ate', 'iti', 'ous', 'ive', 'ize'
    ];
    for (const suffix of step4Suffixes) {
      if (w.endsWith(suffix)) {
        const stem = w.slice(0, -suffix.length);
        if (PorterStemmer.measure(stem) > 1) {
          w = stem;
        }
        break;
      }
    }
    if (w.endsWith('sion') || w.endsWith('tion')) {
      const stem = w.slice(0, -3);
      if (PorterStemmer.measure(stem) > 1) {
        w = stem;
      }
    }

    // Step 5
    if (w.endsWith('e')) {
      const stem = w.slice(0, -1);
      const m = PorterStemmer.measure(stem);
      if (m > 1 || (m === 1 && !PorterStemmer.cvc(stem))) {
        w = stem;
      }
    }
    if (PorterStemmer.measure(w) > 1 && PorterStemmer.endsWithDoubleConsonant(w) && w.endsWith('l')) {
      w = w.slice(0, -1);
    }

    return w;
  }
}

export function tokenize(text: string): string[] {
  if (!text) return [];
  // Match contiguous alphanumeric sequences, lowercased
  const matches = text.toLowerCase().match(/[a-z0-9]+/g);
  return matches || [];
}

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function stemWord(word: string): string {
  return PorterStemmer.stem(word);
}

export function preprocessText(text: string): {
  tokens: string[];
  stopwordsRemoved: string[];
  stems: string[];
} {
  const tokens = tokenize(text);
  const stopwordsRemoved = removeStopwords(tokens);
  const stems = stopwordsRemoved.map(stemWord);
  return {
    tokens,
    stopwordsRemoved,
    stems,
  };
}
