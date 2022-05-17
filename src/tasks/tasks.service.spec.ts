import { Test } from '@nestjs/testing';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = { useername: "John Doe"};

const mockTaskRepository = () => {
    getTasks: jest.fn();
}

describe('TasksService', () => {
    let tasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository}
            ]
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        tasksRepository = await module.get<TaskRepository>(TaskRepository)
    });

    describe('getTasks', () => {
        it('get all tasks from the repositroy', async () => {
            //tasksRepository.getTasks.mockResolvedValue('some value here');
            //expect(tasksRepository.getTasks).not.toHaveBeenCalled();

            const filters: getTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'some search query here'}
            const result = await TasksService.getAllTasks(filters, mockUser);

            expect(tasksRepository.getTasks).toHaveBeenCalled();
            
            expect(result).toEqual('some value');
        });
    });

});