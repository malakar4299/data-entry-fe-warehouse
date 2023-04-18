export interface Shipment {
    Date: string;
    WarehouseID: string;
    ShippingPO: string;
    ShipmentID: Number;
    BoxesRcvd: Number;
}

export interface ShipperID {
    ShipperID: string
}

export interface ReportData {
    Boxes: Number,
    Dates: String
}

export interface ReportProps {
    Boxes: Number[],
    Dates: String[]
}

export interface PieChartData {
    ShipperID: String,
    TotalBoxes: Number
}

