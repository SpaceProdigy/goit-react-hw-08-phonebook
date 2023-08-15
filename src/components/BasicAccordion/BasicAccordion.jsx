import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from 'styled-components';

const AccordionCustom = styled(Accordion)`
  width: 320px;
  background: #ffffff4e !important;
`;

const AccordionBox = styled.div`
  margin-bottom: 50px;
`;

export default function BasicAccordion({
  name1,
  name2,
  name3,
  component1,
  component2,
  component3,
}) {
  return (
    <AccordionBox>
      <AccordionCustom>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {name1}
        </AccordionSummary>
        <AccordionDetails>{component1}</AccordionDetails>
      </AccordionCustom>
      <AccordionCustom>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {name2}
        </AccordionSummary>

        <AccordionDetails style={{ display: 'flex', justifyContent: 'center' }}>
          {component2}
        </AccordionDetails>
      </AccordionCustom>
      <AccordionCustom>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {name3}
        </AccordionSummary>

        <AccordionDetails>{component3}</AccordionDetails>
      </AccordionCustom>
    </AccordionBox>
  );
}
