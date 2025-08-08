import React, { useEffect, useState } from 'react'
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (selectedConversation && selectedConversation._id) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `/api/message/get/${selectedConversation._id}`
                    );
                    setMessages(response.data.messages || response.data);
                    setLoading(false);  // <-- fixed here
                }
                catch (err) {
                    console.error("Error fetching messages:", err);
                    setLoading(false);  // stop loading even on error
                }
            } else {
                // No conversation selected, clear messages maybe?
                setMessages([]);
            }
        }
        getMessages();
    }, [selectedConversation, setMessages]);

    return {
        messages,
        loading
    }
}

export default useGetMessage;
