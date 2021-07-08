import requireDirectory from 'require-directory';
import path from 'path';

const mockData = {};

requireDirectory(module, '.', {
  visit(m, filename) {
    const key = path.relative(__dirname, filename);
    mockData[key] = m;
  },
});

export default function dataByKey(key) {
  if (mockData[key]) {
    return mockData[key];
  }
  throw new Error(`Missing key ${key}`);
}
