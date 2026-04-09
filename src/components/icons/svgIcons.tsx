import React from 'react';
import Svg, { Path } from 'react-native-svg';

/** Matches `src/assets/icons/*.svg` viewBox (Material-style 24dp icons). */
const VIEWBOX = '0 -960 960 960';

export interface SvgIconProps {
  color: string;
  size: number;
}

export function HomeIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
      />
    </Svg>
  );
}

export function SearchIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
      />
    </Svg>
  );
}

export function BookmarkIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"
      />
    </Svg>
  );
}

export function PersonIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"
      />
    </Svg>
  );
}

export function NotificationIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
      />
    </Svg>
  );
}

export function ShareIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm508.5-291.5Q720-743 720-760t-11.5-28.5Q697-800 680-800t-28.5 11.5Q640-777 640-760t11.5 28.5Q663-720 680-720t28.5-11.5ZM680-200ZM200-480Zm480-280Z"
      />
    </Svg>
  );
}

export function MovieIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEWBOX}>
      <Path
        fill={color}
        d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"
      />
    </Svg>
  );
}

export function PlayIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="M8 5v14l11-7L8 5Z" />
    </Svg>
  );
}

/** Material-style 24dp icons (detail screen nav / CTAs) */
const VB24 = '0 0 24 24';

export function ArrowBackIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      />
    </Svg>
  );
}

export function StarIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </Svg>
  );
}

export function BookmarkAddIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M17 11v6h-2v-6h-6V9h6V3h2v6h6v2h-6zM20 20V4c0-1.1-.9-2-2-2H6c-1.11 0-2 .9-2 2v16c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2zM6 4h4v12l2-1 2 1V4h4v16H6V4z"
      />
    </Svg>
  );
}

/** Filled bookmark — “In Watchlist” secondary CTA (project-spec §7.3) */
export function BookmarkAddedIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
      />
    </Svg>
  );
}

export function HistoryIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
      />
    </Svg>
  );
}

export function CloseIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </Svg>
  );
}

export function ChevronRightIcon({ color, size }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VB24}>
      <Path
        fill={color}
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      />
    </Svg>
  );
}
