import React from "react";

/**
 * LoadingDots — animated three-dot thinking indicator.
 * Use while the bot is generating an answer.
 */

export function LoadingDots({
  size = 'md',
  color = 'green',
  style,
  ...props
}) {
  const sizes = {
    sm: 6,
    md: 8,
    lg: 11,
  };

  const colorMap = {
    blue:    'var(--color-blue-500)',
    green:   'var(--color-green-400)',
    purple:  'var(--color-purple-500)',
    neutral: 'var(--color-neutral-400)',
    white:   'white',
    current: 'currentColor',
  };

  const d = sizes[size] || 8;
  const c = colorMap[color] || colorMap.blue;

  return React.createElement(React.Fragment, null,
    React.createElement('style', null, `
      @keyframes jab-dot-bounce {
        0%, 80%, 100% { transform: scale(1);   opacity: 0.4; }
        40%            { transform: scale(1.3); opacity: 1;   }
      }
    `),
    React.createElement('span', {
      role: 'status',
      'aria-label': 'Loading',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${d * 0.6}px`,
        ...style,
      },
      ...props,
    },
      [0, 1, 2].map(i =>
        React.createElement('span', {
          key: i,
          style: {
            width: d,
            height: d,
            borderRadius: '50%',
            background: c,
            display: 'inline-block',
            animation: `jab-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }
        })
      ),
    )
  );
}
