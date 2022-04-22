import { mdiNote, mdiFormatListBulleted } from '@mdi/js';

export default [
  {
    text: 'Notes',
    icon: mdiNote,
    to: { name: 'notes' },
  },
  {
    text: 'Categories',
    icon: mdiFormatListBulleted,
    to: { name: 'categories' },
  },
];
