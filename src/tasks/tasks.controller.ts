import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) 
    filterDto: getTasksFilterDto,
    @Req() req,
    ): Promise <Task[]>{
       
     return this.tasksService.getAllTasks(filterDto, req.user);
     
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @Req() req
        ): Promise<Task> {
        return this.tasksService.getTaskById(id, req.user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Req() req,
        @Body() createTaskDto: CreateTaskDto): Promise <Task> {
        return this.tasksService.createTask(createTaskDto, req.user);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Req() req,
        ): Promise <Task> {
        return this.tasksService.updateTaskStatus(id, status, req.user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
        )
        :Promise <void> {
        return this.tasksService.deleteTask(id, req.user);
    }


}
