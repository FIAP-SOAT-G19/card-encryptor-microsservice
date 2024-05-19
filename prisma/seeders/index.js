const { PrismaClient } = require('@prisma/client')
const { randomUUID } = require('crypto')

const prismaClient = new PrismaClient()

const main = async () => {
  await prismaClient.applications.deleteMany({})
  await prismaClient.applications.create({
    data: {
        id: randomUUID(),
        appId: 'order_microsservice',
        description: 'Order microsservice',
        secretKey: 'e6cd5db8d02df52e23eb590e59d43cdc'
    }
  })
  await prismaClient.applications.create({
    data: {
        id: randomUUID(),
        appId: 'payment_microsservice',
        description: 'Payment microsservice',
        secretKey: 'd8c08ba7cab3184283309449a6884bd1'
    }
  })
}

main()
