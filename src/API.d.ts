declare  type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    imageURL: string,
    rating: {
        rate: number,
        count: number
    }
}
