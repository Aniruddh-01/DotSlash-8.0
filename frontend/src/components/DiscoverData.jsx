import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Modal from './Modal';
import BarChart from './BarChart';
import economics from './economy.png';
import education from './education.png';
import employ from './employment.png';
import environment from './environment.png';
import finance from './finance.png';
import health from './health.png';
import information from './information.png';
import science from './science.png';

function DiscoverData() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        fetch('/india_sector_data.csv')
            .then(response => response.text())
            .then(text => {
                const [headers, ...rows] = text.split('\n');
                const data = rows.map(row => {
                    const values = row.split(',');
                    return {
                        Year: values[0],
                        'GDP': parseFloat(values[1]),
                        'Literacy Rate': parseFloat(values[2]),
                        'Unemployment Rate': parseFloat(values[3]),
                        'Forest Cover': parseFloat(values[4]),
                        'Fiscal Deficit': parseFloat(values[5]),
                        'Life Expectancy': parseFloat(values[6]),
                        'Internet Penetration': parseFloat(values[7]),
                        'R&D Spending': parseFloat(values[8])
                    };
                });
                setCsvData(data);
            });
    }, []);

    const handleCardClick = (title) => {
        setSelectedData({
            title,
            data: csvData
        });
        setModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Discover Budgets By</h1>
            
            {/* Sidebar or Filter Section */}
            <div className="flex flex-col  justify-center items-center sm:flex-row gap-8">
                

                {/* Card Grid */}
                <div className="w-full sm:w-3/4 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        <div onClick={() => handleCardClick('GDP')} className="cursor-pointer">
                            <Card image={economics} title="Economy" />
                        </div>
                        <div onClick={() => handleCardClick('Literacy Rate')} className="cursor-pointer">
                            <Card image={education} title="Education" />
                        </div>
                        <div onClick={() => handleCardClick('Unemployment Rate')} className="cursor-pointer">
                            <Card image={employ} title="Employment" />
                        </div>
                        <div onClick={() => handleCardClick('Forest Cover')} className="cursor-pointer">
                            <Card image={environment} title="Environment" />
                        </div>
                        <div onClick={() => handleCardClick('Fiscal Deficit')} className="cursor-pointer">
                            <Card image={finance} title="Finance" />
                        </div>
                        <div onClick={() => handleCardClick('Life Expectancy')} className="cursor-pointer">
                            <Card image={health} title="Health" />
                        </div>
                        <div onClick={() => handleCardClick('Internet Penetration')} className="cursor-pointer">
                            <Card image={information} title="Information" />
                        </div>
                        <div onClick={() => handleCardClick('R&D Spending')} className="cursor-pointer">
                            <Card image={science} title="Science" />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {selectedData && csvData && (
                    <div className="h-96">
                        <BarChart 
                            data={csvData} 
                            title={selectedData.title}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default DiscoverData;