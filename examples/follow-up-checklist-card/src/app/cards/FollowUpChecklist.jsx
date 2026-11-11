import React from 'react';
import { Flex, Text, hubspot } from '@hubspot/ui-extensions';
import { checklist } from './checklist.mjs';

const h = React.createElement;

hubspot.extend(() => h(Flex, { direction: 'column', gap: 'small' },
  h(Text, null, 'Sample follow-up checklist'),
  ...checklist.map((item, index) => h(Text, { key: index }, `${index + 1}. ${item}`))
));
