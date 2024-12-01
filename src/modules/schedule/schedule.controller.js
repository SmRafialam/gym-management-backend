import { ScheduleService } from '../schedule/schedule.service.js';
import ClassSchedule from './schedule.model.js';

export const createSchedule = async (req, res) => {
    try {
        const { date, time, trainerId } = req.body;
        const schedule = await ScheduleService.createSchedule(date, time, trainerId);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const bookClass = async (req, res) => {
    try {
        const { scheduleId } = req.body;
        // console.log(req.body);
        const schedule = await ScheduleService.bookClass(req.user.id, scheduleId);
        // console.log(schedule);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller for assigning a trainer to a schedule
export const assignTrainer = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { scheduleId, trainerId } = req.body;

        // Delegate the logic to the service layer
        const updatedSchedule = await ScheduleService.assignTrainer(scheduleId, trainerId);

        res.status(200).json({
            success: true,
            message: "Trainer assigned successfully.",
            data: updatedSchedule,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });

        // if (error.name === "ValidationError") {
        //     return res.status(400).json({
        //         success: false,
        //         message: error.message,
        //         errorDetails: error.details,
        //     });
        // }

        // res.status(500).json({
        //     success: false,
        //     message: "Internal server error.",
        //     errorDetails: error.message,
        // });
    }
};

export const getScheduleDetails = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const schedule = await ClassSchedule.findById(scheduleId)
            .populate('trainer', 'name email role') // Populate trainer details
            .populate('traineeIds', 'name email role'); // Populate trainee details

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
