import React from 'react';

import { LeadingIconSearchInput } from '../common/LeadingIconSearchInput';

const PLACEHOLDER = 'Search movies, actors, directors...';

export function SearchTextField() {
  return <LeadingIconSearchInput placeholder={PLACEHOLDER} />;
}
