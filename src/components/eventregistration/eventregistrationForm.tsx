'use client'

import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaListUl } from 'react-icons/fa';

const EventRegistrationForm = () => {
  return (
    <Container>
      <ImageSection>
        <Overlay>
          <Phrase>¡Únete a la aventura y regístrate en nuestro próximo evento!</Phrase>
        </Overlay>
        <img src="/woman.jpg" alt="Event" />
      </ImageSection>
      <FormSection>

        <FormContainer>
          <Form>
            <Field>
              <IconWrapper><FaUser /></IconWrapper>
              <Input type="text" placeholder="Nombre del participante" />
            </Field>

            <Field>
              <IconWrapper><FaUser /></IconWrapper>
              <Input type="text" placeholder="Apellido del participante" />
            </Field>

            <Field>
              <IconWrapper><FaEnvelope /></IconWrapper>
              <Input type="email" placeholder="Correo electrónico" />
            </Field>

            <Field>
              <IconWrapper><FaPhone /></IconWrapper>
              <Input type="tel" placeholder="Número de teléfono" />
            </Field>

            <Field>
              <IconWrapper><FaListUl /></IconWrapper>
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
              <IconWrapper><FaCalendarAlt /></IconWrapper>
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
  background-color: #18191a;
  font-family: 'Arial', sans-serif;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

const Phrase = styled.div`
  z-index: 1;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  padding: 40px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #F7F9FB;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border: 1px solid #D0D7DF;
  border-radius: 4px;
  padding: 8px;
  background-color: #FFF;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  color: #165252;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  background-color: transparent;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #165252;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #013B58;
  }
`;
