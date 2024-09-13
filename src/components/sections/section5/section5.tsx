import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import SignUp from '@/app/signup/page';

const SectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LeftSection = styled.div`
    flex: 1;
    background-image: url('https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    background-position: center;
    height: 100%;
`;

const RightSection = styled.div`
    flex: 1;
    background-color: #e0e0e0;
    height: 100%;
`;

const Section5: React.FC = () => {
    return (
        <SectionContainer>
            <LeftSection>
            </LeftSection>
            <Divider orientation="vertical" flexItem />
            <RightSection>
                <SignUp />
            </RightSection>
        </SectionContainer>
    );
};

export default Section5;