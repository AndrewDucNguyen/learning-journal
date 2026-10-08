// const sum = require('./sum') Would have to remove babel and include type: commonjs in config
import { sum } from "./sum";

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});