import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, FlatList } from "react-native";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "RANDOM" });

const chatMessages = [
    { sender: 'you', message: 'Hello Gemini' },
    { sender: 'AI', message: 'My name is not Gemini, I am just AI' }
]

function ChatMessage({ item }){
    const isYou = item.sender == 'you';

    return (
        <View style={[
            styles.messageContainer,
            isYou ? styles.rightMessage : styles.leftMessage
        ]} >
            <Text style={styles.senderText}>{item.sender}</Text>
            <Text style={styles.message}>{item.message}</Text>
        </View>
    );
}

export default function AIChat(){

    const [messages, setMessages] = useState(chatMessages);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const makeAiInference = async () => {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: inputText.trim() + " Answer all these in the context of Kiambu County, Kenya"
        });
        setLoading(false);

        const text = response.text;
        const aiResponse = {
            sender: 'AI',
            message: text,
        }
        setMessages([ aiResponse, ...messages ]);
    }

    const sendPrompt = () => {
        const textLen = inputText.trim().length
        if(textLen == 0) return;

        const newMessage = {
            sender: 'you',
            message: inputText.trim()
        }

        setMessages([ newMessage, ...messages ]);
        setInputText('');
        setLoading(true);
        makeAiInference();
    }



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={ Platform.OS == 'ios' ? 'padding' : undefined }
            keyboardVerticalOffset={80}
        >

            <FlatList 
                data={messages}
                renderItem={ChatMessage}
                contentContainerStyle={styles.chat}
                inverted
            />

            { loading ? <Text>Please Wait ...</Text> : undefined }

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message"
                ></TextInput>

                <TouchableOpacity onPress={sendPrompt} style={styles.sendButton}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        maxWidth: '70%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5
    },
    leftMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e0e0e0',
    },
    rightMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF'
    },
    senderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: "#444",
        marginBottom: 2,
    },
    message: {
        fontSize: 16,
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    chat: {
        padding: 10,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
})