import React from 'react';

import { LeadingIconSearchInput } from '../common/LeadingIconSearchInput';

const PLACEHOLDER = 'Search movies, actors, directors...';

export interface SearchTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchTextField({ value, onChangeText }: SearchTextFieldProps) {
  return (
    <LeadingIconSearchInput
      placeholder={PLACEHOLDER}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
