import { vi } from 'vitest'

const mockPrisma = {
    user: {
        create: vi.fn(),
        findUnique: vi.fn()

    },
    statistic: {
        createMany: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        updateMany: vi.fn()
    },
    game: {
        create: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn()
    }
}

export const PrismaClient = vi.fn(()=>mockPrisma);

export default { PrismaClient }