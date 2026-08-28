import { waitForDebugger } from "inspector";
import { prisma } from "../config/prisma";

async function main() {
    console.log("Iniciando seed...");

    const user = await prisma.user.upsert({
        where: {
            email: "teste.user@marketplace.com"
        },
        update: {},
        create: {
            firstName: "Teste",
            lastName: "User",
            email: "teste.user@marketplace.com",
            hash: "seedHash",
            salt: "seedSalt"
        }
    });

    console.log("User criado:", user.email);

    const existingProduct = await prisma.product.findFirst({
        where: {
            name: "Basic T-Shirt"
        }
    });

    const product = existingProduct ?? await prisma.product.create({
        data: {
            name: "Basic T-Shirt",
            discount: 10,
            description: "Basic cotton t-shirt",
            tag: "clothing",
            specification: "100% cotton"
        }
    });

    const existingVariant = await prisma.variant.findFirst({
        where: {
            productId: product.id,
            color: "Black",
            size: "M"
        }
    });

    if (!existingVariant) {
        await prisma.variant.create({
            data: {
                color: "Black",
                size: "M",
                quantity: 20,
                price: 99.90,
                productId: product.id
            }
        });
    }

    const existingProduct2 = await prisma.product.findFirst({
        where: {
            name: "Cashmere Sweater"
        }
    });

    const product2 = existingProduct2 ?? await prisma.product.create({
        data: {
            name: "Cashmere Sweater",
            discount: 15,
            description: "Comfortable casual Sweater",
            tag: "clothing",
            specification: "Cashmere tissue"
        }
    });

    const existingVariant2 = await prisma.variant.findFirst({
        where: {
            productId: product2.id,
            color: "Brown",
            size: "G"
        }
    });

    if (!existingVariant2) {
        await prisma.variant.create({
            data: {
                color: "Brown",
                size: "g",
                quantity: 15,
                price: 199.90,
                productId: product2.id
            }
        });
    }

    const existingProduct3 = await prisma.product.findFirst({
        where: {
            name: "Slim Jeans"
        }
    });

    const product3 = existingProduct3 ?? await prisma.product.create({
        data: {
            name: "Slim Jeans",
            discount: 5,
            description: "Slim fit denim jeans",
            tag: "clothing",
            specification: "Denim"
        }
    });

    const existingVariant3 = await prisma.variant.findFirst({
        where: {
            productId: product3.id,
            color: "Blue",
            size: "42"
        }
    });

    if (!existingVariant3) {
        await prisma.variant.create({
            data: {
                color: "Blue",
                size: "42",
                quantity: 15,
                price: 149.90,
                productId: product3.id
            }
        });
    }

    const existingProduct4 = await prisma.product.findFirst({
        where: {
            name: "Running Shoes"
        }
    });

    const product4 = existingProduct4 ?? await prisma.product.create({
        data: {
            name: "Running Shoes",
            discount: 20,
            description: "Running shoes for daily activities",
            tag: "shoes",
            specification: "Lightweight material"
        }
    });

    const existingVariant4 = await prisma.variant.findFirst({
        where: {
            productId: product4.id,
            color: "White",
            size: "41"
        }
    });

    if (!existingVariant4) {
        await prisma.variant.create({
            data: {
                color: "White",
                size: "41",
                quantity: 10,
                price: 249.90,
                productId: product4.id
            }
        });
    }

    const existingProduct5 = await prisma.product.findFirst({
        where: {
            name: "Casual Jacket"
        }
    });

    const product5 = existingProduct5 ?? await prisma.product.create({
        data: {
            name: "Casual Jacket",
            discount: 12,
            description: "Casual jacket for everyday use",
            tag: "clothing",
            specification: "Polyester"
        }
    });

    const existingVariant5 = await prisma.variant.findFirst({
        where: {
            productId: product5.id,
            color: "Green",
            size: "M"
        }
    });

    if (!existingVariant5) {
        await prisma.variant.create({
            data: {
                color: "Green",
                size: "M",
                quantity: 8,
                price: 219.90,
                productId: product5.id
            }
        });
    }

    console.log("Produtos e variantes criados.");


    let category = await prisma.category.findFirst({
        where: {
            name: "Clothing"
        }
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: "Clothing"
            }
        });
    }

    console.log("Categoria criada:", category.name);

    await prisma.productCategory.upsert({
        where: {
            productId_categoryId: {
                productId: product.id,
                categoryId: category.id
            }
        },
        update: {},
        create: {
            productId: product.id,
            categoryId: category.id
        }
    });

    await prisma.productCategory.upsert({
        where: {
            productId_categoryId: {
                productId: product2.id,
                categoryId: category.id
            }
        },
        update: {},
        create: {
            productId: product2.id,
            categoryId: category.id
        }
    });

    await prisma.productCategory.upsert({
        where: {
            productId_categoryId: {
                productId: product3.id,
                categoryId: category.id
            }
        },
        update: {},
        create: {
            productId: product3.id,
            categoryId: category.id
        }
    });

    await prisma.productCategory.upsert({
        where: {
            productId_categoryId: {
                productId: product4.id,
                categoryId: category.id
            }
        },
        update: {},
        create: {
            productId: product4.id,
            categoryId: category.id
        }
    });

    await prisma.productCategory.upsert({
        where: {
            productId_categoryId: {
                productId: product5.id,
                categoryId: category.id
            }
        },
        update: {},
        create: {
            productId: product5.id,
            categoryId: category.id
        }
    });

    const categoryProductQuantity = await prisma.productCategory.count({
        where: {
            categoryId: category.id
        }
    });

    await prisma.category.update({
        where: {
            id: category.id
        },
        data: {
            quantity: categoryProductQuantity
        }
    });

    console.log("Produtos associados à categoria.");
    console.log("Quantidade da categoria:", categoryProductQuantity);

    console.log("Seed finalizada com sucesso.");
    
}

main()
    .catch((error) => {
        console.error("Erro ao executar seed:", error);
        process.exit(1);
        
    })
    .finally(async () => {
        await prisma.$disconnect();
    });