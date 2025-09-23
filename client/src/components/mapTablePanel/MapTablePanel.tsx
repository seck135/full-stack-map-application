import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useObjects } from "../../api/queries/objects";
import { usePolygons } from "../../api/queries/polygons";
import type { ObjectMarker, Polygon } from "../../types/types";
import GenericCollapse from "./GenericCollapse";

type CombinedItem = (ObjectMarker & { type: "אובייקט" }) | (Polygon & { type: "פוליגון" });

const MapTablePanel = () => {
    const { data: polygons, isLoading: polygonsIsLoading, error: polygonsError } = usePolygons();
    const { data: objects, isLoading: objectsIsLoading, error: objectsError } = useObjects();

    const [expandedPolygonId, setExpandedPolygonId] = useState<string | null>(null);

    if (polygonsIsLoading || objectsIsLoading) {
        return <span>טוען...</span>;
    }
    if (polygonsError || objectsError) {
        return <span>שגיאה...</span>;
    }

    const combinedItems: CombinedItem[] = [
        // as const define it as "אובייקט" and not just as string
        ...(objects ?? []).map((obj) => ({ ...obj, type: "אובייקט" as const })),
        ...(polygons ?? []).map((poly) => ({ ...poly, type: "פוליגון" as const })),
    ].sort((a, b) => a.name.localeCompare(b.name, "he")); // sort by name in Hebrew

    const handleCollapseChange = (polygonId: string, keys: string | string[]) => {
        if (keys.length > 0) {
            setExpandedPolygonId(polygonId);
        } else {
            setExpandedPolygonId(null);
        }
    };

    const columns: ColumnsType<CombinedItem> = [
        { title: "שם", dataIndex: "name", key: "name" },
        { title: "סוג", dataIndex: "type", key: "type" },
        {
            title: "קו רוחב (lat)",
            key: "lat",
            render: (_, item) =>
                item.type === "אובייקט"
                    ? Math.round(item.geometry.coordinates[1] * 100) / 100
                    : (
                        <GenericCollapse
                            collapseColumn="lat"
                            itemId={item.id}
                            expandedPolygonId={expandedPolygonId}
                            points={item.geometry.coordinates[0]}
                            handleCollapseChange={handleCollapseChange}
                        />
                    ),
        },
        {
            title: "קו אורך (lon)",
            key: "lon",
            render: (_, item) =>
                item.type === "אובייקט"
                    ? Math.round(item.geometry.coordinates[0] * 100) / 100
                    : (
                        <GenericCollapse
                            collapseColumn="lon"
                            itemId={item.id}
                            expandedPolygonId={expandedPolygonId}
                            points={item.geometry.coordinates[0]}
                            handleCollapseChange={handleCollapseChange}
                        />
                    ),
        },
    ];

    return (
        <ConfigProvider direction="rtl">
            <Table
                className="map-table-panel"
                dataSource={combinedItems}
                columns={columns}
                rowKey="id"
                pagination={false}
                scroll={{ y: '100%', x: "100%" }}
            />
        </ConfigProvider>
    );
};

export default MapTablePanel;
