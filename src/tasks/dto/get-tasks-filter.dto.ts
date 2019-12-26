import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsIn } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
    status : TaskStatus
    
    @IsOptional()
    search: string
}