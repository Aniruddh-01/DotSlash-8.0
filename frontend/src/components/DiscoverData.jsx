import Card from "./Card";
import economics from './economy.png';
import education from './education.png';
import employ from './employment.png';
import environment from './environment.png';
import finance from './finance.png';
import health from './health.png';
import information from './information.png';
import science from './science.png';

function DiscoverData() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Discover Datasets By</h1>
            
            {/* Sidebar or Filter Section */}
            <div className="flex flex-col sm:flex-row gap-8">
                {/* Left Sidebar */}
                <div className="w-full sm:w-1/4 bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Sector</h2>
                    <ul className="space-y-2">
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Economy</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Information and Communications</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Labor and Employment</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Education</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Environment and Forest</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Health and Family Welfare</li>
                        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Science and Technology</li>
                        <li className="text-blue-600 hover:bg-gray-200 p-2 rounded cursor-pointer">View More →</li>
                    </ul>
                </div>

                {/* Card Grid */}
                <div className="w-full sm:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <Card image={economics} title="Economy" />
                        <Card image={education} title="Education" />
                        <Card image={employ} title="Employment" />
                        <Card image={environment} title="Environment" />
                        <Card image={finance} title="Finance" />
                        <Card image={health} title="Health" />
                        <Card image={information} title="Information" />
                        <Card image={science} title="Science" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscoverData;