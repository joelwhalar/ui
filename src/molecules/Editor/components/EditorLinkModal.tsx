import { useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { EDITOR_LINK_TARGET } from "../Editor.constants";

export interface IEditorLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (url: string, text: string, target: EDITOR_LINK_TARGET) => void;
}

export const EditorLinkModal: React.FC<IEditorLinkModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [target, setTarget] = useState(EDITOR_LINK_TARGET.self);

  const handleSubmit = () => {
    if (!url || !text) return;
    onSave && onSave(url, text, target);
    onClose();
    setUrl("https://");
    setText("");
    setTarget(EDITOR_LINK_TARGET.self);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add/edit link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap={6} width="100%">
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input
                size="l"
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Text to display</FormLabel>
              <Input
                size="l"
                type="text"
                placeholder="Content"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Open link in</FormLabel>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button colorScheme="tertiary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="primary" size="md" onClick={handleSubmit}>
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
