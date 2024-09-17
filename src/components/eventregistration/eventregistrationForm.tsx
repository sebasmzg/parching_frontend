import styled from 'styled-components';

const EventRegistrationForm = () => {
  return (
    <Container>
      <FormSection>
        <ImageContainer>
          <img src="/path-to-your-event-image.jpg" alt="Event" />
        </ImageContainer>
        <FormContainer>
          <Form>
            <Title>Nombre del evento</Title>
            <Input type="text" placeholder="Nombre del evento" />

            <Title>Descripción del evento</Title>
            <TextArea placeholder="Descripción del evento" />

            <Title>Fecha del evento</Title>
            <Input type="date" />

            <Title>Nombre</Title>
            <Input type="text" placeholder="Nombre del participante" />

            <Title>Apellido</Title>
            <Input type="text" placeholder="Apellido del participante" />

            <Title>Correo electrónico</Title>
            <Input type="email" placeholder="Correo electrónico" />

            <Title>Número de teléfono</Title>
            <Input type="tel" placeholder="Número de teléfono"/>

            <Title>Ubicación</Title>
            <Input type="text" placeholder="Ubicación del evento" />

            <Button>Unirme</Button>
          </Form>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

export default EventRegistrationForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #D2DEEC;
`;

const FormSection = styled.div`
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  background-color: #D2DEEC;
  padding: 20px;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  font-size: 16px;
  color: #3C4556;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #165252;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #165252;
  border-radius: 4px;
  resize: none;
`;

const Button = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #78882D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #013B58;
  }
`;
