import styled from "styled-components";
import {
    zeeguuOrange,
    darkGrey,

  } from "../components/colors";

const RowOfInterests = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6%;

  .interests{
    box-shadow: none;
    all: unset;
    font-size: 12px;
    color: ${zeeguuOrange};
  }

  .interests.subscribed{
    font-weight: bold;
  }

  .interests.unsubscribed{
    color: ${darkGrey};
  }

`;

export { RowOfInterests };