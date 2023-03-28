
export type section = {
    section: any |'';
    orderID: string |'';
    itemID: number |'';
    quantity: number |'';
}

export type box = {
    code: number
    status: any;
    quantity:number;
    position: string;
    procedure: number;
    description: string;
    sections: Array<section>;
}

class Box {
    code: number;
    status: any;
    quantity:number;
    position: string;
    procedure: number;
    description: string;
    sections: Array<section>;

    constructor(code:number){
        this.code = code;
    }

    setStatus(status:any) {
        this.status = status
    }

    function addSections(addp:type) {
        
    }

    function calculateQuantity(sections:Array<section>){
        const quan = sections.reduce((a,b) => a + b.quantity,0);
        return 0;
    }

}


/* export const box1 = {
    status: "h",
    quanitity: 150,
    position: "ZM-R8-06",
    procedure: 150,
    description: "NXL Messenger Blau innen fdfdsfsf f dsfsd feaf  faf",
    sections: [
        {section: 1, orderID: "AA1234567", itemID: 11111, quantity: 50},
        {section: 2, orderID: "AA1234567", itemID: 22222, quantity: 100},
        {section: 3, orderID: "AA1234567", itemID: 33333, quantity: 150},
        {section: 4, orderID: "AA1234567", itemID: 44444, quantity: 200},       
    ]
}; */