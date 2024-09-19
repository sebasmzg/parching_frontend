'use client';

import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaListUl } from 'react-icons/fa';

const EventRegistrationForm = () => {
  return (
    <Container>
      <ImageSection>
        <OverlayText>
          ¡Únete a la aventura y regístrate en nuestro próximo evento!
        </OverlayText>
        <img src="/img/woman.jpg" alt="Event" />
      </ImageSection>
      <FormSection>
        <FormContainer>
          <Form>
            <Field>
              <Icon><FaUser /></Icon>
              <Input type="text" placeholder="Nombre del participante" />
            </Field>

            <Field>
              <Icon><FaUser /></Icon>
              <Input type="text" placeholder="Apellido del participante" />
            </Field>

            <Field>
              <Icon><FaEnvelope /></Icon>
              <Input type="email" placeholder="Correo electrónico" />
            </Field>

            <Field>
              <Icon><FaPhone /></Icon>
              <Input type="tel" placeholder="Número de teléfono" />
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
                <option>Educación y Aprendizaje</option>
                <option>Medio Ambiente y Sostenibilidad</option>
              </Select>
            </Field>

            <Field>
              <Icon><FaCalendarAlt /></Icon>
              <Input type="date" />
            </Field>

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
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Arial', sans-serif;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 20px;
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
  padding: 15px;  
  max-width: 320px; 
  height: auto;  
  margin: 20px;   
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
  margin-bottom: 12px;
`;

const Icon = styled.div`
  color: #013B58;
  font-size: 20px;
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #165252;
  border-radius: 8px;
  font-size: 14px;
  color: #3C4556;

  &::placeholder {
    color: #a0a0a0;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 2px solid #165252;
  border-radius: 8px;
  font-size: 14px;
  color: #3C4556;
`;

const Button = styled.button`
  padding: 10px 12px;
  background-color: #78882D;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #013B58;
  }
`;
