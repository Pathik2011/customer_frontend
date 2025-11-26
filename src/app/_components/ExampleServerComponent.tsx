// Example of using the new API structure in a Server Component
import { homepageService } from '@/services/homepageService';

export default async function ExampleServerComponent() {
    // Fetch data on the server
    const response = await homepageService.getTopSection();

    // Handle error
    if (!response.success || !response.res) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600">Error: {response.error || 'Failed to load data'}</p>
            </div>
        );
    }

    // Use the data
    const data = response.res;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{data.brand.display_title}</h2>
            <div className="grid grid-cols-3 gap-4">
                {data.brand.items.slice(0, 6).map((brand) => (
                    <div key={brand.brand_id} className="p-4 border rounded">
                        <p className="font-semibold">{brand.brand_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
