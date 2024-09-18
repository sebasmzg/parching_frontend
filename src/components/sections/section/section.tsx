import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageData {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const images: ImageData[] = [
  {
    src: "https://images.pexels.com/photos/2609459/pexels-photo-2609459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "trek group",
    title: "Discover new experiences",
    description: "join local groups",
  },
  {
    src: "https://images.pexels.com/photos/4314209/pexels-photo-4314209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Image 2",
    title: "Organize events",
    description: "easily  in a safe and friendly environment",
  },
  {
    src: "https://images.pexels.com/photos/2606532/pexels-photo-2606532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Image 3",
    title: "Respect for nature",
    description: "Let's go on an adventure",
  },
];

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  height: 100%;
`;

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  width: 50%; 
  padding: 2rem;
  color: #013B58;
  text-align: center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  height: 100%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%;
    height: 50%;
  }

  h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: 700;
  }

  p {
    font-size: 2rem;
  }
`;

const NavigationButton = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 20px;" : "right: 20px;")}
  transform: translateY(-50%);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Carousel: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? images.length - 1 : newIndex;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SectionWrapper>
      <CarouselContainer
        style={{
          transform: `translateX(-${currentSlideIndex * 100}%)`,
        }}
      >
        {images.map((image) => (
          <SlideWrapper key={image.src}>
            <TextWrapper>
              <h1>{image.title}</h1>
              <p>{image.description}</p>
            </TextWrapper>
            <ImageWrapper>
              <SliderImage src={image.src} alt={image.alt} />
            </ImageWrapper>
          </SlideWrapper>
        ))}
      </CarouselContainer>
      <NavigationButton direction="left" onClick={handlePrev}>
        <FaArrowLeft />
      </NavigationButton>
      <NavigationButton direction="right" onClick={handleNext}>
        <FaArrowRight />
      </NavigationButton>
    </SectionWrapper>
  );
  
};

export default Carousel;
