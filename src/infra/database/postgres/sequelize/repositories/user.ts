import { Cradle } from "../../../../../container"
import User from "../../../../../domain/user"

export default class PostgresSequelizeUserRepository {

  model: User

  constructor(cradle: Cradle) {
    this.model = cradle.User
  }

  async get(reference: number): Promise<User> {
    return new Promise((resolve, reject) => {})
  }

  async list(): Promise<User[]> {
    return new Promise((resolve, reject) => {})
  }

  async count(): Promise<number> {
    return new Promise((resolve, reject) => {})
  }

  async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {})
  }

  async findOne(): Promise<User> {
    return new Promise((resolve, reject) => {})
  }

  async findById(reference: number): Promise<User> {
    return new Promise((resolve, reject) => {})
  }

  async create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {})
  }

  async update(user: User, attributes: any): Promise<User> {
    return new Promise((resolve, reject) => {})
  }

  async remove(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {})
  }

  async reload(): Promise<undefined> {
    return new Promise((resolve, reject) => {})
  }

}