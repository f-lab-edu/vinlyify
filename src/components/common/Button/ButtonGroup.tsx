// import { MouseEvent } from 'react';
// import Button from '.';
// import FlexWrap from '../FlexWrap';
// import './style.scss';

// interface ButtonButtonGroupProps {
//   onClick: (e: MouseEvent | null) => void;
//   size?: 'medium' | 'large' | 'small';
//   color?: 'black';
//   outline?: boolean;
//   alt?: 'string';
//   disabled?: boolean;
//   buttons: string[];
//   active?: number;
// }

// const ButtonGroup: React.FC<ButtonButtonGroupProps> = ({
//   onClick,
//   active,
//   //   size = 'medium',
//   //   color = 'black',
//   //   outline = false,
//   disabled = false,
//   buttons,
// }) => {
//   return (
//     <FlexWrap>
//       {buttons.map((v, i) => (
//         <Button key={v} disabled={disabled} onClick={onClick} active={active}>
//           {`${i + 1}`}
//         </Button>
//       ))}
//     </FlexWrap>
//   );
// };
// export default ButtonGroup;
