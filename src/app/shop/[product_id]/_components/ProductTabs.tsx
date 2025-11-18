"use client";

import { useMemo, useState } from "react";
import { Product, ProductYouTubeMedia } from "@/types/product";

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<
        "details" | "specification" | "usage"
    >("details");

    const tabs = [
        { id: "details" as const, label: "Product Details" },
        { id: "specification" as const, label: "Specification" },
        { id: "usage" as const, label: "How to Use" },
    ];

    // Group tags by tag_name
    const groupedTags = product.tags.reduce((acc, tag) => {
        if (!acc[tag.tag_name]) {
            acc[tag.tag_name] = [];
        }
        acc[tag.tag_name].push(tag.tag_value);
        return acc;
    }, {} as Record<string, string[]>);
    const video = useMemo(() => {
        return product.media?.find((item) => item.media_type === "YOUTUBE_LINK") as ProductYouTubeMedia | undefined
    }, [product])

    return (
        <div className="mb-8 space-y-3">
            {/* Tab Headers */}
            <div className="bg-white p-3 lg:p-1 border border-[#E0E2E7] rounded-xl lg:mx-auto lg:w-max">
                {/* Mobile: Grid Layout */}
                <div className="grid grid-cols-2 gap-3 lg:hidden">
                    {tabs.slice(0, 2).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium transition-all rounded-xl ${activeTab === tab.id
                                ? "bg-[#003C22] text-white"
                                : "bg-[#E8F7F0] text-[#003C22]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <div className="col-span-2 flex justify-center">
                        <button
                            onClick={() => setActiveTab(tabs[2].id)}
                            className={`w-1/2 px-4 py-3 text-sm font-medium transition-all rounded-xl ${activeTab === tabs[2].id
                                ? "bg-[#003C22] text-white"
                                : "bg-[#E8F7F0] text-[#003C22]"
                                }`}
                        >
                            {tabs[2].label}
                        </button>
                    </div>
                </div>

                {/* Desktop: Flex Layout */}
                <div className="hidden lg:flex gap-3 items-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 text-base font-medium transition-all rounded-xl ${activeTab === tab.id
                                ? "bg-[#003C22] text-white"
                                : "bg-[#E8F7F0] text-[#003C22] hover:bg-[#D0EFE3]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-4 lg:p-8 border border-[#E0E2E7] rounded-xl">
                {activeTab === "details" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Column */}
                        <div className="space-y-4 lg:space-y-6">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                                    {product.product_name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 lg:mb-6">
                                    {product.description}
                                </p>
                            </div>

                            {/* About Section */}
                            {product.properties?.introduction && (
                                <div>
                                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">
                                        About {product.product_name}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {product.properties.introduction}
                                    </p>
                                </div>
                            )}

                            {/* Technical Details */}
                            {product.product_tech_name && (
                                <div>
                                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">
                                        {product.product_name} Technical Details
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                                        <li>Technical Content: {product.product_tech_name}</li>
                                        {product.properties?.mode_of_action_details && (
                                            <li>Mode of action: {product.properties.mode_of_action_details}</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 lg:space-y-6">
                            {/* Key Features & Benefits */}
                            {product.properties?.features_and_benefits && Array.isArray(product.properties.features_and_benefits) && (
                                <div>
                                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">
                                        Key Features & Benefits
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                                        {product.properties.features_and_benefits.map((feature: string, idx: number) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Additional Information */}
                            <div>
                                <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">
                                    Additional Information
                                </h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                                    {Object.entries(groupedTags).map(([tagName, values]) => (
                                        values.map((value, idx) => (
                                            <li key={`${tagName}-${idx}`}>{value}</li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "specification" && (
                    <div className="space-y-4 lg:space-y-6">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Specifications</h3>

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-900 w-1/3">
                                            Title
                                        </th>
                                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-900">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">Technical Name</td>
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">{product.product_tech_name}</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">Brand</td>
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">{product.brand}</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">Category</td>
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">{product.category_name}</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">SKU</td>
                                        <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">{product.sku}</td>
                                    </tr>
                                    {product.crops && product.crops.length > 0 && (
                                        <tr className="bg-white hover:bg-gray-50">
                                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">Target Crops</td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">
                                                {product.crops.map((c) => c.crop_name).join(", ")}
                                            </td>
                                        </tr>
                                    )}
                                    {Object.entries(groupedTags).map(([tagName, values]) => (
                                        <tr key={tagName} className="bg-white hover:bg-gray-50">
                                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-600">{tagName}</td>
                                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">{values.join(", ")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "usage" && (
                    <div className="space-y-6 lg:space-y-8">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 text-center">How to Use</h3>

                        {/* Video Section */}
                        {video && video.url ? (
                            <div className="flex justify-center">
                                <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get('v') || video.url.split('/').pop()?.split('?')[0]}`}
                                        title={video.label || "How to Use"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-50">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-gray-500 text-sm">No video available</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        {product.upload_instructions && (
                            <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-gray-700 leading-relaxed">{product.upload_instructions}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
