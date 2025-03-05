import { Dispatch, createContext } from 'react';
import { ChatStateType } from '@/core/state/ChatState'
import { ActionType } from '@/core/hooks/reducer/useCreateReducer';

export interface ChatContextProps {
    state: ChatStateType;
    dispatch: Dispatch<ActionType<ChatStateType>>;
}

const ChatContext = createContext<ChatContextProps>(undefined!);
export default ChatContext;