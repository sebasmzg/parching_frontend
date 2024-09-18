'use client'
import styled from 'styled-components';
import { FaMapMarkerAlt, FaCalendarAlt, FaListUl, FaUser, FaHeading, FaPen } from 'react-icons/fa';

const EventFormPage = () => {
  return (
    <PageWrapper>
      <ImageSection>
        <OverlayText>
          ¡Inspírate y crea un evento inolvidable! <br />
          Comparte la aventura con el mundo.
        </OverlayText>
        <img src="/img/mountain.jpg" alt="Event Inspiration" />
      </ImageSection>
      <FormSection>
        <FormContainer>
          <Form>
            <Field>
              <Icon><FaHeading /></Icon>
              <Input type="text" placeholder="Título del evento" />
            </Field>
            
            <Field>
              <Icon><FaPen /></Icon>
              <TextArea placeholder="Descripción del evento" />
            </Field>
            
            <Field>
              <Icon><FaCalendarAlt /></Icon>
              <Input type="date" />
            </Field>
            
            <Field>
              <Icon><FaMapMarkerAlt /></Icon>
              <Input type="text" placeholder="Ubicación" />
            </Field>
            
            <Field>
              <Icon><FaListUl /></Icon>
              <Select>
                <option>Elige una categoría</option>
                <option>Naturaleza y aire libre</option>
                <option>Social y Comunitario</option>
                <option>Gastronomía</option>
                <option>Tecnología e innovación</option>
                <option>Arte y cultura</option>
                <option>Deportes y Bienestar</option>
                <option>Educación y Aprendiza</option>
                <option>Medio Ambiente y Sostenibilidad</option>
              </Select>
            </Field>
            
            <Field>
              <Icon><FaUser /></Icon>
              <Input type='number' placeholder='Cupos disponibles'/>
            </Field>
            
            <Button>Publicar evento</Button>
          </Form>
        </FormContainer>
      </FormSection>
    </PageWrapper>
  );
};

export default EventFormPage;

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  height: 100vh;
  background-color: #000000;
  padding: 20px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 20px;
  height: 100%;
  max-width: 600px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 20px 40px;
  border-radius: 8px;
  font-size: 24px;
  text-align: center;
  line-height: 1.5;
  font-weight: bold;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Icon = styled.div`
  color: #013B58;
  font-size: 24px;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 2px solid #165252;
  border-radius: 8px;
  font-size: 16px;
  color: #3C4556;
  &::placeholder {
    color: #a0a0a0;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 2px solid #165252;
  border-radius: 8px;
  font-size: 16px;
  color: #3C4556;
  resize: none;
  height: 100px;
  &::placeholder {
    color: #a0a0a0;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
  border: 2px solid #165252;
  border-radius: 8px;
  font-size: 16px;
  color: #3C4556;
`;

const Button = styled.button`
  padding: 12px 12px;
  background-color: #78882D;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #013B58;
  }
`;
