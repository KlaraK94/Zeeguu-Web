import styled from "styled-components";
import {
  almostBlack, 
  zeeguuOrange
} from "../components/colors";

const HeadlineSearch = styled.div`
  h1{
    color: ${almostBlack};
    margin: 0;
    font-size: 34px;
    font-weight: bold;
  }
  button{
    box-shadow: none;
    all: unset;
    margin: 0;
    color: ${zeeguuOrange};
    font-size: 14px;
    font-weight: bold;
  }
`;
export {HeadlineSearch};