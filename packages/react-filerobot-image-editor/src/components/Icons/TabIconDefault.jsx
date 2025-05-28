import React from 'react';

const TabIconDefault = ({ color }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g opacity="1">
        <path
          d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.00008 7.33334C6.73646 7.33334 7.33341 6.73638 7.33341 6.00001C7.33341 5.26363 6.73646 4.66667 6.00008 4.66667C5.2637 4.66667 4.66675 5.26363 4.66675 6.00001C4.66675 6.73638 5.2637 7.33334 6.00008 7.33334Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9.99979L11.9427 7.94246C11.6926 7.6925 11.3536 7.55208 11 7.55208C10.6464 7.55208 10.3074 7.6925 10.0573 7.94246L4 13.9998"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TabIconDefault;
