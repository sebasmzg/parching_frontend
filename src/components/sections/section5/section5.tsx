import React from "react";
import styled from "styled-components";
import SignUp from "@/app/signup/page";

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  background-image: url("./assets/img/trekMount.jpeg");
  background-size: cover;
  background-position: center;
  height: 100%;

  @media (max-width: 768px) {
    height: 40%;
    width: 100%;
  }
`;

const RightSection = styled.div`
  width: 50%;
  background-color: white;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    height: 60%;
    justify-content: center;
    align-items: center;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
`;

const Section5: React.FC = () => {
  return (
    <SectionContainer>
      <LeftSection></LeftSection>
      <RightSection>
        <SignUp />
      </RightSection>
    </SectionContainer>
  );
};

export default Section5;
