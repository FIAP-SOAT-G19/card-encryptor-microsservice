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
        secretKey: '$2a$12$N8KpRrrBKBkFo3jYez.KTOA7nTvlwyuM0sVlzPVdCMhRQzdG0NYFi'
    }
  })
}

main()
