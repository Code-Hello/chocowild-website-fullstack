import styled from "styled-components";

export const H3 = styled.h3`
  padding: 0.5em;
`;

export const TextParagraph = styled.p`
  font-size: 1.1em;
  padding: 0.5em;
  color: ${(props) => props.grey && props.theme.darkGrey};
  text-align: ${(props) => props.center && "center"};
  text-decoration: ${(props) => props.underline && "underline"};
`;

export const TitlePage = styled(H3)`
  font-size: 1.5em;
  text-align: center;
`;
