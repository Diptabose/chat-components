import ChatContext, { ChatContextProps } from '@/core/contexts/ChatContext'
import { Message } from '@/core/types/ChatTypes'
import { useCallback, useContext, useRef } from 'react'


const sampleMarkdown = `
# Markdown with Code, Math, and More!  
## Code Example:
\`\`\`js
const greet = () => console.log("Hello, world!");
greet();
\`\`\`

## Table Example:
| Name  | Age |
|-------|-----|
| Alice | 25  |
| Bob   | 30  |

## Math Example:
Inline math: $E = mc^2$  
Block math:
$$
\\int_0^\\infty e^{-x}dx = 1
$$

## Image Example:
![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

## Link Example:
[Visit OpenAI](https://openai.com)
`;

const useChat = () => {



    const chatContext = useContext<ChatContextProps>(ChatContext);

    if (!chatContext) {
        throw new Error(`useChat can't be used outside ChatContext`);
    }

    const { state: {
        conversation
    } } = chatContext

    return {
        conversation
    }

}

export default useChat



// Mock server stream data.
async function* getData() {
    for (let i = 0; i < 100; i++) {
        await new Promise(res => setTimeout(res, 10));
        yield i.toString();
    }
}

export const useChatUtils = () => {
    const chatContext = useContext<ChatContextProps>(ChatContext);

    if (!chatContext) {
        throw new Error('useChat must be used within a ChatContext provider');
    }

    const { state: { conversation }, dispatch } = chatContext;
    const firstChunk = useRef(true);
    const abortController = useRef<AbortController | null>(null);

    const addMessage = useCallback((message: Message) => {
        dispatch({ field: 'conversation', value: (prev) => [...prev, message] });
    }, []);

    const getServerResponse = useCallback(async () => {

        if (!abortController.current) {
            abortController.current = new AbortController();
        }

        dispatch({
            field: 'conversation',
            value: (prev) => [...prev, {
                type: "assistant",
                text: sampleMarkdown
            }]
        });


        return
        await new Promise(res => setTimeout(res, 2000));



        for await (const chunk of getData()) {

            if (abortController.current.signal.aborted) {
                abortController.current = null;
                break;
            }

            if (firstChunk.current) {
                dispatch({
                    field: 'conversation',
                    value: (prev) => {
                        const updatedMessages = [...prev];
                        const prevLength = prev.length - 1;
                        updatedMessages[prevLength] = {
                            ...updatedMessages[prevLength],
                            text: chunk,
                        };
                        return updatedMessages;
                    },
                });
                firstChunk.current = false
            } else {
                dispatch({
                    field: 'conversation',
                    value: (prev) => {
                        const updatedMessages = [...prev];
                        const prevLength = prev.length - 1;
                        updatedMessages[prevLength] = {
                            ...updatedMessages[prevLength],
                            text: updatedMessages[prevLength].text + chunk,
                        };

                        return updatedMessages;
                    },
                });
            }

        }
        firstChunk.current = true;
    }, []);

    const abortChat = () => {
        if (abortController?.current) {
            console.log("Aborting inside")
            abortController.current.abort();
        }
    }

    return {
        conversation,
        addMessage,
        getServerResponse,
        abortChat
    };
};


