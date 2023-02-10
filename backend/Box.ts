type section = {
    section: number;
    orderId: string;
    itemID: number;
    quantity: number;
}
/* class Box{
    status: any;
    quantity:number = this.sections.reduce((a,b) => a + b.quantity,0);
    position: string;
    procedure: number;
    description: string;
    sections: Array<section>;

    constructor(){

    }
}
 */


export const box1 = {
    status: "k",
    quanitity: 150,
    position: "ZM-R8-06",
    procedure: 150,
    description: "NXL Messenger Blau innen",
    sections: [
        {section: 1, orderID: "AA1234567", itemID: 12345, quantity: 50},
        {section: 2, orderID: "AA1234567", itemID: 12345, quantity: 50},
        {section: 3, orderID: "AA1234567", itemID: 12345, quantity: 50},
        {section: 4, orderID: "AA1234567", itemID: 12345, quantity: 50},         
    ]
};