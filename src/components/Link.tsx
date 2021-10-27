import Link from "next/link";
import styled from "styled-components";

interface Props {
  bgColor?: string;
  children?: React.ReactNode;
  href: string;
}

const StyledButton = styled.a<Props>`
  background-color: ${(props) => props.bgColor || "#4caf50"};
  border-radius: 4px;
  border: none;
  color: white;
  display: inline-block;
  font-size: 16px;
  height: 50px;
  margin: 10px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  width: 150px;
`;

const Button = ({ children, href, bgColor }: Props) => {
  return (
    <Link href={href} passHref>
      <StyledButton href={href} bgColor={bgColor}>
        {children}
      </StyledButton>
    </Link>
  );
};

export default Button;
