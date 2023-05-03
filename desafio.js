class ProductManager{
    #products
    #error
    constructor(){
        this.#products = []
        this.#error = undefined
    }

    #generateId = () => {
        return (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1
    }

    #validateProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            this.#error = `[${title}]: Campo incompleto. Todos los campos son obligatorios.`
        }else{
            const found = this.#products.find(item => item.code === code)
            found ? (this.#error = `[${title}]: El code ya existía.`) : this.#error = undefined
        }
    }

    getProducts = () => {
        return this.#products
    }
    
    getProductById = (id) => {
        const product = this.#products.find(item => item.id === id)
        if (!product) return `ID[${id}] not found`
        else return product
    }
    
    addProducts = (title, description, price, thumbnail, code, stock) => {
        this.#validateProduct(title, description, price, thumbnail, code, stock)
        this.#error === undefined ? this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock}) : console.log(this.#error)
    }
    
}



const productManager = new ProductManager()
console.log(productManager.getProducts()) // []
productManager.addProducts('producto prueba', 'este es un producto de prueba', 200, 'Sin Imagen', 'abc123', 25)
productManager.addProducts('producto prueba 2', 'este es un producto de prueba', 200, 'Sin Imagen', 'abc123', 25) // este codigo ya existia.
productManager.addProducts('producto prueba 3', 'este es un producto de prueba', 200, 'Sin Imagen') // faltan campos
console.log(productManager.getProducts())
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(2)) // ID[2] not Found
