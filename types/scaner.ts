interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface CornerPoint {
    x: number;
    y: number;
}

interface DetectedCode {
    boundingBox: BoundingBox;
    rawValue: string;
    format: string;
    cornerPoints: CornerPoint[];
}

export type DetectedCodeArray = DetectedCode[];