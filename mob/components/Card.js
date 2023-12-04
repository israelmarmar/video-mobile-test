import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Card = ({ heading, subheading, description, image, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Box alignItems="center">
        <Box
          w="80%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          {image && (
            <Box>
                <Image
                  source={{
                    uri: image,
                  }}
                  size="xl"
                  alt=""
                  resizeMode="cover"
                />
            </Box>
          )}
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {heading}
              </Heading>
              {subheading && description && (
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  {subheading}
                </Text>
              )}
            </Stack>
            {subheading && description && (
              <Text fontWeight="400">{description}</Text>
            )}
          
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
