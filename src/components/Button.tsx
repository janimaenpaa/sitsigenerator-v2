import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  color?: string;
  height?: string;
  margin?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  padding?: string;
  width?: string;
}

const StyledButton = styled.button<Props>`
  background-color: ${(props) => props.color || "#4caf50"};
  border-radius: 4px;
  border: none;
  color: white;
  display: inline-block;
  font-size: 16px;
  height: ${(props) => props.height || "50px"};
  margin: ${(props) => props.margin || "10px"};
  padding: ${(props) => props.padding || "15px 32px"};
  text-align: center;
  text-decoration: none;
  width: ${(props) => props.width || "150px"};
  cursor: pointer;
`;

const Button = ({
  children,
  color,
  height,
  margin,
  onClick,
  padding,
  width,
}: Props) => {
  return (
    <StyledButton
      color={color}
      height={height}
      margin={margin}
      onClick={onClick}
      padding={padding}
      width={width}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
