import { checklist } from './src/app/cards/checklist.mjs';

console.log('Sample follow-up checklist');
for (const [index, item] of checklist.entries()) {
  console.log(`${index + 1}. ${item}`);
}
