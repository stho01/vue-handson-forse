import {delay} from './delay';
import {IProduct, IProductName} from "@/domain/product";
import {IProductDto} from "@/dto/product";

class ProductApi {

    private _products: IProductDto[] = [
        {id: 'AAA123', name: 'Melk', weight: 1},
        {id: 'AAA126', name: 'Brød', weight: 0.6},
        {id: 'AAA128', name: 'Ketchup', weight: 1.5}
    ];

    //********************************************

    async getProducts(): Promise<IProductName[]> {
        await delay(); // to simulate data transfer over network.

        return this._products.map(product => ({
            name: product.name,
            id: product.id
        }));
    }

    //********************************************

    async getProductsWithWeight(): Promise<IProduct[]> {
        await delay(); // to simulate data transfer over network.

        return this._products.map(p => ({
            name: p.name,
            id: p.id,
            weight: p.weight
        }));
    }

    //********************************************

    async getProduct(id: string): Promise<IProduct> {
        await delay(); // to simulate data transfer over network.

        const product: IProductDto | undefined = this._products.filter(p => p.id === id).pop();

        if (!product) {
            throw new Error(`Produktet med id ${id} finnes ikke`);
        }

        return { ...product };
    }

    //********************************************

    async upsertProduct(product: IProduct): Promise<void> {
        await delay(); // to simulate data transfer over network.

        const existingProduct = this._products.find(p => p.id === product.id);

        if (!existingProduct) {
            if (product.id == null || product.id === "") {
                product.id = this.generateProductId();
            }

            this._products.push(product);
        } else {
            existingProduct.name = product.name;
            existingProduct.weight = product.weight;
        }
    }

    //********************************************

    generateProductId(): string {
        let code: string = "";
        let no: string = "";

        for (let i = 0; i < 3; i++) {
            code += String.fromCharCode(Math.floor(Math.random() * 25) + 65);
            no += Math.floor(Math.random() * 10).toString();
        }

        return `${code}${no}`;
    }
}

export const productApi = new ProductApi();
