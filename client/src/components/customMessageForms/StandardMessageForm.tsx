import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
// import MessageFormUI from "./MessageFormUI";
import { ChatObject } from 'react-chat-engine-advanced';
import { MessageFormProps } from 'react-chat-engine-advanced';
import Dropzone from "react-dropzone";
//import XMarkIcon from './XMarkIcon';
import { FaTimes as XMarkIcon } from 'react-icons/fa';


/*interface StandardMessageFormProps {
    props: MessageFormProps;
    activeChat: ChatObject | undefined;
    : React.FC<StandardMessageFormProps>
  }*/

const StandardMessageForm = ({ props, activeChat }) => {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [preview, setPreview] = useState("");

    const handleSubmit = async () => {
        const date = new Date()
        .toISOString()
        .replace("T", " ")
        .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);

        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];

        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
          };
        
        props.onSubmit(form);
        setMessage("");
        setAttachment("");
      

    }

    return (
    <div className="message-form-container">
        {preview && (
            <div className="message-form-preview">
                <img 
                    alt="message-form-preview"
                    className="message-form-preview-image"
                    src={preview}
                    onLoad={() => URL.revokeObjectURL(preview)}
                />
                <XMarkIcon
                    className="message-form-icon-x"
                    onClick={() => {
                        setPreview("");
                        setAttachment("");
                    }}
                />
            </div>
        )}
        <div className="message-form">
            <div className="message-form-input-container">
                <input
                    className="message-form-input"
                    type="text"
                    placeholder="Send a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="message-form-icons">
                <Dropzone
                    onDrop={async (acceptedFiles) => {
                        const file = acceptedFiles[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            setAttachment(file);
                            setPreview(url);
                        }
                    }}
                    /*onDropAccepted={(acceptedFiles) => {
                        console.log('Accepted files:', acceptedFiles);
                    }}*/
                    accept={["image/jpg", "image/jpeg", "image/png"]}
                    multiple={false}
                    noClick={true}
                >
                    {( {getRootProps, getInputProps, open}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <PaperClipIcon
                                className="message-form-icon-clip"
                                onClick={open}
                            />  
                        </div>
                    )}
                </Dropzone>
                <hr className="vertical-line" />
                <PaperAirplaneIcon
                    className="message-form-icon-airplane"
                    onClick={() => {
                        //props.onSend?.(message, attachment);
                        //setMessage("");
                        //setAttachment("");
                        setPreview("");
                        handleSubmit();
                    }}
                />
            </div>
        </div>
    </div>
    );
};

export default StandardMessageForm;