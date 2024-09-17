import styled from 'styled-components';

const EventFormPage = () => {
  return (
    <Container>
      <FormSection>
        <ImageContainer>
          <img src="/path-to-your-image.jpg" alt="Event" />
        </ImageContainer>
        <FormContainer>
          <Form>
            <Title>Título del evento</Title>
            <Input type="text" placeholder="Añade un título" />
            
            <Title>Descripción del evento</Title>
            <TextArea placeholder="Descripción" />
            
            <Title>Fecha</Title>
            <Input type="date" />
            
            <Title>Ubicación</Title>
            <Input type="text" placeholder="Añade la ubicación" />
            
            <Title>Categoría</Title>
            <Select>
              <option>Elige una opción</option>
              <option>Categoría 1</option>
              <option>Categoría 2</option>
            </Select>
            
            <Title>Límite de participantes</Title>
            <Select>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
            
            <Button>Publicar</Button>
          </Form>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

export default EventFormPage;

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

const Select = styled.select`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #165252;
  border-radius: 4px;
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
