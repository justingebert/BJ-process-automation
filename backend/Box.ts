
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
    procedure: number | '';
    description: string;
    sections: Array<section>;
}

export class Box {

    private _code!: number;
    
    private _status: any;
    private _quantity!: number;
    private _position!: string;
    private _procedure!: number | '';
    private _description!: string;
    private _sections: Array<section> = [];

    static boxCodes: Array<number> = [];

    public get code(): number {
        return this._code;
    }
    public set code(value: number) {
        this._code = value;
    }

    public get status(): any {
        return this._status;
    }
    public set status(value: any) {
        this._status = value;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    public get position(): string {
        return this.position;
    }
    public set position(value: string) {
        this.position = value;
    }

    public get procedure(): number | ''{
        return this._procedure;
    }
    public set procedure(value: number | '') {
        this._procedure = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get sections(): Array<section> {
        return this._sections;
    }
    public set sections(value: Array<section>) {
        this._sections = value;
    }

    constructor(code: number) {
		this.code = code;
        this.setEmpty
        Box.boxCodes.push(code)
	}

    private setEmpty(){
        this.status = ''
        this.quantity = 0
        this.position = ''
        this.procedure = ''
        this.description = ''
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