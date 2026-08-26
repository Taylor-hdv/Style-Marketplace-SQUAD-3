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

    console.log("Produto criado:", product.name);

    const variants = [
        {
            color: "Black",
            size: "M",
            quantity: 20,
            price: 99.90
        },
        {
            color: "White",
            size: "G",
            quantity: 10,
            price: 109.90
        }
    ];

    for (const variantData of variants) {
        const existingVariant = await prisma.variant.findFirst({
            where: {
                productId: product.id,
                color: variantData.color,
                size: variantData.size
            }
        });

        if (!existingVariant) {
            await prisma.variant.create({
                data: {
                    ...variantData,
                    productId: product.id
                }
            });
        }
    }

    console.log("Variantes criadas.");

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

    console.log("ProductCategory criada.");
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