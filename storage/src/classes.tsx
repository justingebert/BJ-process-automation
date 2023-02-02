class Box {
    code: string;
    position: string;
    status: number;
    procedure: number;
    quantity: number;

    sections: Array<Section>; 
    
}

class Section{
    id: number;
    orderID: string;
    itemId: number;
    quantity: number;
}

export{}