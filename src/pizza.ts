export interface Pizza{
    calculatePrice(): number;
}
export class DaMichelePizza implements Pizza{
    private size: string;
    private type: string;
    constructor(size: string, type:string){
        this.size = size;
        this.type = type;
    }
    calculatePrice(): number{
        return 0;
    }
}
export class RossopomodoroPizza implements Pizza{
    private size: string;
    private type: string;
    constructor(size: string, type:string){
        this.size = size;
        this.type = type;
    }
    calculatePrice(): number{
        return 0;
    }
}
export class PizziumPizza implements Pizza{
    private size: string;
    private type: string;
    constructor(size: string, type:string){
        this.size = size;
        this.type = type;
    }
    calculatePrice(): number{
        return 0;
    }
}