import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Owner } from '@/types/plotAdd';

type OwnerData = Owner;

// Plot data structure that contains multiple owners
type PlotData = {
    id: string;
    price: number;
    owners: OwnerData[];
    createdAt: string;
    updatedAt: string;
};

type PlotContextType = {
    plots: PlotData[];
    owners: OwnerData[]; // Flattened list of all owners from all plots
    addPlotWithOwners: (plotData: { id: string; price: number; owners: OwnerData[] }) => void;
    updatePlot: (id: string, updatedPlotData: { id: string; price: number; owners: OwnerData[] }) => void;
    deletePlot: (id: string) => void;
    deleteOwner: (ownerId: string) => void; // Assuming you have a unique identifier for owners
    getPlot: (id: string) => PlotData | undefined;
    getOwner: (ownerId: string) => OwnerData | undefined;
    getPlotByOwner: (ownerId: string) => PlotData | undefined;
    clearAllData: () => void;
    getAllPlotIds: () => string[];
};

const PLOT_STORAGE_KEY = 'plots_owners_data';

const PlotContext = createContext<PlotContextType | undefined>(undefined);

export const usePlotContext = () => {
    const context = useContext(PlotContext);
    if (!context) {
        throw new Error('usePlotContext must be used within a PlotProvider');
    }
    return context;
};

interface PlotProviderProps {
    children: ReactNode;
}

export const PlotProvider: React.FC<PlotProviderProps> = ({ children }) => {
    const [plots, setPlots] = useState<PlotData[]>(() => {
        try {
            const stored = localStorage.getItem(PLOT_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return [];
        }
    });
    console.log(plots);

    // Saving data to localStorage whenever plots state changes
    useEffect(() => {
        try {
            localStorage.setItem(PLOT_STORAGE_KEY, JSON.stringify(plots));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }, [plots]);

    // Flattened list of all owners from all plots
    const owners = plots.flatMap(plot => 
        plot.owners.map(owner => ({
            ...owner,
            id: plot.id,
            plotPrice: plot.price
        }))
    );

    const addPlotWithOwners = (plotData: { id: string; price: number; owners: OwnerData[] }) => {
        const newPlot: PlotData = {
            ...plotData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        setPlots(prev => {
            // Check if plot already exists, if so, update it
            const existingIndex = prev.findIndex(plot => plot.id === plotData.id);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = { ...newPlot, updatedAt: new Date().toISOString() };
                return updated;
            } else {
                return [...prev, newPlot];
            }
        });
    };

    const updatePlot = (id: string, updatedPlotData: { id: string; price: number; owners: OwnerData[] }) => {
        setPlots(prev =>
            prev.map(plot =>
                plot.id === id
                    ? { ...updatedPlotData, createdAt: plot.createdAt, updatedAt: new Date().toISOString() }
                    : plot
            )
        );
    };

    const deletePlot = (id: string) => {
        setPlots(prev => prev.filter(plot => plot.id !== id));
    };

    const deleteOwner = (ownerId: string) => {
        setPlots(prev => 
            prev.map(plot => ({
                ...plot,
                owners: plot.owners.filter(owner => 
                    // Assuming we use email or phone as unique identifier for owners
                    owner.email !== ownerId && owner.phoneNumber !== ownerId
                ),
                updatedAt: new Date().toISOString()
            })).filter(plot => plot.owners.length > 0) // Remove plots with no owners
        );
    };

    const getPlot = (id: string) => {
        return plots.find(plot => plot.id === id);
    };

    const getAllPlotIds = () => {
        return plots.map(plot => plot.id);
    }

    const getOwner = (ownerId: string) => {
        return owners.find(owner => 
            owner.email === ownerId || owner.phoneNumber === ownerId
        );
    };

    const getPlotByOwner = (ownerId: string) => {
        return plots.find(plot => 
            plot.owners.some(owner => 
                owner.email === ownerId || owner.phoneNumber === ownerId
            )
        );
    };

    const clearAllData = () => {
        setPlots([]);
        localStorage.removeItem(PLOT_STORAGE_KEY);
    };

    return (
        <PlotContext.Provider value={{ 
            plots, 
            owners, 
            addPlotWithOwners, 
            updatePlot, 
            deletePlot, 
            deleteOwner, 
            getPlot,
            getAllPlotIds, 
            getOwner, 
            getPlotByOwner, 
            clearAllData 
        }}>
            {children}
        </PlotContext.Provider>
    );
};