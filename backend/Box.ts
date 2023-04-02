
export type section = {
    section: any |'';
    orderID: string |'';
    itemID: number |'';
    quantity: number |'';
}

export type box = {
    code: number;
    active: boolean;
    status: any;
    quantity:number;
    position: string;
    procedure: number | '';
    description: string;
    sections: Array<section>;
}


//! getters and setter with underscore becasue json objects need keys without underscores
export class Box {

    code: number;
    
    private active: boolean = false;
    
    private status!: any;
    
    private quantity!: number;

    private position!: string;

    private procedure!: number | '';
    
    private description!: string;

    private sections: Array<section> = [];
   
    static boxCodes: Array<number> = [];


    constructor(codeIn: number) {
        if(Box.boxCodes.includes(codeIn)){
            throw console.error("already exists");
        }
		this.code = codeIn;
        this.setEmpty();
        Box.boxCodes.push(codeIn)
        console.log(this)
	}

    public get getActive(): boolean {
        return this.active;
    }
    public set setActive(value: boolean) {
        this.active = value;
    }
   
    public get getStatus(): any {
        return this.status;
    }
    public set setStatus(value: any) {
        this.status = value;
    }

    public get getQuantity(): number {
        return this.quantity;
    }
    public set setQuantity(value: number) {
        this.quantity = value;
    }

    public get getPosition(): string {
        return this.position;
    }
    public set setPosition(value: string) {
        this.position = value;
    }
    
    public get getProcedure(): number | '' {
        return this.procedure;
    }
    public set setProcedure(value: number | '') {
        this.procedure = value;
    }

    public get setDescription(): string {
        return this.description;
    }
    public set getDescription(value: string) {
        this.description = value;
    }

    public get getSections(): Array<section> {
        return this.sections;
    }
    public set setSections(value: Array<section>) {
        this.sections = value;
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