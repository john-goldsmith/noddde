import {
  Model,
  Document,
  FilterQuery,
  QueryFindOneAndRemoveOptions,
  SaveOptions,
  UpdateQuery,
  QueryFindOneAndUpdateOptions,
  ModelPopulateOptions,
  ModelUpdateOptions
} from 'mongoose'

interface QueryMetadata {
  ok?: number
  n?: number
  deletedCount?: number
}

export default class MongoMongooseBaseRepository<Attributes, Instance extends Document> {

  model: Model<Instance>

  constructor(model: Model<Instance>) {
    this.model = model
  }

  omitNullAndUndefined(conditions: FilterQuery<Attributes>) {
    // TODO: Use Object.entries and Object.fromEntries, but TS doesn't yet support the latter
    const keys = Object.keys(conditions)
    const newConditions = keys.reduce((acc, key) => {
      if (conditions[key] !== null && conditions[key] !== undefined) {
        acc[key] = conditions[key]
      }
      return acc
    }, {})
    return newConditions
  }

  /**
   * Aliases `id` to `_id` to satisfy Mongoose conventions, and keep
   * everything else.
   */
  aliasConditions(conditions: FilterQuery<Attributes>) {
    const { id: _id, ...rest } = conditions
    const aliasedConditions = { _id, ...rest }
    return aliasedConditions
  }

  async aggregate(): Promise<any> {
    const result = await this.model.aggregate()
    return result
  }

  async bulkWrite(): Promise<any> {
    const result = await this.model.bulkWrite([])
    return result
  }

  async count(conditions: any): Promise<number> {
    const result = await this.model.count(conditions)
    return result
  }

  async countDocuments(): Promise<number> {
    const result = await this.model.countDocuments()
    return result
  }

  /*async create(attributes: Attributes | Attributes[], saveOptions?: SaveOptions): Promise<Instance | Instance[]> {
    if (Array.isArray(attributes)) {
      const result = await this.createMany(attributes, saveOptions)
      return result
    } else {
      const result = await this.createOne(attributes, saveOptions)
      return result
    }
  }*/

  async createOne(attributes: Attributes, saveOptions?: SaveOptions): Promise<Instance> {
    const result = await this.model.create(attributes, saveOptions)
    return result
  }

  async createMany(attributes: Attributes[], saveOptions?: SaveOptions): Promise<Instance[]> {
    const result = await this.model.create(attributes, saveOptions)
    return result
  }

  async createCollection(): Promise<void> {
    const result = await this.model.createCollection()
    return result
  }

  async createIndexes(): Promise<void> {
    const result = await this.model.createIndexes()
    return result
  }

  async deleteOne(conditions: FilterQuery<Attributes>): Promise<QueryMetadata> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.deleteOne(newConditions)
    return result
  }

  async deleteMany(conditions: any): Promise<QueryMetadata> {
    const result = await this.model.deleteMany(conditions)
    return result
  }

  async delete(document: Instance): Promise<Instance> {
    await document.remove()
    return document
  }

  /*async discriminator(name: string, schema: Schema<T>): Promise<Model<T>> {
    const result = await this.model.discriminator(name, schema)
    return result
  }*/

  async distinct(field: string): Promise<any[]> {
    const result = await this.model.distinct(field)
    return result
  }

  async ensureIndexes(): Promise<void> {
    const result = await this.model.ensureIndexes()
    return result
  }

  async estimatedDocumentCount(): Promise<number> {
    const result = await this.model.estimatedDocumentCount()
    return result
  }

  async exists(filter: FilterQuery<Attributes>): Promise<boolean> {
    const { id: _id, ...rest } = filter
    const newFilter = { _id, ...rest }
    const result = await this.model.exists(newFilter)
    return result
  }

  async find(conditions: FilterQuery<Attributes>): Promise<Instance[]> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.find(newConditions)
    return result
  }

  async findById(id: string | number): Promise<Instance | null> {
    const result = await this.model.findById(id)
    return result
  }

  async findByIdAndDelete(id: string): Promise<Instance | null> {
    const result = await this.model.findByIdAndDelete(id)
    return result
  }

  async findByIdAndRemove(id: string): Promise<Instance | null> {
    const result = await this.model.findByIdAndRemove(id)
    return result
  }

  async findByIdAndUpdate(id: string, update, options = {new: true}): Promise<Instance | null> {
    const newUpdate = this.omitNullAndUndefined(update)
    const result = await this.model.findByIdAndUpdate(id, newUpdate, options).exec()
    return result
  }

  async findOne(conditions: FilterQuery<Attributes>): Promise<Instance | null> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const document = await this.model.findOne(newConditions)
    return document
  }

  async findOneAndDelete(conditions: FilterQuery<Attributes>, options: QueryFindOneAndRemoveOptions = {}): Promise<Instance | null> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.findOneAndDelete(newConditions, options)
    return result
  }

  async findOneAndRemove(conditions: FilterQuery<Attributes>, options: QueryFindOneAndRemoveOptions): Promise<Instance | null> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.findOneAndRemove(newConditions, options)
    return result
  }

  async replaceOne(conditions: FilterQuery<Attributes>, replacement: any): Promise<Instance | null> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = <Instance | null> await this.model.replaceOne(newConditions, replacement)
    return result
  }

  async findOneAndUpdate(conditions: FilterQuery<Attributes>, update: UpdateQuery<Attributes>, options: QueryFindOneAndUpdateOptions): Promise<Instance | null> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.findOneAndUpdate(newConditions, update, options)
    return result
  }

  async geoSearch(conditions, options): Promise<Instance[]> {
    const result = await this.model.geoSearch(conditions, options)
    return result
  }

  async hydrate(obj): Promise<Instance> {
    const result = await this.model.hydrate(obj)
    return result
  }

  async init(): Promise<Instance> {
    const result = await this.model.init()
    return result
  }

  async insertMany(docs): Promise<Instance | Instance[]> {
    const result = <Instance | Instance[]> await this.model.insertMany(docs)
    return result
  }

  // async inspect(): Promise<void> {
  //   const result = await this.model.inspect()
  //   return result
  // }

  async listIndexes(): Promise<void> {
    const result = await this.model.listIndexes()
    return result
  }

  // async mapReduce(o): Promise<void> {
  //   const result = await this.model.mapReduce(o)
  //   return result
  // }

  async populate(docs: any[], options: ModelPopulateOptions | ModelPopulateOptions[]): Promise<Instance | Instance[]> {
    const result = <Instance | Instance[]> await this.model.populate(docs, options)
    return result
  }

  async remove(conditions: FilterQuery<Attributes>): Promise<QueryMetadata> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.remove(newConditions)
    return result
  }

  async removeDocument(document: Instance): Promise<Instance> {
    const result = await document.remove()
    return result
  }

  async saveDocument(document: Instance, options: SaveOptions): Promise<Instance> {
    const result = await document.save(options)
    return result
  }

  async updateDocument(document: Instance, update, options: SaveOptions = {}): Promise<Instance | null> {
    const newUpdate = Object.keys(update)
      .reduce((acc, key) => {
        if (update[key] !== null && update[key] !== undefined) {
          acc[key] = update[key]
        }
        return acc
      }, {})
    /**
     * Note that Mongoose doesn't provide a document.update() instance
     * method, so instead, it's recommended to do the following:
     *
     * document.property = value
     * document.save()
     */
    Object.keys(newUpdate).forEach(key => document[key] = newUpdate[key])
    const result = await document.save(options)
    return result
  }

  async update(conditions: FilterQuery<Attributes>, doc: UpdateQuery<Attributes>, options: ModelUpdateOptions): Promise<Instance> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.update(newConditions, doc, options)
    return result
  }

  async updateOne(conditions: FilterQuery<Attributes>, doc: UpdateQuery<Attributes>, options: ModelUpdateOptions): Promise<Instance> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.updateOne(newConditions, doc, options)
    return result
  }

  async updateMany(conditions: FilterQuery<Attributes>, doc: UpdateQuery<Attributes>, options: ModelUpdateOptions): Promise<Instance[]> {
    const aliasedConditions = this.aliasConditions(conditions)
    const newConditions = this.omitNullAndUndefined(aliasedConditions)
    const result = await this.model.updateMany(newConditions, doc, options)
    return result
  }

}
