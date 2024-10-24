import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRTMessage from '../hooks/useGetRTMsg';
const Messages = () => {

    useGetMessages();
    useGetRTMessage();
    const {messages} = useSelector(store=>store.message);
    if(!messages) {
        return;
    }
    return (
        <div className="px-4 flex-1 overflow-auto">
            {
                messages.map((message, index) => {
                    const prevMessage = messages[index-1];
                    let showDivider = false;
                    if (prevMessage) {
                        const prevDate = new Date(prevMessage.createdAt);
                        const currDate = new Date(message.createdAt);
                        const timeDiff = (currDate-prevDate)/(1000*60*60);
                        showDivider = timeDiff > 24;
                    }
                return (
                    <React.Fragment key={message._id}>
                        {showDivider && (
                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-t border-gray-500" />
                                <span className="mx-2 text-gray-500 text-sm">{new Date(message.createdAt).toLocaleDateString()}</span>
                                <hr className="flex-grow border-t border-gray-500" />
                            </div>
                        )}
                        <Message message={message} />
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Messages;
