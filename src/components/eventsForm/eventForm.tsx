"use client";
import styled from "styled-components";

const colors = {
  primary: "#165252",
  accent: "#78882D",
  secondary: "#D2DEEC",
  white: "#ffffff",
  dark: "#3C4556",
};

const itemData = [
  { img: "/img/mountain.jpg", title: "Mountain" },
  { img: "/img/arte y cultura.jpg", title: "Forest" },
  { img: "/img/parque.jpg", title: "Desert" },
  { img: "/img/parque.jpg", title: "Desert" },
  { img: "/img/parque.jpg", title: "Desert" },
  { img: "/img/parque.jpg", title: "Desert" },
  // Agrega más imágenes según sea necesario
];

const EventFormPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <ImageSection>
          <ImageList>
            {itemData.slice(0, 3).map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <ImageList>
            {itemData.slice(3, 6).map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <OverlayText>
            ¡Inspírate y crea un evento inolvidable! <br />
            Comparte la aventura con el mundo.
          </OverlayText>
        </ImageSection>
        <FormSection>
          <FormContainer>
            <Form>
              <Field>
                <Input type="text" placeholder="Título del evento" />
              </Field>

              <Field>
                <TextArea placeholder="Descripción del evento" />
              </Field>

              <Field>
                <Input type="date" />
              </Field>

              <Field>
                <Input type="text" placeholder="Ubicación" />
              </Field>

              <Field>
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
                <Select>
                  <option value="">Cupos disponibles</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </Field>

              <Button>Publicar evento</Button>
            </Form>
          </FormContainer>
        </FormSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default EventFormPage;

// Estilos
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.white};
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 16px;
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  height: 50%;
`;

const ImageListItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: ${colors.white};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
`;

const FormSection = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  margin: 1rem;
  padding: 0;
  text-align: center;
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.white} 100%
  );
  color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
  color: ${colors.dark};

  &::placeholder {
    color: ${colors.secondary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
  color: ${colors.dark};
  height: 100px;
  resize: none;

  &::placeholder {
    color: ${colors.secondary};
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  font-size: 16px;
  color: ${colors.dark};
`;

const Button = styled.button`
  padding: 12px;
  background-color: ${colors.accent};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
  }
`;
