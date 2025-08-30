import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  IconButton,
  useToast,
  Text,
  Flex,
  Divider,
  Input,
  Textarea,
  Badge,
  ScaleFade,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axiosInstance from "../utils/axiosInstance";
import { useUser } from "../context/userContext";

export default function Notes() {
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const { user, signOut } = useUser();

  const fetchNotes = async () => {
    try {
      const { data } = await axiosInstance.get("/notes");
      setNotes(data);
    } catch (err) {
      toast({ title: "Error fetching notes", status: "error" });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast({ title: "Title & content required", status: "warning" });
      return;
    }
    try {
      const { data } = await axiosInstance.post("/notes", form);
      setNotes([...notes, data]);
      setForm({ title: "", content: "" });
      toast({ title: "Note created", status: "success" });
    } catch (err) {
      toast({ title: "Error saving note", status: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
      toast({ title: "Note deleted", status: "info" });
    } catch (err) {
      toast({ title: "Error deleting note", status: "error" });
    }
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, teal.50, purple.50)" p="6">
      {/* Top Navbar */}
      <Flex justify="space-between" align="center" mb="6">
        <Heading
          size="lg"
          bgGradient="linear(to-r, teal.500, purple.500)"
          bgClip="text"
        >
          📝 Notes Dashboard
        </Heading>
        <Button
          colorScheme="red"
          variant="solid"
          onClick={signOut}
          _hover={{ bg: "red.600" }}
        >
          Sign Out
        </Button>
      </Flex>

      {/* Welcome Card */}
      <Box
        borderRadius="2xl"
        p="6"
        mb="6"
        shadow="xl"
        bgGradient="linear(to-r, teal.100, purple.50)"
        transition="0.3s"
        _hover={{ transform: "translateY(-4px)" }}
      >
        <Text fontSize="xl" fontWeight="bold">
          Welcome,{" "}
          <Text as="span" color="teal.600">
            {user?.name || "User"}
          </Text>{" "}
          !
        </Text>
        <Text color="gray.700" mt="1">
          Email: {user?.email}
        </Text>
      </Box>

      {/* Create Note Form */}
      <VStack spacing={4} mb={6} maxW="600px" mx="auto">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          bg="white"
          shadow="md"
          borderRadius="lg"
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 2px teal.200" }}
        />
        <Textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          bg="white"
          shadow="md"
          borderRadius="lg"
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 2px teal.200" }}
        />
        <Button
          colorScheme="teal"
          w="full"
          size="lg"
          borderRadius="lg"
          _hover={{ bgGradient: "linear(to-r, teal.400, purple.400)" }}
          onClick={handleSave}
        >
          Create Note
        </Button>
      </VStack>

      <Divider mb="6" />

      {/* Notes Section */}
      <Box maxW="700px" mx="auto">
        <Heading
          size="md"
          mb="4"
          textAlign="center"
          bgGradient="linear(to-r, teal.500, purple.500)"
          bgClip="text"
        >
          Your Notes
        </Heading>

        {notes.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No notes yet. Create one!
          </Text>
        ) : (
          <VStack align="stretch" spacing={4}>
            {notes.map((note, index) => (
              <ScaleFade
                key={note._id}
                initialScale={0.9}
                in={true}
                delay={index * 0.05}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  borderRadius="2xl"
                  p="4"
                  shadow="lg"
                  bgGradient="linear(to-r, white, teal.50)"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-4px)", shadow: "2xl" }}
                >
                  <VStack align="start" spacing="1">
                    <HStack spacing={2}>
                      <Text fontWeight="bold" fontSize="lg">
                        {note.title}
                      </Text>
                      {new Date(note.createdAt) > new Date(Date.now() - 86400000) && (
                        <Badge colorScheme="green">New</Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.700">
                      {note.content}
                    </Text>
                  </VStack>
                  <Tooltip label="Delete Note" fontSize="sm">
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(note._id)}
                      _hover={{ bg: "red.500", color: "white" }}
                    />
                  </Tooltip>
                </Flex>
              </ScaleFade>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}
