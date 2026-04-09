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
