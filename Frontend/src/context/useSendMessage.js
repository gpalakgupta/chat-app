import { useState } from "react";
import axios from "axios";
import useConversation from "../stateManage/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { addMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      // Directly add new message without spreading undefined
      addMessage(data);
    } catch (err) {
      console.error("Error in send messages:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
