import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }
    // private tasks:Task[] = []


    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} is not found`)
        }
        return found
    }

    // getTaskWithFilters(filterDto: GetTasksFilterDto) : Task [] {
    //     const {status, search } = filterDto
    //     let tasks = this.getAllTasks()

    //     if(status){
    //         tasks = tasks.filter( t => t.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(
    //             t => t.title.includes(search) ||
    //             t.description.includes(search),
    //         )
    //     }
    //     return tasks
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} is not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await task.save()
        return task
    }
    // updateTaskStatus(id:string, status: TaskStatus): Task {
    //     var task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }


}
