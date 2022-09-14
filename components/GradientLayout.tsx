import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React, { FC, ReactChild } from "react";

type GradientLayoutProps = {
  image: string;
  title: string;
  children: ReactChild;
  color: string;
  subtitle: string;
  description: string;
  roundImage: boolean;
};

const GradientLayout: FC<GradientLayoutProps> = ({
  image,
  title,
  children,
  color,
  subtitle,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small" fontWeight="600">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;