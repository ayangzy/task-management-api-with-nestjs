import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    static getAllTasks: any;

   constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
   ){

   }

    async getAllTasks(
        filterDto: getTasksFilterDto,
        user: User
        ): Promise <Task[]>{
        return await this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id:number, user: User) : Promise<Task>{
        const task = await this.taskRepository.findOne({ where: { id, userId: user.id}});

        if(!task){
            throw new NotFoundException('The requested task ID does not exist');
        }
        return task;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user : User
        ): Promise <Task> {
       return this.taskRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatus(
        id:number, status: TaskStatus,
        user: User
        ): 
    Promise <Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id : number, user: User): Promise <void>{
        const task = await this.taskRepository.delete({ id, userId: user.id});
        if(task.affected == 0){
            throw new NotFoundException('The requested task ID does not exist');
        }
    }
}
