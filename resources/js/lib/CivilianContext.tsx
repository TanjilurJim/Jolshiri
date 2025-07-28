import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Civilian, ForAll } from '@/types/plotRegistration';

type CivilianData = ForAll & Civilian;

interface CivilianContextType {
    civilians: CivilianData[];
    addCivilian: (civilian: CivilianData) => void;
    updateCivilian: (memberId: string, civilian: CivilianData) => void;
    deleteCivilian: (memberId: string) => void;
    getCivilian: (memberId: string) => CivilianData | undefined;
    clearAllCivilians: () => void;
}

const STORAGE_KEY = 'civilians_data';

const CivilianContext = createContext<CivilianContextType | undefined>(undefined);

export const useCivilianContext = () => {
    const context = useContext(CivilianContext);
    if (!context) {
        throw new Error('useCivilianContext must be used within a CivilianProvider');
    }
    return context;
};

interface CivilianProviderProps {
    children: ReactNode;
}

export const CivilianProvider: React.FC<CivilianProviderProps> = ({ children }) => {
    // Initialize state from localStorage
    const [civilians, setCivilians] = useState<CivilianData[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return [];
        }
    });

    // Save to localStorage whenever civilians state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(civilians));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }, [civilians]);

    const addCivilian = (civilian: CivilianData) => {
        const newCivilian = {
            ...civilian,
            id: civilian.memberId || Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        setCivilians(prev => [...prev, newCivilian]);
    };

    const updateCivilian = (memberId: string, updatedCivilian: CivilianData) => {
        setCivilians(prev => 
            prev.map(civilian => 
                civilian.memberId === memberId 
                    ? { ...updatedCivilian, updatedAt: new Date().toISOString() }
                    : civilian
            )
        );
    };

    const deleteCivilian = (memberId: string) => {
        setCivilians(prev => prev.filter(civilian => civilian.memberId !== memberId));
    };

    const getCivilian = (memberId: string) => {
        return civilians.find(civilian => civilian.memberId === memberId);
    };

    const clearAllCivilians = () => {
        setCivilians([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <CivilianContext.Provider value={{ 
            civilians, 
            addCivilian, 
            updateCivilian, 
            deleteCivilian, 
            getCivilian,
            clearAllCivilians
        }}>
            {children}
        </CivilianContext.Provider>
    );
};