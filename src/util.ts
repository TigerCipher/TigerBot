
// hydrates json data into a class object and maintains expected behavior/functions
function hydrate<T extends Object>(constr: {new(...args: any[]): T}, data: string, strict: boolean = true, ...args: any[]) : T {
    console.log(`Hydrating ${data}`);
    const obj = JSON.parse(data);
    const inst = new constr(...args);

    for(let key in obj){
        if(!strict || inst.hasOwnProperty(key)){
            (inst as any)[key] = obj[key];
        }
    }

    return inst;
}

export { hydrate };