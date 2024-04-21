import { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaSearch, FaBlogger } from "react-icons/fa";

const Index = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const fetchSuggestions = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic to get suggestions.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulated AI-powered suggestions
    const topics = {
      content: ["WordPress", "Medium", "Ghost"],
      seo: ["Yoast SEO", "Ahrefs", "SEMrush"],
      social: ["Buffer", "Hootsuite", "TweetDeck"],
      images: ["Canva", "Adobe Spark", "PicMonkey"],
      analytics: ["Google Analytics", "Tableau", "Mixpanel"],
    };

    const lowerInput = input.toLowerCase();
    const foundSuggestions = Object.keys(topics).reduce((acc, key) => {
      if (key.includes(lowerInput)) {
        return [...acc, ...topics[key]];
      }
      return acc;
    }, []);

    if (foundSuggestions.length === 0) {
      toast({
        title: "No suggestions found",
        description: "We couldn't find any tools related to your input.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    setSuggestions(foundSuggestions);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading as="h1" mb={2}>
            Blogging Tools AI Assistant
          </Heading>
          <Text fontSize="lg">Get AI-powered suggestions for the best tools for blogging.</Text>
          <Image src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxibG9nZ2luZyUyMHRvb2xzfGVufDB8fHx8MTcxMzcxNTQ0M3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Blogging Tools" boxSize="200px" my={4} />
        </Box>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} align="center">
          <Input placeholder="Enter a blogging topic (e.g., SEO, content)" value={input} onChange={handleInputChange} />
          <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchSuggestions}>
            Search
          </Button>
        </Stack>
        {suggestions.length > 0 && (
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Suggestions:
            </Heading>
            <VStack spacing={3}>
              {suggestions.map((suggestion, index) => (
                <Text key={index} fontSize="md">
                  {suggestion}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
