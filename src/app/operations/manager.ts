import UserOperationsManager from './users/manager'
import HealthOperationsManager from './health/manager'
import { Cradle } from '../../container'

export interface CreateOperation<EntityAttributes, Entity> {
  one: (attributes: EntityAttributes) => Promise<Entity>
  many: (attributes: EntityAttributes[]) => Promise<Entity[]>
}

export interface DeleteOperation<Entity> {
  one: (entity: Entity) => Promise<Entity | null>
  many: (entities: Entity[]) => Promise<Entity[]>
}

export interface FindOperation<EntityAttributes, Entity> {
  one: (conditions: Partial<EntityAttributes>) => Promise<Entity | null>
  many: (conditions: Partial<EntityAttributes>) => Promise<Entity[]>
  byId: (id: string | number) => Promise<Entity | null>
}

export interface UpdateOperation<EntityAttributes, Entity> {
  one: (entity: Entity, attributes: EntityAttributes) => Promise<Entity | null>
  many: (entities: Entity[], attributes: EntityAttributes) => Promise<Entity[]>
}

export default class OperationManager {

  private userOperationManager: UserOperationsManager
  private healthOperationManager: HealthOperationsManager

  constructor(cradle: Cradle) {
    this.userOperationManager = cradle.userOperationManager
    this.healthOperationManager = cradle.healthOperationManager
  }

  get users() {
    return this.userOperationManager
  }

  get health() {
    return this.healthOperationManager
  }

}
