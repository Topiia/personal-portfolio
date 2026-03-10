'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, INITIAL_GREETING } from '@/lib/ai/prompts';

const STORAGE_KEY = 'chatHistory';

export function useChatSession() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // Load messages from sessionStorage on mount
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as ChatMessage[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                    return;
                }
            }
        } catch {
            // ignore parse errors
        }
        // No valid stored history – start with the initial greeting
        setMessages([INITIAL_GREETING]);
    }, []);

    // Persist to sessionStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            } catch {
                // ignore storage quota errors
            }
        }
    }, [messages]);

    const addMessage = useCallback((msg: ChatMessage) => {
        setMessages(prev => [...prev, msg]);
    }, []);

    const updateLastMessage = useCallback((content: string) => {
        setMessages(prev => {
            if (prev.length === 0) return prev;
            const copy = [...prev];
            copy[copy.length - 1] = { ...copy[copy.length - 1], content };
            return copy;
        });
    }, []);

    const clearSession = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setMessages([INITIAL_GREETING]);
    }, []);

    return { messages, addMessage, updateLastMessage, clearSession };
}
