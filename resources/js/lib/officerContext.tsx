import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Officer, ForAll } from '@/types/plotRegistration';

type OfficerData = ForAll & Officer;

// Plot data structure that contains multiple officers
type PlotData = {
    plotId: string;
    ahsID: string;
    officers: OfficerData[];
    createdAt: string;
    updatedAt: string;
};

type OfficerContextType = {
    plots: PlotData[];
    officers: OfficerData[]; // Flattened list of all officers from all plots
    addPlotWithOfficers: (plotData: { plotId: string; ahsID: string; officers: OfficerData[] }) => void;
    updatePlot: (plotId: string, updatedPlotData: { plotId: string; ahsID: string; officers: OfficerData[] }) => void;
    deletePlot: (plotId: string) => void;
    deleteOfficer: (personalNumber: string) => void;
    getPlot: (plotId: string) => PlotData | undefined;
    getOfficer: (personalNumber: string) => OfficerData | undefined;
    getPlotByOfficer: (personalNumber: string) => PlotData | undefined;
    clearAllData: () => void;
};

const OFFICER_STORAGE_KEY = 'plots_officers_data';

const OfficerContext = createContext<OfficerContextType | undefined>(undefined);

export const useOfficerContext = () => {
    const context = useContext(OfficerContext);
    if (!context) {
        throw new Error('useOfficerContext must be used within an OfficerProvider');
    }
    return context;
};

interface OfficerProviderProps {
    children: ReactNode;
}

export const OfficerProvider: React.FC<OfficerProviderProps> = ({ children }) => {
    const [plots, setPlots] = useState<PlotData[]>(() => {
        try {
            const stored = localStorage.getItem(OFFICER_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return [];
        }
    });

    // Saving data to localStorage whenever plots state changes
    useEffect(() => {
        try {
            localStorage.setItem(OFFICER_STORAGE_KEY, JSON.stringify(plots));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }, [plots]);

    // Flattened list of all officers from all plots
    const officers = plots.flatMap(plot => 
        plot.officers.map(officer => ({
            ...officer,
            plotId: plot.plotId,
            ahsID: plot.ahsID
        }))
    );

    const addPlotWithOfficers = (plotData: { plotId: string; ahsID: string; officers: OfficerData[] }) => {
        const newPlot: PlotData = {
            ...plotData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        setPlots(prev => {
            // Check if plot already exists, if so, update it
            const existingIndex = prev.findIndex(plot => plot.plotId === plotData.plotId);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = { ...newPlot, updatedAt: new Date().toISOString() };
                return updated;
            } else {
                return [...prev, newPlot];
            }
        });
    };

    const updatePlot = (plotId: string, updatedPlotData: { plotId: string; ahsID: string; officers: OfficerData[] }) => {
        setPlots(prev =>
            prev.map(plot =>
                plot.plotId === plotId
                    ? { ...updatedPlotData, createdAt: plot.createdAt, updatedAt: new Date().toISOString() }
                    : plot
            )
        );
    };

    const deletePlot = (plotId: string) => {
        setPlots(prev => prev.filter(plot => plot.plotId !== plotId));
    };

    const deleteOfficer = (personalNumber: string) => {
        setPlots(prev => 
            prev.map(plot => ({
                ...plot,
                officers: plot.officers.filter(officer => officer.personalNumber !== personalNumber),
                updatedAt: new Date().toISOString()
            })).filter(plot => plot.officers.length > 0) // Remove plots with no officers
        );
    };

    const getPlot = (plotId: string) => {
        return plots.find(plot => plot.plotId === plotId);
    };

    const getOfficer = (personalNumber: string) => {
        return officers.find(officer => officer.personalNumber === personalNumber);
    };

    const getPlotByOfficer = (personalNumber: string) => {
        return plots.find(plot => 
            plot.officers.some(officer => officer.personalNumber === personalNumber)
        );
    };

    const clearAllData = () => {
        setPlots([]);
        localStorage.removeItem(OFFICER_STORAGE_KEY);
    };

    return (
        <OfficerContext.Provider value={{ 
            plots, 
            officers, 
            addPlotWithOfficers, 
            updatePlot, 
            deletePlot, 
            deleteOfficer, 
            getPlot, 
            getOfficer, 
            getPlotByOfficer, 
            clearAllData 
        }}>
            {children}
        </OfficerContext.Provider>
    );
};