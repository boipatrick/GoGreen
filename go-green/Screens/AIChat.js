import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, FlatList } from "react-native";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAFGs9KLdUlHy9NyIeTR04I4Pa2Epm260o" });

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
            <Text style={[
                styles.message,
                isYou && styles.rightMessageText
            ]}>
                {item.message}
            </Text>
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
            contents: inputText.trim() + " Answer all these in the context of Biodiversity promoting activities within Kiambu County"
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
        backgroundColor: '#E8F5E9', 
    },
    messageContainer: {
        maxWidth: '75%',
        borderRadius: 12,
        padding: 12,
        marginVertical: 6,
    },
    leftMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e6e6e6', 
    },
    rightMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#2196F3', 
    },
    senderText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: "#666",
        marginBottom: 2,
    },
    message: {
        fontSize: 16,
        color: '#222', 
    },
    
    rightMessageText: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        borderRadius: 24,
        fontSize: 16,
        height: 48,
        paddingHorizontal: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    sendButton: {
        backgroundColor: '#2196F3',
        borderRadius: 24,
        height: 48,
        minWidth: 48,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18,
        elevation: 2,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    chat: {
        paddingTop: 18,
        paddingBottom: 0,
        paddingHorizontal: 6,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
});