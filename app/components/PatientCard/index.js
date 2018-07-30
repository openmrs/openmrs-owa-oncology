/**
 *
 * PatientCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';


const Wrapper = styled.div`
  position: relative;
  display: flex;
  background: ${grey[100]};
  padding: 0.5em;
  margin: 0 0.5em 0.5em;
  overflow: hidden;
  align-items: center;
`;

const TitleWrapper = styled.div`
  border-bottom: 1px solid ${grey[300]};
  margin: 0 1em 1em 0;
`;

const TitlePart = styled.span`
  display: inline-block;
  margin-right: 0.75em;
  &:last-child {
    margin-right: 0;
  }
`;

const TitlePartLabel = styled.span`
  position: absolute;
  font-style: italic;
`;

const Aside = styled.div`
  position: absolute;
  text-align: center;
  padding: 0.5em;
  top: 0;
  right: 0;
`;

const Label = styled.span`
  display: inline-block;
  background: ${grey[700]};
  color: #FFFFFF;
  padding: 0.1em 0.5em;
  border-radius: 20px;
`;

function PatientCard(props) {
  const { patient } = props;
  return (
    <Wrapper>
      <TitleWrapper>
        <TitlePart>
          <Typography variant="headline">
            {patient.firstName}
          </Typography>
          <TitlePartLabel>
            <Typography variant="caption">
              Given
            </Typography>
          </TitlePartLabel>
        </TitlePart>
        <TitlePart>
          <Typography variant="headline">
            {patient.lastName}
          </Typography>
          <TitlePartLabel>
            <Typography variant="caption">
              Family Name
            </Typography>
          </TitlePartLabel>
        </TitlePart>
      </TitleWrapper>
      <Typography variant="body1">
        {patient.sex}
      </Typography>
      <Aside>
        <Typography variant="caption">
          Patient ID
        </Typography>
        <Label>
          {patient.id}
        </Label>
      </Aside>

    </Wrapper>
  );
}

PatientCard.propTypes = {
  patient: PropTypes.object,
};

export default PatientCard;
